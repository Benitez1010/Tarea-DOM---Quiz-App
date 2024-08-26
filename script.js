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
const cuestionario = {
    "HTML": [
        {
            "pregunta": "¿Qué significa HTML?",
            "opciones": ["HyperText Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
            "correcta": 0
        },
        {
            "pregunta": "¿Cuál es el elemento correcto para el título más grande?",
            "opciones": ["<head>", "<h1>", "<header>"],
            "correcta": 1
        }
    ],
    "CSS": [
        {
            "pregunta": "¿Qué significa CSS?",
            "opciones": ["Colorful Style Sheets", "Cascading Style Sheets", "Creative Style Sheets"],
            "correcta": 1
        }
    ],
    "JavaScript": [
        {
            "pregunta": "¿Qué tipo de lenguaje es JavaScript?",
            "opciones": ["Lenguaje de marcado", "Lenguaje de programación", "Lenguaje de estilo"],
            "correcta": 1
        }
    ],
    "Accesibilidad": [
        {
            "pregunta": "¿Qué es la accesibilidad web?",
            "opciones": ["Facilidad de acceso para todos los usuarios", "Velocidad de carga", "Diseño adaptable"],
            "correcta": 0
        }
    ]
};

// Variables globales
let temaActual = "";
let preguntaActual = 0;

// Elementos del DOM
const temaElegido = document.querySelector(".tema-elegido");
const imgTema = document.querySelector(".img-tema");
const contadorPregunta = document.querySelector(".contador-pregunta");
const barraProgreso = document.querySelector(".barra-progreso .completada");
const preguntaTexto = document.querySelector(".pregunta");
const opcionesContenedor = document.querySelector(".opciones");

function cargarPregunta() {
    const preguntas = cuestionario[temaActual];
    if (!preguntas) {
        console.error("No hay preguntas para el tema:", temaActual);
        return;
    }
    const pregunta = preguntas[preguntaActual];

    if (pregunta) {
        preguntaTexto.textContent = pregunta.pregunta;

        // Limpia las opciones anteriores
        opcionesContenedor.innerHTML = "";

        // Añade las nuevas opciones
        pregunta.opciones.forEach((opcion, index) => {
            const button = document.createElement("button");
            button.textContent = opcion;
            button.classList.add("alternativa");
            button.onclick = () => verificarRespuesta(index, pregunta.correcta);
            opcionesContenedor.appendChild(button);
        });

        // Actualiza el contador de preguntas y la barra de progreso
        contadorPregunta.textContent = `Pregunta ${preguntaActual + 1} de ${preguntas.length}`;
        barraProgreso.style.width = `${((preguntaActual + 1) / preguntas.length) * 100}%`;
    } else {
        console.error("No hay más preguntas para el tema:", temaActual);
    }
}

function verificarRespuesta(indiceSeleccionado, indiceCorrecto) {
    const botones = opcionesContenedor.querySelectorAll("button");
    if (indiceSeleccionado === indiceCorrecto) {
        botones[indiceSeleccionado].classList.add("caja-correcta", "correcta");
    } else {
        botones[indiceSeleccionado].classList.add("caja-invalida", "invalida");
        botones[indiceCorrecto].classList.add("caja-correcta", "correcta");
    }

    // Después de un pequeño retraso, cargar la siguiente pregunta
    setTimeout(() => {
        preguntaActual++;
        if (preguntaActual < cuestionario[temaActual].length) {
            cargarPregunta();
        } else {
            mostrarPantallaCompletado();
        }
    }, 1000);
}

function seleccionarTema(tema) {
    temaActual = tema;
    preguntaActual = 0;

    temaElegido.textContent = tema;
    imgTema.src = document.querySelector(`#${tema} img`).src;

    document.querySelector(".menu-inicio").style.display = "none";
    document.querySelector(".pantalla-pregunta").style.display = "flex";

    cargarPregunta();
}

function mostrarPantallaCompletado() {
    document.querySelector(".pantalla-pregunta").style.display = "none";
    document.querySelector(".cuestionario-completado").style.display = "flex";
}

// Añade el evento de selección de tema
document.querySelectorAll(".tipo-cuestionario").forEach(boton => {
    boton.addEventListener("click", () => {
        seleccionarTema(boton.id);
    });
});





/*


document.addEventListener("DOMContentLoaded", () => {
    // Configura la apariencia inicial del cuestionario
    function setupQuestionnaire() {
        document.querySelector('.menu-inicio').classList.add('visible');
        document.querySelector('.pantalla-pregunta').classList.remove('visible');
        document.querySelector('.cuestionario-completado').classList.remove('visible');
        selectedTheme = 'claro'; // Valor inicial
        document.documentElement.setAttribute('data-theme', selectedTheme); // Usa document.documentElement en lugar de root
    }

    setupQuestionnaire(); // Llama a la función para configurar la apariencia inicial

    // Modo claro/oscuro
    const toggleSwitch = document.getElementById('casilla');
    const body = document.body;

    toggleSwitch.addEventListener('change', () => {
        body.classList.toggle('modo-oscuro', toggleSwitch.checked);
    });

    // Selección de tema
    const temaSeleccionado = document.querySelector('.tema-elegido');
    const botonesTema = document.querySelectorAll('.tipo-cuestionario');

    botonesTema.forEach(boton => {
        boton.addEventListener('click', (e) => {
            console.log(Tema seleccionado: ${e.target.id}); // Debug
            temaSeleccionado.textContent = e.target.id;
            // Inicializar cuestionario
            iniciarCuestionario(e.target.id);
        });
    });

    // Variables para el cuestionario
    let preguntaActual = 0;
    let puntuacion = 0;
    const preguntas = {
        HTML: [
            { pregunta: "¿Qué es HTML?", opciones: ["Lenguaje de estilo", "Lenguaje de marcado", "Lenguaje de programación", "Lenguaje de consulta"], respuestaCorrecta: "Lenguaje de marcado" },
            // Agregar más preguntas aquí
        ],
        CSS: [
            { pregunta: "¿Qué es CSS?", opciones: ["Lenguaje de estilo", "Lenguaje de marcado", "Lenguaje de programación", "Lenguaje de consulta"], respuestaCorrecta: "Lenguaje de estilo" },
            // Agregar más preguntas aquí
        ],
        JavaScript: [
            { pregunta: "¿Qué es JavaScript?", opciones: ["Lenguaje de estilo", "Lenguaje de marcado", "Lenguaje de programación", "Lenguaje de consulta"], respuestaCorrecta: "Lenguaje de programación" },
            // Agregar más preguntas aquí
        ],
        Accesibilidad: [
            { pregunta: "¿Qué es accesibilidad web?", opciones: ["Diseño web atractivo", "Diseño web funcional", "Diseño web para todos", "Diseño web para desarrolladores"], respuestaCorrecta: "Diseño web para todos" },
            // Agregar más preguntas aquí
        ]
    };

    function iniciarCuestionario(tema) {
        console.log(Iniciando cuestionario para el tema: ${tema}); // Debug
        preguntaActual = 0;
        puntuacion = 0;
        mostrarPregunta(tema);
        document.querySelector('.menu-inicio').style.display = 'none';
        document.querySelector('.pantalla-pregunta').style.display = 'block';
        document.querySelector('.cuestionario-completado').style.display = 'none';
    }

    function mostrarPregunta(tema) {
        const pregunta = preguntas[tema][preguntaActual];
        if (pregunta) {
            document.querySelector('.pregunta').textContent = pregunta.pregunta;
            const opciones = document.querySelectorAll('.alternativa');
            opciones.forEach((opcion, index) => {
                opcion.textContent = pregunta.opciones[index];
                opcion.onclick = () => {
                    verificarRespuesta(pregunta.opciones[index], pregunta.respuestaCorrecta);
                };
            });
            actualizarContadorPregunta();
            actualizarBarraProgreso();
        }
    }

    function verificarRespuesta(opcionSeleccionada, respuestaCorrecta) {
        if (opcionSeleccionada === respuestaCorrecta) {
            puntuacion++;
        }
        preguntaActual++;
        if (preguntaActual < preguntas[temaSeleccionado.textContent].length) {
            mostrarPregunta(temaSeleccionado.textContent);
        } else {
            mostrarResultado();
        }
    }

    function actualizarContadorPregunta() {
        document.querySelector('.numero-pregunta').textContent = preguntaActual + 1;
        document.querySelector('.total-preguntas').textContent = preguntas[temaSeleccionado.textContent].length;
    }

    function actualizarBarraProgreso() {
        const barraProgreso = document.querySelector('.barra-progreso'); // Ajustado para seleccionar el contenedor
        const porcentaje = ((preguntaActual / preguntas[temaSeleccionado.textContent].length) * 100) + '%';
        barraProgreso.style.width = porcentaje;
    }

    function mostrarResultado() {
        document.querySelector('.pantalla-pregunta').style.display = 'none';
        document.querySelector('.cuestionario-completado').style.display = 'block';
        document.querySelector('.tema-elegido').textContent = temaSeleccionado.textContent;
        document.querySelector('.puntuacion-final').textContent = puntuacion;
        document.querySelector('.total-preguntas-completadas').textContent = preguntas[temaSeleccionado.textContent].length;
    }

    document.querySelector('.reiniciar').addEventListener('click', () => {
        document.querySelector('.menu-inicio').style.display = 'block';
        document.querySelector('.pantalla-pregunta').style.display = 'none';
        document.querySelector('.cuestionario-completado').style.display = 'none';
    });
});
*/
