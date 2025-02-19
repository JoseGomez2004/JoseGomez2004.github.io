const listaHechos = document.getElementById('lista-hechos');
const inputHecho = document.getElementById('nuevo-hecho');

// Array para almacenar los hechos
let hechos = [];

function agregarHecho() {
    const texto = inputHecho.value.trim();
    
    if (texto !== '') {
        const hecho = {
            id: Date.now(),
            texto: texto,
            completado: false
        };

        hechos.push(hecho);
        renderizarHechos();
        inputHecho.value = '';
    }
}

function eliminarHecho(id) {
    hechos = hechos.filter(hecho => hecho.id !== id);
    renderizarHechos();
}

function toggleCompletado(id) {
    hechos = hechos.map(hecho => {
        if (hecho.id === id) {
            return { ...hecho, completado: !hecho.completado };
        }
        return hecho;
    });
    renderizarHechos();
}

function renderizarHechos() {
    listaHechos.innerHTML = '';
    
    hechos.forEach(hecho => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="hecho-contenido">
                <input type="checkbox" 
                       ${hecho.completado ? 'checked' : ''} 
                       onchange="toggleCompletado(${hecho.id})">
                <span style="text-decoration: ${hecho.completado ? 'line-through' : 'none'}">
                    ${hecho.texto}
                </span>
            </div>
            <button onclick="eliminarHecho(${hecho.id})" class="btn-eliminar">
                <i class="fas fa-trash"></i>
            </button>
        `;
        listaHechos.appendChild(li);
    });
}


const themeToggler = document.querySelector('.theme-toggler');
let isDarkMode = localStorage.getItem('darkMode') === 'true';

// Función para manejar el cambio de tema
function toggleTheme() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode);
    document.body.classList.toggle('dark-mode', isDarkMode);
}

// Inicializar el tema
function initializeTheme() {
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
}

// Agregar el evento click al botón de tema
themeToggler.addEventListener('click', toggleTheme);

// Llamar a la inicialización del tema
initializeTheme();

// Evento para agregar hecho con Enter
inputHecho.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        agregarHecho();
    }
});

// Inicializar la lista
renderizarHechos();