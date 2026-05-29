const botaoWhatssap = document.querySelector('.orcamento');

// Adiciona um evento de clique ao botão de orçamento 
// document.querySelector procura um elemento no HTML com a classe 'orcamento' e o armazena na variável 'botao'

botaoWhatssap.addEventListener('click', function() {

    window.open('https://api.whatsapp.com/send?phone=5511963789008&text=Oh,%20arruma%20meu%20pc%20ai%20vei', '_blank');

    // Quando o botão for clicado, a função anônima é executada, abrindo uma nova janela do navegador com a URL do WhatsApp para enviar uma mensagem pré-definida para o número especificado.
});

const botaoInstagram = document.querySelector('.instagram');

botaoInstagram.addEventListener('click', function() {

    window.open('https://instagram.com/seu_perfil', '_blank');

});

// O código acima adiciona um evento de clique ao botão com a classe 'instagram', que, quando clicado, abre o perfil do Instagram em uma nova janela do navegador. Certifique-se de substituir 'seu_perfil' pelo nome de usuário real do Instagram que deseja vincular.  

const titulo = document.querySelector('.titulo');

const botaoOrcamento = document.querySelector('.orcamento');

botaoOrcamento.addEventListener('click', function() {
// Adiciona um evento de clique ao botão de orçamento

        titulo.innerHTML = 'Obrigado por solicitar um orçamento!';

        titulo.classList.add('ativo');

    });

    const secaoServicos = document.querySelector('.cards');

    const botaoMostrarServicos = document.querySelector('.mostrar-servicos');

    botaoMostrarServicos.addEventListener('click', function() { 
        secaoServicos.classList.toggle('esconder');
    });

// O código acima adiciona um evento de clique ao botão com a classe 'mostrar-servicos'. Quando o botão é clicado, ele alterna a classe 'esconder' na seção de serviços, mostrando ou ocultando os serviços listados. Certifique-se de que a classe 'esconder' esteja definida no CSS para controlar a visibilidade da seção de serviços.   

const cards = document.querySelectorAll('.card');

cards.forEach(function(card) {

    card.classList.add('mostrar');


});

const bolinhas = document.querySelectorAll('.bolinha');

function atualizarIndicadores() {

    bolinhas.forEach(function(bolinha) {
        
        bolinha.classList.remove('ativa');

    });

    bolinhas[imagematual].classList.add('ativa');

}
    

const imagem = document.querySelector('.imagem-carrossel');

const imagens = [

    'img/img1.jpg',
    'img/img2.jpg',
    'img/img3.jpg',
    'img/img4.jpg',




]


let imagematual = 0;

let animado = false;

const botaoProximo = document.querySelector('.proximo');

botaoProximo.addEventListener('click', function() {

    if(animado) return;

    animado = true;

    imagematual++;

    if(imagematual >= imagens.length) {
        imagematual = 0;

    }
    
    imagem.style.opacity = 0;

    setTimeout(function() {

        animado = false;

        imagem.src = imagens[imagematual];

        imagem.style.opacity = 1;

        atualizarIndicadores();

    }, 500);

});

const botaoAnterior = document.querySelector('.anterior');

botaoAnterior.addEventListener('click', function() {

    if(animado) return;

    animado = true;

    imagematual--;

    if(imagematual < 0) {
        
        imagematual = imagens.length - 1;

    }

    imagem.style.opacity = 0;

    setTimeout(function() {

        imagem.src = imagens[imagematual];

        imagem.style.opacity = 1;

        atualizarIndicadores();

        animado = false;
    }, 500);

});

setInterval(function() {

    if(animado) return;

    animado = true;

    imagematual++;

    if(imagematual >= imagens.length) {

        imagematual = 0;

    }

    imagem.style.opacity = 0;

    setTimeout(function() {

        imagem.src = imagens[imagematual];

        imagem.style.opacity = 1;

        atualizarIndicadores();

        animado = false;

    }, 500);

}, 5000);

bolinhas.forEach(function(bolinha, index) {

    bolinha.addEventListener('click', function() {

        imagematual = index;

        imagem.style.opacity = 0;

        setTimeout(function() {

            imagem.src = imagens[imagematual];

            imagem.style.opacity = 1;

            atualizarIndicadores();

        }, 500);

    });

});


const botaoChat = document.querySelector('.botao-chat');

const chatFlutuante = document.querySelector('.chat-flutuante');

botaoChat.addEventListener('click', function() {

    chatFlutuante.classList.toggle('esconder-chat');

    chatFlutuante.classList.toggle('chat-ativo');
}); 

function criarMensagem(texto, tipo) {

    const hora = new Date().toLocaleTimeString('pt-BR', {

        hour: '2-digit',

        minute: '2-digit'

    });

    const mensagem = document.createElement('div');

    mensagem.classList.add('mensagem');

    mensagem.classList.add(tipo);

    mensagem.classList.add('animar-mensagem');

     mensagem.innerHTML = `
    
        <div class="conteudo-mensagem">

            <div class="avatar">
                ${tipo === 'cliente' ? '👤' : '👨‍💻'}
            </div>

            <div class="texto-mensagem">
                <p>${texto}</p>
                <span>${hora}</span>
            </div>

        </div>  

    `;



    chatBox.appendChild(mensagem);

    chatBox.scrollTop = chatBox.scrollHeight;

    return mensagem;
}

const botaoEnviar = document.querySelector('.enviar-chat');

const inputChat = document.querySelector('.input-chat');

const chatBox = document.querySelector('.chat-box');

botaoEnviar.addEventListener('click', function() {
    const rawText = inputChat.value || '';
    const mensagemUsuario = rawText.trim().toLowerCase();

    if (mensagemUsuario === '') return;

    let respostaTexto = '';

    if (mensagemUsuario.includes('travando')) {
        respostaTexto = 'Isso pode ser superaquecimento ou excesso de programas.';
    } else if (mensagemUsuario.includes('formatar')) {
        respostaTexto = 'Podemos fazer uma formatação com todos seus aquivos salvos.';
    } else if (mensagemUsuario.includes('orçamento')) {
        respostaTexto = 'Para solicitar um orçamento, por favor, clique no botão de orçamento em nosso site ou entre em contato conosco pelo WhatsApp.';
    } else if (mensagemUsuario.includes('limpeza')) {
        respostaTexto = 'Podemos fazer uma Limpeza completa consulte nossos orçamentos.';
    } else if (
        mensagemUsuario.includes('oi') ||
        mensagemUsuario.includes('olá') ||
        mensagemUsuario.includes('ola') ||
        mensagemUsuario.includes('bom dia')
    ) {
        respostaTexto = 'Olá bom dia(Tarde), o que precisa?';
    } else {
        respostaTexto = 'Desculpe, não entendi. Pode reformular?';
    }

    criarMensagem(rawText, 'cliente');

    const digitando = document.createElement('div');
    digitando.classList.add('mensagem', 'tecnico');
    digitando.classList.add('animar-mensagem')
    digitando.innerHTML = `
        <div class="digitando">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;        
    chatBox.appendChild(digitando);

    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(function() {

        digitando.remove();

       criarMensagem(respostaTexto, 'tecnico');

        chatBox.scrollTop = chatBox.scrollHeight;



    }, 2000);

    chatBox.scrollTop = chatBox.scrollHeight;

    inputChat.value = '';



});

inputChat.addEventListener('keypress', function(e) {

        if(e.key === 'Enter') {

            botaoEnviar.click();

        }

    });