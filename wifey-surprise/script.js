document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    const heartContainer = document.getElementById('heart-container');
    const loveBtn = document.getElementById('loveBtn');

    // Envelope Toggle
    envelope.addEventListener('click', () => {
        envelope.classList.toggle('open');
        if (envelope.classList.contains('open')) {
            // Burst of hearts after short delay
            setTimeout(() => {
                createHearts(15);
            }, 300);
        }
    });

    // Create Background Hearts
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 5 + 10) + 'px'; /* Slightly smaller for elegance */
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        heart.style.opacity = Math.random() * 0.3 + 0.2; /* Subtler */

        heartContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 8000);
    }

    // Interval for background hearts
    setInterval(createHeart, 800); /* Slower for more premium feel */

    // Scroll Reveal Logic
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                // Optional: stop observing once revealed
                // revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all items
    const itemsToReveal = document.querySelectorAll('.reason-item, .million-reasons');
    itemsToReveal.forEach((item) => {
        revealObserver.observe(item);
    });

    // Love Button Explosion
    loveBtn.addEventListener('click', () => {
        createHearts(25); /* More hearts for the love button */
        loveBtn.style.transform = 'scale(0.9)';
        setTimeout(() => loveBtn.style.transform = 'scale(1)', 100);
    });

    function createHearts(count) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                heart.innerHTML = '❤️';
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.bottom = '0';
                heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
                heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
                heart.style.zIndex = '1000';

                document.body.appendChild(heart);

                setTimeout(() => {
                    heart.remove();
                }, 3000);
            }, i * 50);
        }
    }
});
