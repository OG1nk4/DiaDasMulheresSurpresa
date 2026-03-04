document.addEventListener('DOMContentLoaded', () => {
    const loginScreen = document.getElementById('login-screen');
    const mainContent = document.getElementById('main-content');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('login-btn');
    const errorMessage = document.getElementById('error-message');

    // Senha definida nos requisitos
    const CORRECT_PASSWORD = '26042024';

    function attemptLogin() {
        const enteredPassword = passwordInput.value.trim();

        if (enteredPassword === CORRECT_PASSWORD) {
            // Senha correta
            errorMessage.classList.remove('show');

            // Fazer fade out da tela de login
            loginScreen.classList.remove('fade-in');

            setTimeout(() => {
                // Esconder tela de login completamente da estrutura
                loginScreen.classList.remove('active', 'flex-center');

                // Rolar pagina para o topo (útil no mobile)
                window.scrollTo(0, 0);

                // Mostrar a estrutura principal
                mainContent.classList.add('active');

                // Pequeno atraso para o navegador registrar o display antes de aplicar opacidade (fade-in)
                setTimeout(() => {
                    mainContent.classList.add('fade-in');
                    startHearts();
                    initScrollReveal();
                }, 50);

            }, 800); // tempo exato da transição do CSS

        } else {
            // Senha Incorreta
            errorMessage.classList.add('show');

            // Animação de tremor (shake) no campo de texto para feedback visual fofo
            passwordInput.style.transform = 'translateX(-10px)';
            setTimeout(() => passwordInput.style.transform = 'translateX(10px)', 100);
            setTimeout(() => passwordInput.style.transform = 'translateX(-10px)', 200);
            setTimeout(() => passwordInput.style.transform = 'translateX(10px)', 300);
            setTimeout(() => passwordInput.style.transform = 'translateX(0)', 400);

            // Limpa o campo e foca novamente
            passwordInput.value = '';
            passwordInput.focus();
        }
    }

    // Eventos de click e tecla "Enter"
    loginBtn.addEventListener('click', attemptLogin);

    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            attemptLogin();
        }
    });

    // Focar no input automaticamente ao abrir
    passwordInput.focus();

    // =============== EFEITOS VISUAIS =============== //

    // Função para criar corações caindo
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');

        // Configurações aleatórias para o coração
        const size = Math.random() * 15 + 10; // 10px a 25px
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 3 + 4}s`; // 4s a 7s
        heart.style.setProperty('--heart-opacity', Math.random() * 0.5 + 0.3); // 0.3 a 0.8

        // Símbolos românticos
        const hearts = ['❤️', '💖', '💕', '🌸', '✨'];
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.fontSize = `${size}px`;

        document.body.appendChild(heart);

        // Remove o coração após a animação
        setTimeout(() => {
            heart.remove();
        }, 7000);
    }

    let heartInterval;
    function startHearts() {
        // Criar corações iniciais
        for (let i = 0; i < 5; i++) {
            setTimeout(createHeart, Math.random() * 2000);
        }
        heartInterval = setInterval(createHeart, 400); // 1 coração a cada 400ms
    }

    // Função para efeito Reveal no Scroll
    function initScrollReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target); // Anima apenas 1 vez
                }
            });
        }, { threshold: 0.15 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }
});
