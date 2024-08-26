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

