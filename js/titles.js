// Efecto de partículas para títulos
document.addEventListener('DOMContentLoaded', () => {
    const titles = document.querySelectorAll('h1, h2, h3');
    
    // Añadir efecto de partículas al hover
    titles.forEach(title => {
        title.addEventListener('mouseover', createParticles);
        title.addEventListener('mouseout', removeParticles);
    });

    // Añadir efecto de máquina de escribir a títulos específicos
    const typewriterTitles = document.querySelectorAll('.typewriter');
    typewriterTitles.forEach(title => {
        const text = title.textContent;
        title.textContent = '';
        typeWriter(title, text, 0);
    });
});

// Función para crear partículas
function createParticles(e) {
    const title = e.target;
    const rect = title.getBoundingClientRect();
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: ${getRandomColor()};
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * rect.width}px;
            top: ${Math.random() * rect.height}px;
        `;
        
        title.appendChild(particle);
        
        // Animar partícula
        const angle = Math.random() * Math.PI * 2;
        const velocity = 2 + Math.random() * 2;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let posX = 0;
        let posY = 0;
        let opacity = 1;
        
        const animate = () => {
            if (opacity <= 0) {
                particle.remove();
                return;
            }
            
            posX += vx;
            posY += vy;
            opacity -= 0.02;
            
            particle.style.transform = `translate(${posX}px, ${posY}px)`;
            particle.style.opacity = opacity;
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
}

// Función para remover partículas
function removeParticles(e) {
    const particles = e.target.querySelectorAll('.particle');
    particles.forEach(particle => particle.remove());
}

// Función para obtener color aleatorio
function getRandomColor() {
    const colors = [
        '#ff6b6b',
        '#4ecdc4',
        '#45b7d1',
        '#96c93d',
        '#ffd93d'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Función para efecto de máquina de escribir
function typeWriter(element, text, i) {
    if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(() => typeWriter(element, text, i), 100);
    }
}

// Añadir efecto de parallax a títulos
document.addEventListener('mousemove', (e) => {
    const titles = document.querySelectorAll('h1, h2, h3');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    titles.forEach(title => {
        const rect = title.getBoundingClientRect();
        if (isElementInViewport(title)) {
            const moveX = (mouseX - 0.5) * 20;
            const moveY = (mouseY - 0.5) * 20;
            title.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
});

// Función para verificar si un elemento está en el viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
} 