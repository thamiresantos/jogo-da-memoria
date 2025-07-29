const fugitiveButton = document.getElementById('fugitivo-botao'); // Certifique-se que o ID no HTML é 'fugitivo-botao'
const moveAmount = 60; // Quanto o botão vai se mover (em pixels)
const proximityThreshold = 120; // Distância em que o mouse precisa estar para o botão fugir (em pixels)

document.addEventListener('mousemove', (e) => {
    const buttonRect = fugitiveButton.getBoundingClientRect();

    // Pega as coordenadas do centro do botão
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;

    // Pega as coordenadas do mouse
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Calcula a distância entre o mouse e o centro do botão
    const distanceX = mouseX - buttonCenterX;
    const distanceY = mouseY - buttonCenterY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    // Se o mouse estiver dentro da área de proximidade...
    if (distance < proximityThreshold) {
        // Calcula a direção oposta ao mouse
        let moveDirX = 0;
        let moveDirY = 0;

        if (distanceX > 0) { // Mouse está à direita do botão
            moveDirX = -1;
        } else if (distanceX < 0) { // Mouse está à esquerda do botão
            moveDirX = 1;
        }

        if (distanceY > 0) { // Mouse está abaixo do botão
            moveDirY = -1;
        } else if (distanceY < 0) { // Mouse está acima do botão
            moveDirY = 1;
        }

        // Calcula as novas coordenadas com base na direção e no "moveAmount"
        // e garante que o botão não saia da tela
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let newX = buttonRect.left + (moveDirX * moveAmount);
        let newY = buttonRect.top + (moveDirY * moveAmount);

        // Garante que o botão permaneça dentro da tela
        newX = Math.max(0, Math.min(newX, viewportWidth - buttonRect.width));
        newY = Math.max(0, Math.min(newY, viewportHeight - buttonRect.height));

        // Aplica a nova posição usando a propriedade transform
        // O cálculo '- (viewportWidth / 2 - buttonRect.width / 2)' e similar para Y
        // serve para ajustar o `transform` em relação ao centro da tela,
        // já que o CSS inicial o posiciona no centro.
        fugitiveButton.style.transform = `translate(${newX - (viewportWidth / 2 - buttonRect.width / 2)}px, ${newY - (viewportHeight / 2 - buttonRect.height / 2)}px)`;
    }
});