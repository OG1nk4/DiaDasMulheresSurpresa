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
});
