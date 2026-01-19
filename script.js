const albumes = {
    'fotos': ['nosotros1.jpg', 'nosotros2.jpg', 'nosotros3.jpg', 'nosotros4.jpg', 'nosotros5.jpg','nosotros6.jpg']
};

// 1. AGREGA TUS VIDEOS AQUÍ
const listaDeVideos = [
    'video1.mp4', 
    'video2.mp4',
    'video3.mp4'
];

let fotosActuales = [];
let indiceActual = 0;

// FUNCIONES FOTOS
function abrirAlbum(id) {
    if (albumes[id]) {
        fotosActuales = albumes[id];
        indiceActual = 0;
        actualizarVista();
        document.getElementById('visor').style.display = "flex";
        document.body.style.overflow = "hidden";
    }
}

function actualizarVista() {
    const contenedor = document.getElementById('fotos-contenedor');
    contenedor.innerHTML = `<img src="${fotosActuales[indiceActual]}" class="fade-in">`;
    document.getElementById('contador').innerText = `${indiceActual + 1} / ${fotosActuales.length}`;
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

// --- FUNCIONES VIDEOS ACTUALIZADAS ---
function mostrarVideos() {
    const gridVideos = document.querySelector('.grid-videos');
    
    // Solo cargamos los videos si el contenedor está vacío
    if (gridVideos.innerHTML.trim() === "") {
        listaDeVideos.forEach(video => {
            gridVideos.innerHTML += `
                <video controls playsinline>
                    <source src="${video}" type="video/mp4">
                    Tu navegador no soporta video.
                </video>
            `;
        });
    }

    document.getElementById('seccion-videos').style.display = "flex";
    document.body.style.overflow = "hidden";
}

function cerrarVideos() {
    const modalVideos = document.getElementById('seccion-videos');
    
    // Pausar todos los videos para que no siga sonando el audio
    const vids = modalVideos.querySelectorAll('video');
    vids.forEach(v => v.pause());

    modalVideos.style.display = "none";
    document.body.style.overflow = "auto";
}

// SWIPE CELULAR
let xDown = null;
document.getElementById('visor').addEventListener('touchstart', (e) => { xDown = e.touches[0].clientX; });
document.getElementById('visor').addEventListener('touchmove', (e) => {
    if (!xDown) return;
    let xDiff = xDown - e.touches[0].clientX;
    if (Math.abs(xDiff) > 40) {
        if (xDiff > 0) cambiarFoto(1); else cambiarFoto(-1);
        xDown = null;
    }
});
