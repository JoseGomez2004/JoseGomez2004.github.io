let display = document.getElementById('display');
let history = document.getElementById('history');
let themeToggler = document.querySelector('.theme-toggler');
let isDark = false;

// Función para insertar números y operadores
function insert(value) {
    display.value += value;
}

// Función para limpiar la pantalla
function clearDisplay() {
    display.value = '';
    history.textContent = '';
}

// Función para borrar el último dígito
function deleteDigit() {
    display.value = display.value.slice(0, -1);
}

// Función para calcular el resultado
function calculate() {
    try {
        let expression = display.value;
        
        // Guardar la expresión en el historial
        history.textContent = expression;
        
        // Reemplazar × por * y − por -
        expression = expression.replace(/×/g, '*').replace(/−/g, '-');
        
        let result = eval(expression);
        
        // Redondear a 8 decimales para evitar problemas de precisión
        result = Math.round(result * 100000000) / 100000000;
        
        display.value = result;
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => {
            display.value = '';
        }, 1500);
    }
}

// Función para calcular porcentajes
function calculatePercentage() {
    try {
        let value = parseFloat(display.value);
        display.value = value / 100;
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => {
            display.value = '';
        }, 1500);
    }
}

// Cambiar tema claro/oscuro
themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    isDark = !isDark;
    
    // Actualizar estilos para modo oscuro
    if (isDark) {
        document.body.style.background = '#333';
        document.querySelector('.calculator').style.background = '#222';
        display.style.background = '#444';
        display.style.color = '#fff';
    } else {
        document.body.style.background = '#f5f5f5';
        document.querySelector('.calculator').style.background = '#fff';
        display.style.background = '#f8f8f8';
        display.style.color = '#333';
    }
});

// Soporte para teclado
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    // Números y operadores
    if (/[\d\+\-\*\/\(\)\.]/.test(key)) {
        insert(key);
    }
    // Enter para calcular
    else if (key === 'Enter') {
        calculate();
    }
    // Backspace para borrar
    else if (key === 'Backspace') {
        deleteDigit();
    }
    // Escape para limpiar
    else if (key === 'Escape') {
        clearDisplay();
    }
    // % para porcentaje
    else if (key === '%') {
        calculatePercentage();
    }
});