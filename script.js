document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('container');
    const words = ['Bonjour', 'Hello', 'Hola', 'こんにちは', '안녕하세요', 'Привет', '你好', 'Ciao', 'Guten Tag', 'Olá', 'Namaste', 'Salaam', 'Shalom', 'Sawubona', 'Kia Ora', 'Merhaba'];
    const numberOfTexts = 30; // Number of text elements
    const textSize = { width: 100, height: 50 }; // Approximate size of text elements
    const padding = 20; // Minimum padding between elements

    function createTextElement(text) {
        const div = document.createElement('div');
        div.classList.add('text');
        div.textContent = text;
        return div;
    }

    function isOverlapping(x, y, existingPositions) {
        for (let pos of existingPositions) {
            if (
                x < pos.x + textSize.width + padding &&
                x + textSize.width + padding > pos.x &&
                y < pos.y + textSize.height + padding &&
                y + textSize.height + padding > pos.y
            ) {
                return true;
            }
        }
        return false;
    }

    function getRandomPosition(existingPositions) {
        let x, y, attempts = 0;

        do {
            x = Math.random() * (window.innerWidth - textSize.width - 2 * padding) + padding;
            y = Math.random() * (window.innerHeight - textSize.height - 2 * padding) + padding;
            attempts++;
        } while (isOverlapping(x, y, existingPositions) && attempts < 100);

        if (attempts >= 100) {
            // If too many attempts, just place it somewhere
            x = Math.random() * (window.innerWidth - textSize.width - 2 * padding) + padding;
            y = Math.random() * (window.innerHeight - textSize.height - 2 * padding) + padding;
        }

        return { x, y };
    }

    function animateText(element, existingPositions) {
        const { x, y } = getRandomPosition(existingPositions);
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        element.style.opacity = '1';
        element.style.transform = 'translate(0, 0)';

        setTimeout(() => {
            const newPos = getRandomPosition(existingPositions);
            element.style.transition = 'opacity 1s, transform 2s';
            element.style.transform = `translate(${newPos.x - x}px, ${newPos.y - y}px)`;

            setTimeout(() => {
                element.style.opacity = '0';

                setTimeout(() => {
                    animateText(element, existingPositions); // Recursively animate
                }, 1000);
            }, 2000 + Math.random() * 3000); // Random display duration between 2 and 5 seconds
        }, 1000);
    }

    const existingPositions = [];

    for (let i = 0; i < numberOfTexts; i++) {
        const text = words[Math.floor(Math.random() * words.length)];
        const textElement = createTextElement(text);
        container.appendChild(textElement);

        const position = getRandomPosition(existingPositions);
        textElement.style.left = `${position.x}px`;
        textElement.style.top = `${position.y}px`;
        existingPositions.push(position);

        setTimeout(() => {
            animateText(textElement, existingPositions);
        }, Math.random() * 2000); // Random start delay
    }
});
