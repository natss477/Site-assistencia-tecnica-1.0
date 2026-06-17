const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const ROOT_DIR = process.cwd();
const PORT = Number(process.env.PORT) || 3000;
const MODEL = process.env.OPENAI_MODEL || 'gpt-4.1-mini';

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

carregarEnvDoArquivo();

function carregarEnvDoArquivo() {
    const envPath = path.join(ROOT_DIR, '.env');

    if (!fs.existsSync(envPath)) {
        return;
    }

    const conteudo = fs.readFileSync(envPath, 'utf8');
    const linhas = conteudo.split(/\r?\n/);

    for (const linhaBruta of linhas) {
        const linha = linhaBruta.trim();

        if (!linha || linha.startsWith('#')) {
            continue;
        }

        const indiceIgual = linha.indexOf('=');
        if (indiceIgual === -1) {
            continue;
        }

        const chave = linha.slice(0, indiceIgual).trim();
        const valor = linha.slice(indiceIgual + 1).trim().replace(/^['"]|['"]$/g, '');

        if (chave && process.env[chave] === undefined) {
            process.env[chave] = valor;
        }
    }
}

function enviarJson(res, statusCode, payload) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(payload));
}

function enviarTexto(res, statusCode, mensagem) {
    res.writeHead(statusCode, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(mensagem);
}

function lerCorpo(req) {
    return new Promise((resolve, reject) => {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;

            if (body.length > 1_000_000) {
                req.destroy();
                reject(new Error('Payload muito grande.'));
            }
        });

        req.on('end', () => resolve(body));
        req.on('error', reject);
    });
}

function extrairTextoDaResposta(data) {
    if (!data || !Array.isArray(data.output)) {
        return '';
    }

    for (const item of data.output) {
        if (item.type !== 'message' || !Array.isArray(item.content)) {
            continue;
        }

        for (const parte of item.content) {
            if (parte.type === 'output_text' && typeof parte.text === 'string') {
                return parte.text;
            }
        }
    }

    return '';
}

function resolverCaminhoSeguro(urlPath) {
    const semQuery = (urlPath || '/').split('?')[0].split('#')[0];
    const caminhoDecodificado = decodeURIComponent(semQuery);
    const semBarraInicial = caminhoDecodificado.replace(/^[/\\]+/, '');

    const relativo = semBarraInicial === '' ? 'index.html' : semBarraInicial;
    const absolutoNormalizado = path.resolve(ROOT_DIR, relativo);
    const rootNormalizado = path.resolve(ROOT_DIR);

    if (
        absolutoNormalizado !== rootNormalizado &&
        !absolutoNormalizado.startsWith(rootNormalizado + path.sep)
    ) {
        return null;
    }

    return absolutoNormalizado;
}

async function responderArquivo(req, res) {
    let arquivo;

    try {
        arquivo = resolverCaminhoSeguro(req.url);
    } catch (error) {
        if (error instanceof URIError) {
            enviarTexto(res, 400, 'URL invalida.');
            return;
        }

        throw error;
    }

    if (!arquivo || !fs.existsSync(arquivo) || fs.statSync(arquivo).isDirectory()) {
        enviarTexto(res, 404, 'Arquivo nao encontrado.');
        return;
    }

    const ext = path.extname(arquivo).toLowerCase();
    const type = MIME_TYPES[ext] || 'application/octet-stream';
    const conteudo = fs.readFileSync(arquivo);

    res.writeHead(200, { 'Content-Type': type });

    if (req.method === 'HEAD') {
        res.end();
        return;
    }

    res.end(conteudo);
}

async function responderIA(req, res) {
    try {
        const bodyRaw = await lerCorpo(req);
        let body;

        try {
            body = bodyRaw ? JSON.parse(bodyRaw) : {};
        } catch (error) {
            enviarJson(res, 400, { error: 'JSON invalido.' });
            return;
        }

        const mensagem = typeof body.message === 'string' ? body.message.trim() : '';

        if (!mensagem) {
            enviarJson(res, 400, { error: 'Mensagem obrigatoria.' });
            return;
        }

        if (!process.env.OPENAI_API_KEY) {
            enviarJson(res, 500, { error: 'OPENAI_API_KEY nao configurada no servidor.' });
            return;
        }

        const resposta = await fetch('https://api.openai.com/v1/responses', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: MODEL,
                instructions: 'Voce e um atendente tecnico simpatico e objetivo da Assis Tech.',
                input: [
                    {
                        role: 'user',
                        content: [{ type: 'input_text', text: mensagem }]
                    }
                ]
            })
        });

        const data = await resposta.json();

        if (!resposta.ok) {
            const msgErro = data?.error?.message || 'Falha ao chamar a IA.';
            enviarJson(res, 500, { error: msgErro });
            return;
        }

        const reply = extrairTextoDaResposta(data) || 'Sem resposta da IA no momento.';
        enviarJson(res, 200, { reply });
    } catch (error) {
        const mensagemErro = error instanceof Error ? error.message : 'Erro inesperado no servidor.';
        enviarJson(res, 500, { error: mensagemErro });
    }
}

const server = http.createServer(async (req, res) => {
    try {
        if (req.method === 'POST' && req.url === '/api/chat') {
            await responderIA(req, res);
            return;
        }

        if (req.method === 'GET' || req.method === 'HEAD') {
            await responderArquivo(req, res);
            return;
        }

        enviarTexto(res, 405, 'Metodo nao permitido.');
    } catch (error) {
        if (!res.headersSent) {
            enviarJson(res, 500, { error: 'Erro interno no servidor.' });
        }
    }
});

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Modelo atual: ${MODEL}`);
});
