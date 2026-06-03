const titulo = document.querySelector('.titulo');
const botaoOrcamento = document.querySelector('.orcamento');
const botaoInstagram = document.querySelector('.instagram');
const secaoServicos = document.querySelector('.cards');
const botaoMostrarServicos = document.querySelector('.mostrar-servicos');

if (botaoOrcamento && titulo) {
    botaoOrcamento.addEventListener('click', function() {
        window.open('https://api.whatsapp.com/send?phone=559999999&text=Oh,%20arruma%20meu%20pc%20ai%20vei', '_blank');
        titulo.textContent = 'Obrigado por solicitar um orcamento!';
        titulo.classList.add('ativo');
    });
}

if (botaoInstagram) {
    botaoInstagram.addEventListener('click', function() {
        window.open('https://instagram.com/seu_perfil', '_blank');
    });
}

if (botaoMostrarServicos && secaoServicos) {
    botaoMostrarServicos.addEventListener('click', function() {
        secaoServicos.classList.toggle('esconder');
    });
}

const cards = document.querySelectorAll('.card');

cards.forEach(function(card) {
    card.classList.add('mostrar');
});

const bolinhas = document.querySelectorAll('.bolinha');
const imagem = document.querySelector('.imagem-carrossel');
const botaoProximo = document.querySelector('.proximo');
const botaoAnterior = document.querySelector('.anterior');

const imagens = [
    'img/img1.jpg',
    'img/img2.jpg',
    'img/img3.jpg',
    'img/img4.jpg'
];

let imagemAtual = 0;
let animado = false;

function atualizarIndicadores() {
    bolinhas.forEach(function(bolinha) {
        bolinha.classList.remove('ativa');
    });

    if (bolinhas[imagemAtual]) {
        bolinhas[imagemAtual].classList.add('ativa');
    }
}

function irParaImagem(indice) {
    if (!imagem || animado || imagens.length === 0) {
        return;
    }

    animado = true;

    if (indice >= imagens.length) {
        imagemAtual = 0;
    } else if (indice < 0) {
        imagemAtual = imagens.length - 1;
    } else {
        imagemAtual = indice;
    }

    imagem.style.opacity = 0;

    setTimeout(function() {
        imagem.src = imagens[imagemAtual];
        imagem.style.opacity = 1;
        atualizarIndicadores();
        animado = false;
    }, 500);
}

if (imagem && imagens.length > 0) {
    imagem.src = imagens[0];
    atualizarIndicadores();

    if (botaoProximo) {
        botaoProximo.addEventListener('click', function() {
            irParaImagem(imagemAtual + 1);
        });
    }

    if (botaoAnterior) {
        botaoAnterior.addEventListener('click', function() {
            irParaImagem(imagemAtual - 1);
        });
    }

    setInterval(function() {
        if (animado) {
            return;
        }

        irParaImagem(imagemAtual + 1);
    }, 5000);

    bolinhas.forEach(function(bolinha, index) {
        bolinha.addEventListener('click', function() {
            if (animado) {
                return;
            }

            irParaImagem(index);
        });
    });
}

const botaoChat = document.querySelector('.botao-chat');
const chatFlutuante = document.querySelector('.chat-flutuante');
const botaoEnviar = document.querySelector('.enviar-chat');
const inputChat = document.querySelector('.input-chat');
const chatBox = document.querySelector('.chat-box');

if (botaoChat && chatFlutuante) {
    botaoChat.addEventListener('click', function() {
        const vaiAbrir = chatFlutuante.classList.contains('esconder-chat');

        chatFlutuante.classList.toggle('esconder-chat');
        chatFlutuante.classList.toggle('chat-ativo');

        botaoChat.setAttribute('aria-expanded', vaiAbrir ? 'true' : 'false');
    });
}

function criarMensagem(texto, tipo) {
    if (!chatBox) {
        return null;
    }

    const hora = new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    });

    const mensagem = document.createElement('div');
    mensagem.classList.add('mensagem', tipo, 'animar-mensagem');

    const conteudo = document.createElement('div');
    conteudo.classList.add('conteudo-mensagem');

    const avatar = document.createElement('div');
    avatar.classList.add('avatar');
    avatar.textContent = tipo === 'cliente' ? '\u{1F464}' : '\u{1F468}\u200D\u{1F4BB}';

    const textoMensagem = document.createElement('div');
    textoMensagem.classList.add('texto-mensagem');

    const paragrafo = document.createElement('p');
    paragrafo.textContent = texto;

    const horaMensagem = document.createElement('span');
    horaMensagem.textContent = hora;

    textoMensagem.appendChild(paragrafo);
    textoMensagem.appendChild(horaMensagem);
    conteudo.appendChild(avatar);
    conteudo.appendChild(textoMensagem);
    mensagem.appendChild(conteudo);

    chatBox.appendChild(mensagem);
    chatBox.scrollTop = chatBox.scrollHeight;

    return mensagem;
}

function criarIndicadorDigitando() {
    if (!chatBox) {
        return null;
    }

    const digitando = document.createElement('div');
    digitando.classList.add('mensagem', 'tecnico', 'animar-mensagem');
    digitando.innerHTML = `
        <div class="digitando">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;

    chatBox.appendChild(digitando);
    chatBox.scrollTop = chatBox.scrollHeight;
    return digitando;
}

function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

function escolherResposta(mensagemUsuario) {
    const mensagem = normalizarTexto(mensagemUsuario);

    if (mensagem.includes('travando') || mensagem.includes('lento')) {
        return 'Isso pode ser superaquecimento, excesso de programas ou pouca memoria. Podemos fazer um diagnostico para descobrir a causa.';
    }

    if (mensagem.includes('formatar') || mensagem.includes('formatacao')) {
        return 'Podemos fazer uma formatacao com backup dos seus arquivos importantes antes de reinstalar o sistema.';
    }

    if (mensagem.includes('limpeza') || mensagem.includes('poeira')) {
        return 'Fazemos limpeza interna, remocao de poeira e troca de pasta termica para ajudar no resfriamento.';
    }

    if (mensagem.includes('upgrade') || mensagem.includes('memoria') || mensagem.includes('ssd')) {
        return 'Upgrade de memoria ou SSD costuma melhorar bastante o desempenho. Podemos avaliar qual peca combina com seu equipamento.';
    }

    if (mensagem.includes('backup') || mensagem.includes('recuperar') || mensagem.includes('arquivos')) {
        return 'Podemos ajudar com backup e recuperacao de arquivos. O ideal e evitar mexer muito no equipamento ate avaliar.';
    }

    if (mensagem.includes('orcamento') || mensagem.includes('preco') || mensagem.includes('valor')) {
        return 'O valor depende do servico e do estado do equipamento. Para um orcamento mais certo, chame no WhatsApp e explique o problema.';
    }

    if (mensagem.includes('horario') || mensagem.includes('atendimento')) {
        return 'Nosso atendimento e de segunda a sabado, das 08:00 as 18:00.';
    }

    if (
        mensagem.includes('oi') ||
        mensagem.includes('ola') ||
        mensagem.includes('bom dia') ||
        mensagem.includes('boa tarde') ||
        mensagem.includes('boa noite')
    ) {
        return 'Ola! Me conte qual problema seu computador ou notebook esta apresentando.';
    }

    return 'Nao entendi totalmente. Voce pode falar se o problema e lentidao, formatacao, limpeza, upgrade, backup ou orcamento?';
}

if (botaoEnviar && inputChat && chatBox) {
    botaoEnviar.addEventListener('click', function() {
        if (botaoEnviar.disabled) {
            return;
        }

        const rawText = inputChat.value || '';
        const textoLimpo = rawText.trim();

        if (textoLimpo === '') {
            return;
        }

        criarMensagem(textoLimpo, 'cliente');
        inputChat.value = '';
        inputChat.focus();

        const digitando = criarIndicadorDigitando();
        const respostaTexto = escolherResposta(textoLimpo);
        botaoEnviar.disabled = true;

        setTimeout(function() {
            if (digitando) {
                digitando.remove();
            }

            criarMensagem(respostaTexto, 'tecnico');
            botaoEnviar.disabled = false;
            inputChat.focus();
        }, 1200);
    });

    inputChat.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            botaoEnviar.click();
        }
    });
}
