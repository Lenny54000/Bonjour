document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('container');
    const words = ['Bonjour', 'Hello', 'Hola', 'こんにちは', '안녕하세요', 'Привет', '你好', 'Ciao', 'Guten Tag', 'Olá', 'Namaste', 'Salaam', 'Shalom', 'Sawubona', 'Kia Ora', 'Merhaba'];
    const numberOfTexts = 30; // Number of text elements

    function createTextElement(text) {
        const div = document.createElement('div');
        div.classList.add('text');
        div.textContent = text;
        return div;
    }

    function getRandomPosition() {
        const x = Math.random() * (window.innerWidth - 100); // 100 to prevent overflow
        const y = Math.random() * (window.innerHeight - 50); // 50 to prevent overflow
        return { x, y };
    }

    function animateText(element) {
        const { x, y } = getRandomPosition();
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        element.style.opacity = '1';
        element.style.transform = 'translateY(0%)';

        setTimeout(() => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(-100%)';
            
            setTimeout(() => {
                animateText(element); // Recursively animate
            }, 1000);
        }, 2000 + Math.random() * 3000); // Random display duration between 2 and 5 seconds
    }

    for (let i = 0; i < numberOfTexts; i++) {
        const text = words[Math.floor(Math.random() * words.length)];
        const textElement = createTextElement(text);
        container.appendChild(textElement);

        setTimeout(() => {
            animateText(textElement);
        }, Math.random() * 2000); // Random start delay
    }
});
