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
        let displayedText = currentPhrase.substring(0, charIndex);
        
        textElement.innerHTML = displayedText;

        if (!isDeleting && charIndex === currentPhrase.length) {
            textElement.classList.add("blue-word");  
        }

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            setTimeout(() => {
                isDeleting = true;
                textElement.classList.remove("blue-word");  
            }, 1000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        }

        setTimeout(typeWriter, isDeleting ? 100 : 200);
    }

    typeWriter();
});

document.querySelector('.minimize-btn').addEventListener('click', function () {
    const header = document.querySelector('header');
    header.classList.toggle('minimized');
});

const technologies = {
    left: [
        { icon: 'fab fa-html5', name: 'HTML', color: '#E34F26' },
        { icon: 'fab fa-css3-alt', name: 'CSS', color: '#1572B6' },
        { icon: 'fab fa-js', name: 'JavaScript', color: '#F7DF1E' }, // JavaScript añadido
        { icon: 'fab fa-php', name: 'PHP', color: '#777BB4' },
        { icon: 'fas fa-database', name: 'MongoDB', color: '#47A248' },
        { icon: 'fas fa-database', name: 'MySQL', color: '#4479A1' },
        { icon: 'fab fa-swift', name: 'Swift', color: '#FA7343' },
        { icon: 'fab fa-git-alt', name: 'Git', color: '#F05032' },
        { icon: 'fab fa-github', name: 'GitHub', color: '#ffffff' }, // Color más claro
        { icon: 'fas fa-terminal', name: 'Bash', color: '#4EAA25' },
        { icon: 'fas fa-tools', name: 'Android Studio', color: '#3DDC84' } // Android Studio añadido
    ],
    right: [
        { icon: 'fab fa-android', name: 'Kotlin', color: '#7F52FF' },
        { icon: 'fab fa-java', name: 'Java', color: '#007396' },
        { icon: 'fab fa-java', name: 'JavaFX', color: '#225566' },
        { icon: 'fas fa-mobile-alt', name: 'Flutter', color: '#02569B' },
        { icon: 'fab fa-python', name: 'Python', color: '#3776AB' },
        { icon: 'fab fa-windows', name: 'C#', color: '#512BD4' },
        { icon: 'fas fa-cube', name: 'SwiftUI', color: '#FA7343' }, // SwiftUI añadido
        { icon: 'fab fa-js', name: 'JavaScript', color: '#F7DF1E' }, // JavaScript añadido
        { icon: 'fab fa-git-alt', name: 'Git', color: '#F05032' },
        { icon: 'fab fa-github', name: 'GitHub', color: '#ffffff' }, // Color más claro
        { icon: 'fas fa-terminal', name: 'Bash', color: '#4EAA25' },
        { icon: 'fas fa-tools', name: 'Android Studio', color: '#3DDC84' } // Android Studio añadido
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    const techContainer = document.createElement('div');
    techContainer.className = 'tech-side-container';
    
    const styles = document.createElement('style');
    styles.textContent = `
        .tech-side-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            pointer-events: none;
            z-index: 100;
        }

        .tech-column {
            position: fixed;
            top: 0;
            width: 60px;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            background: rgba(18, 18, 18, 0.8);
            padding: 20px 0;
            overflow: hidden;
        }

        .tech-column.left {
            left: 0;
        }

        .tech-column.right {
            right: 0;
        }

        .tech-scroll {
            display: flex;
            flex-direction: column;
            gap: 30px;
            animation: scrollTech 30s linear infinite;
        }

        .tech-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            color: white;
            transition: transform 0.3s ease;
        }

        .tech-item i {
            font-size: 24px;
            margin-bottom: 5px;
        }

        .tech-item span {
            font-size: 10px;
            text-align: center;
            opacity: 0.8;
        }

        @keyframes scrollTech {
            from {
                transform: translateY(0);
            }
            to {
                transform: translateY(-50%);
            }
        }

        @media (max-width: 768px) {
            .tech-column {
                display: none;
            }
        }
    `;
    document.head.appendChild(styles);

    ['left', 'right'].forEach(side => {
        const column = document.createElement('div');
        column.className = `tech-column ${side}`;
        
        const scrollContainer = document.createElement('div');
        scrollContainer.className = 'tech-scroll';

        [...technologies[side], ...technologies[side]].forEach(tech => {
            const techItem = document.createElement('div');
            techItem.className = 'tech-item';
            techItem.innerHTML = `
                <i class="${tech.icon}" style="color: ${tech.color}"></i>
                <span>${tech.name}</span>
            `;
            scrollContainer.appendChild(techItem);
        });

        column.appendChild(scrollContainer);
        document.body.appendChild(column);
    });
});
