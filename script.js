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
const imgEmbaralhadas = [...imagensCartas, ...imagensCartas];

//função para embaralhar o array
function embaralhar (array) { // usando a lógica do algoritimo fisher-yates
  for(let i = array.length - 1 ; i > 0; i--);
  const j = Math.floor(Math.random() * (i + 1));
  [array[i], array[j] = [array[j], array[i]]];
}

embaralhar (imgEmbaralhadas)

//variáveis de estado do jogo
let primeiraCarta = null; //armazena a primeira carta clicada
let segundaCarta = null; //armazena a segunda carta clicada
let bloquearTabuleiro = false //impede cliques durante a comparação
let paresEncontrados = 0; // contador de pares encontrados


});