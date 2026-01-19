const albumes = {
    'viajes': ['viaje1.jpg', 'viaje2.jpg', 'viaje3.jpg'],
    'citas': ['cita1.jpg', 'cita2.jpg']
};

let fotosActuales = [];
let indiceActual = 0;

function abrirAlbum(id) {
    fotosActuales = albumes[id];
    indiceActual = 0;
    actualizarVista();
    document.getElementById('visor').style.display = "flex";
    document.body.style.overflow = "hidden";
}

function actualizarVista() {
    const contenedor = document.getElementById('fotos-contenedor');
    const contador = document.getElementById('contador');
    contenedor.innerHTML = `<img src="${fotosActuales[indiceActual]}" class="fade-in">`;
    if (contador) contador.innerText = `${indiceActual + 1} / ${fotosActuales.length}`;
}

function cambiarFoto(dir) {
    indiceActual += dir;
    if (indiceActual >= fotosActuales.length) indiceActual = 0;
    if (indiceActual < 0) indiceActual = fotosActuales.length - 1;
    actualizarVista();
}

function cerrarVisor() {
    document.getElementById('visor').style.display = "none";
    document.body.style.overflow = "auto";
}

// LÓGICA SWIPE PARA CELULAR
let xDown = null;
const visor = document.getElementById('visor');

visor.addEventListener('touchstart', (e) => { xDown = e.touches[0].clientX; });
visor.addEventListener('touchmove', (e) => {
    if (!xDown) return;
    let xUp = e.touches[0].clientX;
    let xDiff = xDown - xUp;

    if (Math.abs(xDiff) > 30) { // Sensibilidad alta
        if (xDiff > 0) cambiarFoto(1); else cambiarFoto(-1);
        xDown = null; 
    }
});
