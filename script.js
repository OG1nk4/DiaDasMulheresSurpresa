document.addEventListener('DOMContentLoaded', () => {

    const loginScreen = document.getElementById('login-screen');
    const mainContent = document.getElementById('main-content');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('login-btn');
    const errorMessage = document.getElementById('error-message');
    const typewriterElement = document.getElementById('typewriter-text');
    const loginForm = document.getElementById('login-form');

    const CORRECT_PASSWORD = '26042024';

    // =========================================
    // 1. EFEITO MÁQUINA DE ESCREVER (Login Escuro)
    // =========================================
    const textToType = "Área restrita. Apenas a dona do meu coração tem a chave de acesso. Insere a data em que tudo mudou...";
    let charIndex = 0;
    let isTyping = true;

    function typeWriter() {
        if (charIndex < textToType.length) {
            typewriterElement.innerHTML += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50); // Velocidade de digitação
        } else {
            isTyping = false;
            // Após digitar, revela o input e botão
            setTimeout(() => {
                loginForm.classList.remove('hidden');
                loginForm.classList.add('fade-in-element');
                passwordInput.focus();
            }, 600);
        }
    }

    // Iniciar a máquina de escrever 1 segundo após carregar a página
    setTimeout(typeWriter, 800);

    // Permitir pular o efeito de digitação caso clique na tela
    document.addEventListener('click', (e) => {
        if (isTyping && e.target.closest('#login-screen')) {
            isTyping = false;
            charIndex = textToType.length;
            typewriterElement.innerHTML = textToType;
            loginForm.classList.remove('hidden');
            loginForm.classList.add('fade-in-element');
            passwordInput.focus();
        }
    });

    // =========================================
    // 2. LÓGICA DE SENHA E TRANSIÇÃO
    // =========================================
    function attemptLogin() {
        const enteredPassword = passwordInput.value.trim();

        if (enteredPassword === CORRECT_PASSWORD) {
            // Senha Correta - Efeito de Dissolver o escuro
            errorMessage.classList.remove('show');
            loginForm.style.opacity = '0';
            typewriterElement.style.opacity = '0';

            // Suaviza a tela preta até ficar transparente
            loginScreen.style.opacity = '0';

            setTimeout(() => {
                // Remove a tela preta
                loginScreen.classList.remove('active');
                loginScreen.style.display = 'none';

                // Exibe a página principal rosa aos poucos
                mainContent.classList.add('active');

                // Iniciar os efeitos maravilhosos
                startHearts();
                initScrollReveal();

            }, 1000); // 1.0s, aguarda o fade-out do login concluir

        } else {
            // Senha Incorreta - Tremidinha
            errorMessage.classList.add('show');

            passwordInput.style.transform = 'translateX(-10px)';
            setTimeout(() => passwordInput.style.transform = 'translateX(10px)', 100);
            setTimeout(() => passwordInput.style.transform = 'translateX(-10px)', 200);
            setTimeout(() => passwordInput.style.transform = 'translateX(10px)', 300);
            setTimeout(() => passwordInput.style.transform = 'translateX(0)', 400);

            passwordInput.value = '';
            passwordInput.focus();
        }
    }

    loginBtn.addEventListener('click', attemptLogin);

    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            attemptLogin();
        }
    });


    // =========================================
    // 3. EFEITOS VISUAIS E SCROLL
    // =========================================

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');

        const size = Math.random() * 15 + 10;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 3 + 4}s`;
        heart.style.setProperty('--heart-opacity', Math.random() * 0.4 + 0.2);

        const hearts = ['❤️', '💖', '💕', '🌸', '✨'];
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.fontSize = `${size}px`;

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 7000);
    }

    let heartInterval;
    function startHearts() {
        for (let i = 0; i < 6; i++) {
            setTimeout(createHeart, Math.random() * 2000);
        }
        heartInterval = setInterval(createHeart, 500);
    }

    // Scroll Reveal
    function initScrollReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }

    // =========================================
    // 4. LÓGICA DO VÍDEO PERSONALIZADO (Declaração)
    // =========================================
    const declaracaoVideo = document.getElementById('declaracao-video');

    if (declaracaoVideo) {
        const playPauseBtn = document.getElementById('play-pause');
        const playIcon = playPauseBtn.querySelector('.play-icon');
        const pauseIcon = playPauseBtn.querySelector('.pause-icon');
        const largePlayBtn = document.getElementById('large-play-btn');

        const progressContainer = document.getElementById('progress-container');
        const progressBar = document.getElementById('progress-bar');

        const muteBtn = document.getElementById('mute-btn');
        const volumeOnIcon = muteBtn.querySelector('.volume-on');
        const volumeOffIcon = muteBtn.querySelector('.volume-off');
        const volumeSlider = document.getElementById('volume-slider');

        const currentTimeEl = document.getElementById('current-time');
        const durationTimeEl = document.getElementById('duration-time');
        const fullscreenBtn = document.getElementById('fullscreen-btn');
        const videoControls = document.getElementById('video-controls');

        // Formatar tempo
        function formatTime(seconds) {
            if (isNaN(seconds)) return "0:00";
            const min = Math.floor(seconds / 60);
            const sec = Math.floor(seconds % 60);
            return `${min}:${sec < 10 ? '0' : ''}${sec}`;
        }

        // Carregou os metadados do vídeo
        declaracaoVideo.addEventListener('loadedmetadata', () => {
            durationTimeEl.textContent = formatTime(declaracaoVideo.duration);
        });

        // Alternar Play/Pause
        function togglePlay() {
            if (declaracaoVideo.paused) {
                declaracaoVideo.play();
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
                largePlayBtn.classList.add('hidden');
            } else {
                declaracaoVideo.pause();
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
                largePlayBtn.classList.remove('hidden');
            }
        }

        playPauseBtn.addEventListener('click', togglePlay);
        largePlayBtn.addEventListener('click', togglePlay);
        declaracaoVideo.addEventListener('click', togglePlay);

        // Atualizar barra de progresso
        declaracaoVideo.addEventListener('timeupdate', () => {
            if (declaracaoVideo.duration) {
                const progressPercent = (declaracaoVideo.currentTime / declaracaoVideo.duration) * 100;
                progressBar.style.width = `${progressPercent}%`;
                currentTimeEl.textContent = formatTime(declaracaoVideo.currentTime);
            }
        });

        // Clicar na barra de progresso
        progressContainer.addEventListener('click', (e) => {
            const rect = progressContainer.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            declaracaoVideo.currentTime = pos * declaracaoVideo.duration;
        });

        // Mutar/Desmutar
        function toggleMute() {
            if (declaracaoVideo.muted) {
                declaracaoVideo.muted = false;
                declaracaoVideo.volume = volumeSlider.value > 0 ? volumeSlider.value : 1;
                if (volumeSlider.value == 0) volumeSlider.value = 1;
                volumeOnIcon.style.display = 'block';
                volumeOffIcon.style.display = 'none';
            } else {
                declaracaoVideo.muted = true;
                volumeOnIcon.style.display = 'none';
                volumeOffIcon.style.display = 'block';
            }
        }

        muteBtn.addEventListener('click', toggleMute);

        // Volume Slider
        volumeSlider.addEventListener('input', (e) => {
            declaracaoVideo.volume = e.target.value;
            if (declaracaoVideo.volume > 0) {
                declaracaoVideo.muted = false;
                volumeOnIcon.style.display = 'block';
                volumeOffIcon.style.display = 'none';
            } else {
                declaracaoVideo.muted = true;
                volumeOnIcon.style.display = 'none';
                volumeOffIcon.style.display = 'block';
            }
        });

        // Tela Cheia
        fullscreenBtn.addEventListener('click', () => {
            const uiContainer = document.getElementById('video-ui-container');
            if (!document.fullscreenElement) {
                if (uiContainer.requestFullscreen) {
                    uiContainer.requestFullscreen();
                } else if (uiContainer.webkitRequestFullscreen) { /* Safari */
                    uiContainer.webkitRequestFullscreen();
                } else if (uiContainer.msRequestFullscreen) { /* IE11 */
                    uiContainer.msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) { /* Safari */
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) { /* IE11 */
                    document.msExitFullscreen();
                }
            }
        });

        // Esconder controles quando o mouse parar
        let timeout;
        const videoContainer = document.getElementById('video-ui-container');

        videoContainer.addEventListener('mousemove', () => {
            videoControls.classList.add('active');
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (!declaracaoVideo.paused) {
                    videoControls.classList.remove('active');
                }
            }, 3000);
        });

        videoContainer.addEventListener('mouseleave', () => {
            if (!declaracaoVideo.paused) {
                videoControls.classList.remove('active');
            }
        });
    }

});
