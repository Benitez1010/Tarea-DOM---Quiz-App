// Selecciona el interruptor de tema y el elemento <body>
const themeSwitch = document.getElementById('casilla');
const body = document.body;

// Cargar el tema guardado en localStorage si existe
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    themeSwitch.checked = savedTheme === 'oscuro';
}

// Escuchar el cambio del interruptor
themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
        body.setAttribute('data-theme', 'oscuro');
        localStorage.setItem('theme', 'oscuro');
    } else {
        body.setAttribute('data-theme', 'claro');
        localStorage.setItem('theme', 'claro');
    }
});

//**Selección de Tema del Cuestionario**
document.addEventListener("DOMContentLoaded", function() {
    // Hacer visible la pantalla de inicio
    const menuInicio = document.querySelector('.menu-inicio');
    if (menuInicio) {
        menuInicio.classList.add('visible');
    }

    // Selección de tema del cuestionario
    const temaActual = document.querySelector('.tema-actual');
    const temaElegido = document.querySelector('.tema-elegido');
    const imgTema = document.querySelector('.img-tema');
    const botonesTemas = document.querySelectorAll('.tipo-cuestionario');

    botonesTemas.forEach(boton => {
        boton.addEventListener('click', function() {
            const tema = this.id;
            temaElegido.textContent = tema;
            temaActual.style.visibility = 'visible';

            // Cambiar la imagen del tema según el botón seleccionado
            const imgSrc = this.querySelector('img').src;
            imgTema.src = imgSrc;
        });
    });
});

//



