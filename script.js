document.addEventListener('DOMContentLoaded', () => { //DOMContentLoaded - garante que a função só vai começar depois que o navegador tiver lido o html primeiro.
  const imagensCartas = [
      'estilos/imagens/cachorro-amarelo.png',
      'estilos/imagens/cachorro-marrom.png',
      'estilos/imagens/cachorro-preto.png',
      'estilos/imagens/gato-amarelo.png',
      'estilos/imagens/gato-branco.png',
      'estilos/imagens/gato-roxo.png'
  ];
    // Duplica as imagens para formar os pares
    const imagensEmbaralhadas = [...imagensCartas, ...imagensCartas]; // dublicando as cartas

    //função para embaralhar o array
    function embaralhar(array) { // usando a lógica do algoritimo fisher-yates
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    embaralhar(imagensEmbaralhadas);

    // Variáveis de estado do jogo
    let primeiraCarta = null; // Armazena a primeira carta clicada
    let segundaCarta = null;  // Armazena a segunda carta clicada
    let bloquearTabuleiro = false; // Impede cliques durante a comparação
    let paresEncontrados = 0; // Contador de pares encontrados
    const musicaVitoria = document.getElementById('musicaVitoria');// Obtém áudio

    const cartasNoHTML = document.querySelectorAll('.cartas'); //divs

    cartasNoHTML.forEach((carta, indice) => {
        const faceAtras = document.createElement('div');
        faceAtras.classList.add('face-carta');

        const faceFrente = document.createElement('div');
        faceFrente.classList.add('face-carta', 'face-frente');
        faceFrente.style.backgroundImage = `url('${imagensEmbaralhadas[indice]}')`; //index está sendo usado como uma variavel


        carta.dataset.imagemId = imagensEmbaralhadas[indice];  // Adiciona um atributo de dado para armazenar o ID da imagem

        carta.appendChild(faceAtras); //criando div verso
        carta.appendChild(faceFrente); //criando div frente

        carta.addEventListener('click', () => {
            // Se o tabuleiro estiver bloqueado ou a carta já está virada/pareada, ignore o clique
            if (bloquearTabuleiro || carta.classList.contains('virada') || carta.classList.contains('pareada')) {
                return;
            }

            // Adiciona a classe 'virada' para mostrar a face da frente
            carta.classList.add('virada');

            // Lógica para a primeira ou segunda carta virada
            if (!primeiraCarta) {
                primeiraCarta = carta;  // É a primeira carta clicada

            } else {
                segundaCarta = carta; // É a segunda carta clicada
                bloquearTabuleiro = true; // Bloqueia novos cliques

                // Verifica se as imagens das duas cartas são iguais
                if (primeiraCarta.dataset.imagemId === segundaCarta.dataset.imagemId) {
                    // Par encontrado!
                    setTimeout(() => {
                        primeiraCarta.classList.add('pareada');
                        segundaCarta.classList.add('pareada');
                        
                        // Remove os event listeners para evitar cliques futuros nas cartas pareadas
                        primeiraCarta.removeEventListener('click', () => {});
                        segundaCarta.removeEventListener('click', () => {});
                        
                        // Incrementa o contador de pares
                        paresEncontrados = paresEncontrados + 1;

                        // Reseta as variáveis para o próximo par
                        resetarCartasViradas();

                        // Verifica se o jogo terminou
                        verificarFimDeJogo();

                    }, 800); // Pequeno atraso para o usuário ver o par antes de desativar
                } else {
                    // Não é um par!
                    setTimeout(() => {
                        primeiraCarta.classList.remove('virada');
                        segundaCarta.classList.remove('virada');
                        resetarCartasViradas();
                    }, 1000); // Vira as cartas de volta após 1 segundo
                }
            }
        });
    }); // Fim do forEach

    // Função para resetar as variáveis de controle das cartas viradas
    function resetarCartasViradas() {
        primeiraCarta = null;
        segundaCarta = null;
        bloquearTabuleiro = false; // Desbloqueia o tabuleiro
    }

    // Função para verificar se todos os pares foram encontrados
    function verificarFimDeJogo() {
        const totalPares = imagensCartas.length;

        if (paresEncontrados === totalPares) {
            console.log("Parabéns! Você encontrou todos os pares!");
            // Toca a música de vitória
            musicaVitoria.play();

            // Redireciona para a tela de parabéns
            setTimeout(() => {
                window.location.href = 'parabens.html';
            }, 3000); // Redireciona após 3 segundos
        }
    }
}); // Fim !!!!!