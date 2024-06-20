document.addEventListener('DOMContentLoaded', function () {
    const texts = document.querySelectorAll('.text');
    let index = 0;

    function showNextText() {
        const currentIndex = index % texts.length;
        const nextIndex = (index + 1) % texts.length;

        texts[currentIndex].style.opacity = '1';
        texts[currentIndex].style.transform = 'translateY(0%)';

        setTimeout(() => {
            texts[currentIndex].style.opacity = '0';
            texts[currentIndex].style.transform = 'translateY(-100%)';
            
            setTimeout(() => {
                texts[nextIndex].style.transform = 'translateY(100%)';
                index++;
                showNextText();
            }, 1000); // Match this duration to the CSS transition time
        }, 2000); // Display each text for 2 seconds
    }

    showNextText();
});
