// Efectos de scroll
document.addEventListener('DOMContentLoaded', () => {
    // Efecto de revelación al scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Comprobar elementos visibles al cargar
    
    // Efecto de cursor personalizado
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Activar cursor personalizado en elementos interactivos
    const interactiveElements = document.querySelectorAll('a, button, .card, .btn');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => cursor.classList.add('active'));
        element.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
    
    // Efecto de parallax en el fondo
    const background = document.querySelector('.background-animation');
    if (background) {
        document.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            background.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }
    
    // Efecto de navbar al scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Animación de números
    const animateNumbers = () => {
        const numberElements = document.querySelectorAll('.animate-number');
        numberElements.forEach(element => {
            const target = parseInt(element.getAttribute('data-target'));
            const duration = 2000; // 2 segundos
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateNumber = () => {
                current += step;
                if (current < target) {
                    element.textContent = Math.floor(current);
                    requestAnimationFrame(updateNumber);
                } else {
                    element.textContent = target;
                }
            };
            
            updateNumber();
        });
    };
    
    // Observador para animar números cuando son visibles
    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                numberObserver.unobserve(entry.target);
            }
        });
    });
    
    document.querySelectorAll('.animate-number').forEach(element => {
        numberObserver.observe(element);
    });
    
    // Efecto de tilt en tarjetas
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
    
    // Efecto de partículas en el hero
    const createParticles = () => {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 5 + 2}px;
                height: ${Math.random() * 5 + 2}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.5});
                border-radius: 50%;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            
            hero.appendChild(particle);
            
            // Animar partícula
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 2;
            
            particle.style.animation = `
                float ${duration}s ease-in-out ${delay}s infinite,
                fade ${duration}s ease-in-out ${delay}s infinite
            `;
        }
    };
    
    createParticles();

    // Vórtice central
    const bg = document.querySelector('.background-animation');
    if (bg && !document.querySelector('.background-vortex')) {
        const vortex = document.createElement('div');
        vortex.className = 'background-vortex';
        bg.appendChild(vortex);
    }
    // Partículas en órbita
    if (bg) {
        const numParticles = 18;
        const centerX = bg.offsetWidth / 2;
        const centerY = bg.offsetHeight / 2;
        const radius = Math.min(centerX, centerY) * 0.7;
        for (let i = 0; i < numParticles; i++) {
            const p = document.createElement('div');
            p.className = 'bg-particle';
            const size = Math.random() * 80 + 40;
            const angle = (2 * Math.PI * i) / numParticles;
            const x = centerX + Math.cos(angle) * radius - size / 2;
            const y = centerY + Math.sin(angle) * radius - size / 2;
            p.style.width = `${size}px`;
            p.style.height = `${size}px`;
            p.style.left = `${x}px`;
            p.style.top = `${y}px`;
            p.style.animationDelay = `${Math.random() * 12}s`;
            bg.appendChild(p);
        }
    }
});

// Añadir estilos para las animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0) translateX(0); }
        50% { transform: translateY(-20px) translateX(10px); }
    }
    
    @keyframes fade {
        0%, 100% { opacity: 0; }
        50% { opacity: 1; }
    }
    
    .particle {
        position: absolute;
        pointer-events: none;
    }
`;
document.head.appendChild(style); 