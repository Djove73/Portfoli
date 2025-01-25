document.addEventListener('DOMContentLoaded', function() {
    // ============================
    // Código Antiguo
    // ============================

    // Mostrar y ocultar el menú de lector
    const readerToggle = document.querySelector('.reader-toggle');
    const readerMenu = document.querySelector('.reader-menu');
    readerToggle.addEventListener('click', (e) => {
        e.preventDefault();
        readerMenu.classList.toggle('visible');
    });

    // Cargar el contenido del archivo seleccionado en el menú de lector
    const readerItems = document.querySelectorAll('.reader-item');
    readerItems.forEach(item => {
        item.addEventListener('click', async (e) => {
            e.preventDefault();
            const source = e.target.getAttribute('data-source');
            try {
                const response = await fetch(source);
                const content = await response.text();
                alert(`Contenido cargado desde ${source}:\n\n${content}`);
            } catch (err) {
                alert(`Error al cargar el contenido de ${source}`);
            }
        });
    });

    // ============================
    // Código Nuevo: Smooth Scrolling
    // ============================

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

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t + b;
            t -= 2;
            return c / 2 * (t * t * t + 2) + b;
        }

        requestAnimationFrame(animation);
    };

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

    // ============================
    // Código Nuevo: Pestaña Emergente Dinámica
    // ============================

    const projectCards = document.querySelectorAll('.project-card');

    // Creamos un elemento dinámico para la pestaña emergente
    const hoverTab = document.createElement('div');
    hoverTab.classList.add('hover-tab');
    document.body.appendChild(hoverTab);

    function showTab(event) {
        const card = event.currentTarget;
        const synopsis = card.getAttribute('data-synopsis');
        hoverTab.textContent = synopsis;
        hoverTab.style.display = 'block';
        const { clientX: mouseX, clientY: mouseY } = event;
        hoverTab.style.left = `${mouseX + 15}px`;
        hoverTab.style.top = `${mouseY + 15}px`;
    }

    function hideTab() {
        hoverTab.style.display = 'none';
    }

    function moveTab(event) {
        const { clientX: mouseX, clientY: mouseY } = event;
        hoverTab.style.left = `${mouseX + 15}px`;
        hoverTab.style.top = `${mouseY + 15}px`;
    }

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', showTab);
        card.addEventListener('mousemove', moveTab);
        card.addEventListener('mouseleave', hideTab);
    });

    // ============================
    // Código Nuevo: Partículas
    // ============================

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

    // ============================
    // Código Nuevo: Lazy Sidebar
    // ============================

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
    };

    setTimeout(lazyLoadSidebar, 500);
});
