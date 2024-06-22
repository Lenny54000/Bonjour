document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('container');
    const words = ['Bonjour', 'Hello', 'Hola', 'こんにちは', '안녕하세요', 'Привет', '你好', 'Ciao', 'Guten Tag', 'Olá', 'Namaste', 'Salaam', 'Shalom', 'Sawubona', 'Kia Ora', 'Merhaba'];
    const numberOfTexts = 30; // Number of text elements
    const textSize = { width: 100, height: 50 }; // Approximate size of text elements

    function createTextElement(text) {
        const div = document.createElement('div');
        div.classList.add('text');
        div.textContent = text;
        return div;
    }

    function getRandomPosition(existingPositions) {
        let x, y, isOverlapping;

        do {
            isOverlapping = false;
            x = Math.random() * (window.innerWidth - textSize.width);
            y = Math.random() * (window.innerHeight - textSize.height);

            for (let pos of existingPositions) {
                if (
                    x < pos.x + textSize.width &&
                    x + textSize.width > pos.x &&
                    y < pos.y + textSize.height &&
                    y + textSize.height > pos.y
                ) {
                    isOverlapping = true;
                    break;
                }
            }
        } while (isOverlapping);

        return { x, y };
    }

    function animateText(element, existingPositions) {
        const { x, y } = getRandomPosition(existingPositions);
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        element.style.opacity = '1';
        element.style.transform = 'translateY(0%)';

        setTimeout(() => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(-100%)';

            setTimeout(() => {
                animateText(element, existingPositions); // Recursively animate
            }, 1000);
        }, 2000 + Math.random() * 3000); // Random display duration between 2 and 5 seconds
    }

    const existingPositions = [];

    for (let i = 0; i < numberOfTexts; i++) {
        const text = words[Math.floor(Math.random() * words.length)];
        const textElement = createTextElement(text);
        container.appendChild(textElement);

        const position = getRandomPosition(existingPositions);
        existingPositions.push(position);

        setTimeout(() => {
            animateText(textElement, existingPositions);
        }, Math.random() * 2000); // Random start delay
    }
});
