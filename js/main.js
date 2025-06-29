let puntosUsuario = 0;
let puntosPC = 0;

// Selección de elementos del DOM
let instrucciones = document.querySelector("#instrucciones");
let contenedorPuntosUsuario = document.querySelector("#puntos-usuario");
let contenedorPuntosPC = document.querySelector("#puntos-computadora");
let mensaje = document.querySelector("#mensaje");
let contenedorGanaPunto = document.querySelector("#gana-punto");
let contenedorEleccionUsuario = document.querySelector("#eleccion-usuario");
let contenedorEleccionPc = document.querySelector("#eleccion-computadora");
let elegiTuArma = document.querySelector(".elegi-tu-arma");
let reiniciar = document.querySelector("#Reiniciar");

// Eventos para las armas
let botonesArmas = document.querySelectorAll(".arma");
botonesArmas.forEach(boton => {
    boton.addEventListener("click", iniciarTurno);
});

// Evento para el botón reiniciar
reiniciar.addEventListener("click", reiniciarJuego);

// Función principal del turno
function iniciarTurno(e) {
    let eleccionPC = Math.floor(Math.random() * 3);
    let eleccionUsuario = e.currentTarget.id;

    // Animación de sacudida en el botón clickeado
    e.currentTarget.classList.add("sacudir");
    setTimeout(() => {
        e.currentTarget.classList.remove("sacudir");
    }, 300);

    if (eleccionPC === 0) {
        eleccionPC = "piedra🪨";
    } else if (eleccionPC === 1) {
        eleccionPC = "papel🧻";
    } else {
        eleccionPC = "tijera✂️";
    }

    contenedorEleccionUsuario.innerText = eleccionUsuario;
    contenedorEleccionPc.innerText = eleccionPC;

    if (
        (eleccionUsuario === "piedra🪨" && eleccionPC === "tijera✂️") ||
        (eleccionUsuario === "tijera✂️" && eleccionPC === "papel🧻") ||
        (eleccionUsuario === "papel🧻" && eleccionPC === "piedra🪨")
    ) {
        ganaUsuario();
    } else if (
        (eleccionPC === "piedra🪨" && eleccionUsuario === "tijera✂️") ||
        (eleccionPC === "tijera✂️" && eleccionUsuario === "papel🧻") ||
        (eleccionPC === "papel🧻" && eleccionUsuario === "piedra🪨")
    ) {
        ganaPc();
    } else {
        empate();
    }

    mensaje.classList.remove("disabled");
    contenedorPuntosUsuario.innerText = puntosUsuario;
    contenedorPuntosPC.innerText = puntosPC;

    if (puntosUsuario === 5) {
        instrucciones.innerText = "🚀🚀🚀¡Ganaste el juego!🚀🚀🚀";
        terminarJuego();
    }

    if (puntosPC === 5) {
        instrucciones.innerText = "😭😭 ¡Perdiste! 😭😭";
        terminarJuego();
    }
}

// Función si gana el usuario
function ganaUsuario() {
    puntosUsuario++;
    contenedorPuntosUsuario.innerText = puntosUsuario;
    contenedorGanaPunto.innerText = "🎉Ganaste un punto🎉";
    animarPunto(contenedorPuntosUsuario);
}

// Función si gana la PC
function ganaPc() {
    puntosPC++;
    contenedorPuntosPC.innerText = puntosPC;
    contenedorGanaPunto.innerText = "La Compu gana 🥹";
    animarPunto(contenedorPuntosPC);
}

// Función para empate
function empate() {
    contenedorGanaPunto.innerText = "Empate 🥴";
}

// Animación visual del punto
function animarPunto(elemento) {
    elemento.classList.add("explota");
    setTimeout(() => {
        elemento.classList.remove("explota");
    }, 500);
}

// Terminar juego
function terminarJuego() {
    elegiTuArma.classList.add("disabled");
    reiniciar.classList.remove("disabled");
}

// Reiniciar juego
function reiniciarJuego() {
    reiniciar.classList.add("disabled");
    elegiTuArma.classList.remove("disabled");
    mensaje.classList.add("disabled");

    puntosUsuario = 0;
    puntosPC = 0;

    contenedorPuntosUsuario.innerText = puntosUsuario;
    contenedorPuntosPC.innerText = puntosPC;
    instrucciones.innerText = "El primero que llega a 5 gana";
}
