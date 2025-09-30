document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const body = document.body;
    const splashScreen = document.getElementById('splash-screen');
    const cursor = document.querySelector('.cursor');
    const themeSwitcher = document.querySelector('.theme-switcher');
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('.content-section');
    const hoverableElements = document.querySelectorAll('a, button, .skill-card, .project-card, .education-card, .cert-card, .achievement-card, .theme-switcher, .logo h1');

    // --- Initial Setup ---

    // 1. Loading State
    body.classList.add('loading');

    // 2. Set Theme from Local Storage
    const savedTheme = localStorage.getItem('theme') || 'dark-mode';
    body.className = savedTheme; // Directly set the class, avoiding initial flicker

    // --- Splash Screen Logic ---
    if (splashScreen) {
        // Timeout is now 2400ms (2.4s) for 3 languages to remove the delay
        setTimeout(() => {
            splashScreen.classList.add('hidden');
            body.classList.remove('loading');
            
            // Initialize scroll animations after splash screen
            initializeScrollObserver();
        }, 2400); // 3 words * 0.8s animation each = 2.4s
    } else {
        // If no splash screen, remove loading state immediately
        body.classList.remove('loading');
        initializeScrollObserver();
    }

    // --- Event Listeners ---

    // 1. Custom Cursor
    if (cursor) {
        document.addEventListener('mousemove', e => {
            cursor.style.left = `${e.pageX}px`;
            cursor.style.top = `${e.pageY}px`;
        });
        
        hoverableElements.forEach(el => {
            el.addEventListener('mouseover', () => cursor.classList.add('hover'));
            el.addEventListener('mouseout', () => cursor.classList.remove('hover'));
        });
    }

    // 2. Theme Switcher
    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            body.classList.toggle('dark-mode');
            const newTheme = body.classList.contains('light-mode') ? 'light-mode' : 'dark-mode';
            localStorage.setItem('theme', newTheme);
            initializeParticles(); // Re-initialize particles with new theme color
        });
    }

    // 3. Hamburger Menu for Mobile
    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
            hamburger.querySelector('i').classList.toggle('fa-bars');
            hamburger.querySelector('i').classList.toggle('fa-times');
        });

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                hamburger.querySelector('i').classList.add('fa-bars');
                hamburger.querySelector('i').classList.remove('fa-times');
            });
        });
    }

    // 4. Hide Header on Scroll Down
    if (header) {
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                header.style.top = '-100px';
            } else {
                header.style.top = '0';
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }
    
    // --- Initializations ---

    // 1. Scroll-Reveal Sections
    function initializeScrollObserver() {
        if (sections.length > 0) {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });

            sections.forEach(section => observer.observe(section));
        }
    }

    // 2. Particles.js
    function initializeParticles() {
        if (typeof particlesJS === 'undefined') return;

        const particleColor = getComputedStyle(body).getPropertyValue('--primary-color').trim();
        
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": particleColor },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": particleColor, "opacity": 0.4, "width": 1 },
                "move": { "enable": true, "speed": 4, "direction": "none", "random": false, "straight": false, "out_mode": "out" }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                "modes": { "repulse": { "distance": 100, "duration": 0.4 }, "push": { "particles_nb": 4 } }
            },
            "retina_detect": true
        });
    }

    // Initial call to particles.js
    initializeParticles();
});

