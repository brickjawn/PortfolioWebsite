// Matrix Rain Effect
class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.drops = [];
        this.chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        
        this.resizeCanvas();
        this.initDrops();
        this.animate();
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / 20);
        this.initDrops();
    }
    
    initDrops() {
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * this.canvas.height;
        }
    }
    
    animate() {
        this.ctx.fillStyle = 'rgba(27, 27, 27, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#00ff41';
        this.ctx.font = '15px monospace';
        
        for (let i = 0; i < this.drops.length; i++) {
            const char = this.chars[Math.floor(Math.random() * this.chars.length)];
            this.ctx.fillText(char, i * 20, this.drops[i]);
            
            if (this.drops[i] > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i] += 20;
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Gaming Elements
class GameElements {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.shapes = [];
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        
        this.resizeCanvas();
        this.initShapes();
        this.setupEventListeners();
        this.animate();
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    initShapes() {
        this.shapes = [];
        for (let i = 0; i < 8; i++) {
            this.shapes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 30 + 10,
                dx: (Math.random() - 0.5) * 2,
                dy: (Math.random() - 0.5) * 2,
                rotation: 0,
                rotationSpeed: (Math.random() - 0.5) * 0.1,
                type: Math.floor(Math.random() * 3) // 0: triangle, 1: square, 2: hexagon
            });
        }
    }
    
    setupEventListeners() {
        this.canvas.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        this.canvas.addEventListener('click', (e) => {
            this.checkCollisions(e.clientX, e.clientY);
        });
        
        // Enable pointer events for gaming canvas
        this.canvas.style.pointerEvents = 'auto';
    }
    
    checkCollisions(x, y) {
        for (let i = this.shapes.length - 1; i >= 0; i--) {
            const shape = this.shapes[i];
            const distance = Math.sqrt((x - shape.x) ** 2 + (y - shape.y) ** 2);
            
            if (distance < shape.size) {
                this.createExplosion(shape.x, shape.y);
                this.shapes.splice(i, 1);
                this.addNewShape();
                break;
            }
        }
    }
    
    createExplosion(x, y) {
        for (let i = 0; i < 15; i++) {
            this.particles.push({
                x: x,
                y: y,
                dx: (Math.random() - 0.5) * 10,
                dy: (Math.random() - 0.5) * 10,
                life: 1,
                decay: Math.random() * 0.02 + 0.02,
                color: `hsl(${Math.random() * 60 + 180}, 100%, 50%)`
            });
        }
    }
    
    addNewShape() {
        setTimeout(() => {
            this.shapes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 30 + 10,
                dx: (Math.random() - 0.5) * 2,
                dy: (Math.random() - 0.5) * 2,
                rotation: 0,
                rotationSpeed: (Math.random() - 0.5) * 0.1,
                type: Math.floor(Math.random() * 3)
            });
        }, 2000);
    }
    
    drawShape(shape) {
        this.ctx.save();
        this.ctx.translate(shape.x, shape.y);
        this.ctx.rotate(shape.rotation);
        this.ctx.strokeStyle = 'rgba(0, 212, 255, 0.6)';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        
        const size = shape.size;
        
        switch (shape.type) {
            case 0: // Triangle
                this.ctx.moveTo(0, -size);
                this.ctx.lineTo(-size * 0.8, size * 0.6);
                this.ctx.lineTo(size * 0.8, size * 0.6);
                this.ctx.closePath();
                break;
            case 1: // Square
                this.ctx.rect(-size/2, -size/2, size, size);
                break;
            case 2: // Hexagon
                for (let i = 0; i < 6; i++) {
                    const angle = (i * 60) * Math.PI / 180;
                    const x = Math.cos(angle) * size;
                    const y = Math.sin(angle) * size;
                    if (i === 0) this.ctx.moveTo(x, y);
                    else this.ctx.lineTo(x, y);
                }
                this.ctx.closePath();
                break;
        }
        
        this.ctx.stroke();
        this.ctx.restore();
    }
    
    updateShapes() {
        this.shapes.forEach(shape => {
            shape.x += shape.dx;
            shape.y += shape.dy;
            shape.rotation += shape.rotationSpeed;
            
            // Wrap around screen
            if (shape.x < -shape.size) shape.x = this.canvas.width + shape.size;
            if (shape.x > this.canvas.width + shape.size) shape.x = -shape.size;
            if (shape.y < -shape.size) shape.y = this.canvas.height + shape.size;
            if (shape.y > this.canvas.height + shape.size) shape.y = -shape.size;
        });
    }
    
    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            particle.x += particle.dx;
            particle.y += particle.dy;
            particle.life -= particle.decay;
            particle.dx *= 0.98;
            particle.dy *= 0.98;
            
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }
    
    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.life;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.updateShapes();
        this.updateParticles();
        
        this.shapes.forEach(shape => this.drawShape(shape));
        this.drawParticles();
        
        requestAnimationFrame(() => this.animate());
    }
}

// ROT13 Encoder/Decoder
class ROT13Tool {
    constructor() {
        this.inputField = document.getElementById('rot13-input');
        this.outputField = document.getElementById('rot13-output');
        this.inputCounter = document.getElementById('input-count');
        this.outputCounter = document.getElementById('output-count');
        this.copyButton = document.getElementById('copy-output');
        this.swapButton = document.getElementById('swap-fields');
        this.clearButton = document.getElementById('clear-all');
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        this.inputField.addEventListener('input', () => {
            this.encodeText();
            this.updateCounters();
        });
        
        this.copyButton.addEventListener('click', () => this.copyOutput());
        this.swapButton.addEventListener('click', () => this.swapFields());
        this.clearButton.addEventListener('click', () => this.clearFields());
    }
    
    rot13(text) {
        return text.replace(/[A-Za-z]/g, (char) => {
            const start = char <= 'Z' ? 65 : 97;
            return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start);
        });
    }
    
    encodeText() {
        const inputText = this.inputField.value;
        const encodedText = this.rot13(inputText);
        this.outputField.value = encodedText;
    }
    
    updateCounters() {
        this.inputCounter.textContent = this.inputField.value.length;
        this.outputCounter.textContent = this.outputField.value.length;
    }
    
    async copyOutput() {
        try {
            await navigator.clipboard.writeText(this.outputField.value);
            this.showNotification('Output copied to clipboard!');
        } catch (err) {
            // Fallback for older browsers
            this.outputField.select();
            document.execCommand('copy');
            this.showNotification('Output copied to clipboard!');
        }
    }
    
    swapFields() {
        const temp = this.inputField.value;
        this.inputField.value = this.outputField.value;
        this.outputField.value = temp;
        this.updateCounters();
    }
    
    clearFields() {
        this.inputField.value = '';
        this.outputField.value = '';
        this.updateCounters();
        this.inputField.focus();
    }
    
    showNotification(message) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.classList.remove('hidden');
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.classList.add('hidden');
            }, 300);
        }, 2000);
    }
}

// Navigation
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.setupEventListeners();
        this.setupSmoothScrolling();
    }
    
    setupEventListeners() {
        this.hamburger.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
            });
        });
        
        // Scroll effect on navbar
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.navbar.style.background = 'rgba(27, 27, 27, 0.98)';
            } else {
                this.navbar.style.background = 'rgba(27, 27, 27, 0.95)';
            }
        });
    }
    
    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Resume Download
class ResumeDownload {
    constructor() {
        this.setupDownloadButton();
    }
    
    setupDownloadButton() {
        const downloadButton = document.getElementById('download-resume');
        downloadButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Use the actual resume PDF file
            const a = document.createElement('a');
            a.href = 'Anthony Conforti Resume.pdf';
            a.download = 'Anthony_Conforti_Resume.pdf';
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            this.showNotification('Resume download started!');
        });
    }
    
    showNotification(message) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.classList.remove('hidden');
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.classList.add('hidden');
            }, 300);
        }, 2000);
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.observeElements();
    }
    
    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe cards and sections
        const animatedElements = document.querySelectorAll('.card, .timeline-item, .project-card, .skill-card');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

// Application Initialization
class App {
    constructor() {
        this.init();
    }
    
    init() {
        // Initialize all components when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new MatrixRain();
            new GameElements();
            new ROT13Tool();
            new Navigation();
            new ResumeDownload();
            new ScrollAnimations();
            
            // Add loading animation completion
            document.body.classList.add('loaded');
        });
    }
}

// Start the application
new App();