document.addEventListener('DOMContentLoaded', function() {
    // Advanced Smooth Scrolling with Easing
    const smoothScroll = (target, duration = 800) => {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        // Easing function for smooth scroll
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t + b;
            t -= 2;
            return c / 2 * (t * t * t + 2) + b;
        }

        requestAnimationFrame(animation);
    };

    // Enhanced Navigation
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionMap = {
                'Inicio': '.main-section',
                'Acerca de': '.bio', 
                'Servicios': '.services',
                'Contacto': '.contact'
            };
            const targetSection = document.querySelector(sectionMap[this.textContent.trim()]);
            
            if (targetSection) {
                smoothScroll(targetSection);
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Advanced Technology Icon Interactions
    const techIcons = document.querySelectorAll('.technologies i');
    techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.textContent = this.classList[1].split('-')[1].toUpperCase();
            tooltip.style.position = 'absolute';
            tooltip.style.background = 'rgba(0,0,0,0.8)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '5px 10px';
            tooltip.style.borderRadius = '5px';
            tooltip.style.fontSize = '12px';
            tooltip.style.transform = 'translateY(-100%)';
            this.appendChild(tooltip);
        });

        icon.addEventListener('mouseleave', function() {
            this.lastChild.remove();
        });
    });

    // Advanced Particle Background with Performance Optimization
    const particleContainer = document.createElement('div');
    particleContainer.style.position = 'fixed';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.zIndex = '-1';
    particleContainer.style.pointerEvents = 'none';
    document.body.appendChild(particleContainer);

    const particleStyles = document.createElement('style');
    particleStyles.textContent = `
        @keyframes float {
            0% { transform: translateY(0) scale(0.8); opacity: 0.6; }
            50% { transform: translateY(-15px) scale(1); opacity: 0.8; }
            100% { transform: translateY(0) scale(0.9); opacity: 0.7; }
        }
        .particle {
            position: absolute;
            background-color: rgba(255,255,255,0.05);
            border-radius: 50%;
            animation: float infinite alternate;
        }
    `;
    document.head.appendChild(particleStyles);

    function createOptimizedParticles(count = 75) {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.width = `${Math.random() * 4}px`;
            particle.style.height = particle.style.width;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${5 + Math.random() * 10}s`;
            particle.style.animationDelay = `${Math.random() * 3}s`;
            fragment.appendChild(particle);
        }
        particleContainer.appendChild(fragment);
    }

    createOptimizedParticles();

    // Performance and Accessibility Monitor
    window.addEventListener('load', () => {
        const perfEntries = performance.getEntriesByType('navigation')[0];
        console.log('Page Load Performance:', {
            loadTime: perfEntries.loadEventEnd - perfEntries.startTime,
            domInteractive: perfEntries.domInteractive - perfEntries.startTime
        });
    });

    // Lazy Loading for Technology Sidebar
    const lazyLoadSidebar = () => {
        const header = document.querySelector('header');
        const technologies = document.getElementById('technologies');
        
        if (!technologies) return;

        const sidebar = document.createElement('div');
        sidebar.style.cssText = `
            position: fixed;
            top: ${header.offsetHeight}px;
            right: 0;
            width: 80px;
            max-height: calc(100vh - ${header.offsetHeight}px);
            background: rgba(30,30,30,0.9);
            display: flex;
            flex-direction: column;
            align-items: center;
            z-index: 1000;
            border-bottom-left-radius: 10px;
            transition: width 0.3s ease;
        `;

        // Rest of the sidebar implementation remains similar to previous version
        // ... (previous sidebar code)
    };

    // Execute lazy sidebar loading after a short delay
    setTimeout(lazyLoadSidebar, 500);

    // Reader Dropdown Functionality
    const readerItems = document.querySelectorAll('.reader-item');
    const readerModal = document.getElementById('reader-modal');
    const readerContent = document.getElementById('reader-content');
    const closeModal = document.querySelector('.close-modal');

    readerItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const source = this.getAttribute('data-source');
            
            fetch(source)
                .then(response => response.text())
                .then(data => {
                    readerContent.textContent = data;
                    readerModal.style.display = 'block';
                })
                .catch(error => {
                    console.error('Error loading file:', error);
                });
        });
    });

    // Close modal when clicking on close button or outside the modal
    closeModal.addEventListener('click', () => {
        readerModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === readerModal) {
            readerModal.style.display = 'none';
        }
    });
});

// Obtener todos los elementos del menú con drop-down
const menuItems = document.querySelectorAll('.menu-item');

// Añadir eventos a cada elemento del menú
menuItems.forEach((item) => {
    const link = item.querySelector('a');
    const dropdown = item.querySelector('.dropdown');

    link.addEventListener('click', (e) => {
        e.preventDefault(); // Evita el salto al enlace

        // Cerrar otros menús abiertos
        menuItems.forEach((otherItem) => {
            if (otherItem !== item) {
                otherItem.classList.remove('open');
            }
        });

        // Alternar visibilidad del drop-down actual
        item.classList.toggle('open');
    });

    // Cerrar el menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!item.contains(e.target)) {
            item.classList.remove('open');
        }
    });
});