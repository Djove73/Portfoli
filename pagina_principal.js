document.addEventListener('DOMContentLoaded', () => {
    const smoothScroll = (target, duration = 800) => {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const ease = (t, b, c, d) => {
            t /= d / 2;
            return t < 1 
                ? c / 2 * t * t * t + b 
                : c / 2 * ((t -= 2) * t * t + 2) + b;
        };

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    };

    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                smoothScroll(targetSection);
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    const createParticles = (count = 50) => {
        const container = document.createElement('div');
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            pointer-events: none;
        `;
        document.body.appendChild(container);

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3}px;
                height: ${Math.random() * 3}px;
                background-color: rgba(255,255,255,0.1);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${5 + Math.random() * 5}s infinite alternate;
            `;
            container.appendChild(particle);
        }
    };

    createParticles();

    const projectCards = document.querySelectorAll('.project-card');
    const hoverTab = document.createElement('div');
    hoverTab.style.cssText = `
        position: fixed;
        background: rgba(0,0,0,0.7);
        color: white;
        padding: 10px;
        border-radius: 5px;
        display: none;
        z-index: 1000;
    `;
    document.body.appendChild(hoverTab);

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const synopsis = card.dataset.synopsis;
            hoverTab.textContent = synopsis;
            hoverTab.style.display = 'block';
            hoverTab.style.left = `${e.clientX + 15}px`;
            hoverTab.style.top = `${e.clientY + 15}px`;
        });

        card.addEventListener('mousemove', (e) => {
            hoverTab.style.left = `${e.clientX + 15}px`;
            hoverTab.style.top = `${e.clientY + 15}px`;
        });

        card.addEventListener('mouseleave', () => {
            hoverTab.style.display = 'none';
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.getElementById("typewriter-text");
    const phrases = [
        "Apasionado por el desarrollo web.",
        "Innovador en cada proyecto.",
        "Buscando siempre la perfección.",
        "Mejorando cada día."
    ];
    let currentPhraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        const currentPhrase = phrases[currentPhraseIndex];
        if (isDeleting) {
            charIndex--;
            textElement.textContent = currentPhrase.substring(0, charIndex);
        } else {
            charIndex++;
            textElement.textContent = currentPhrase.substring(0, charIndex);
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            setTimeout(() => {
                isDeleting = true;
            }, 1000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        }

        setTimeout(typeWriter, isDeleting ? 100 : 200);
    }

    typeWriter();
});


