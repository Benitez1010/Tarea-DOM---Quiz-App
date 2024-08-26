document.addEventListener("DOMContentLoaded", () => {
    // Configura la apariencia inicial del cuestionario
    function setupQuestionnaire() {
        document.querySelector('.menu-inicio').style.display = 'flex';
        document.querySelector('.pantalla-pregunta').style.display = 'none';
        document.querySelector('.cuestionario-completado').style.display = 'none';
        selectedTheme = 'claro'; // Valor inicial
        document.documentElement.setAttribute('data-theme', selectedTheme); // Usa document.documentElement en lugar de root
    }

    setupQuestionnaire(); // Llama a la función para configurar la apariencia inicial

    // Modo claro/oscuro
    const toggleSwitch = document.getElementById('casilla');
    const body = document.body;

    toggleSwitch.addEventListener('change', () => {
        const theme = toggleSwitch.checked ? 'oscuro' : 'claro';
        document.documentElement.setAttribute('data-theme', theme);
    });

    // Selección de tema
    const temaSeleccionado = document.querySelector('.tema-elegido');
    const botonesTema = document.querySelectorAll('.tipo-cuestionario');

    botonesTema.forEach(boton => {
        boton.addEventListener('click', (e) => {
            console.log(`Tema seleccionado: ${e.target.id}`); // Debug
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
        console.log(`Iniciando cuestionario para el tema: ${tema}`); // Debug
        preguntaActual = 0;
        puntuacion = 0;
        mostrarPregunta(tema);
        document.querySelector('.menu-inicio').style.display = 'none';
        document.querySelector('.pantalla-pregunta').style.display = 'flex';
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
        const barraProgreso = document.querySelector('.barra-progreso .completada'); // Selecciona la barra completada
        const porcentaje = ((preguntaActual / preguntas[temaSeleccionado.textContent].length) * 100) + '%';
        barraProgreso.style.width = porcentaje;
    }

    function mostrarResultado() {
        document.querySelector('.pantalla-pregunta').style.display = 'none';
        document.querySelector('.cuestionario-completado').style.display = 'flex';
        document.querySelector('.tema-elegido').textContent = temaSeleccionado.textContent;
        document.querySelector('.puntuacion-final').textContent = puntuacion;
        document.querySelector('.total-preguntas-completadas').textContent = preguntas[temaSeleccionado.textContent].length;
    }

    document.querySelector('.reiniciar').addEventListener('click', () => {
        document.querySelector('.menu-inicio').style.display = 'flex';
        document.querySelector('.pantalla-pregunta').style.display = 'none';
        document.querySelector('.cuestionario-completado').style.display = 'none';
    });
});
