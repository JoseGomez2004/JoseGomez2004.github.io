// API key de OpenWeatherMap (necesitarás registrarte para obtener una)
const API_KEY = '1c3d1451de4bae0e98b22508b5b06b65';

async function obtenerClima() {
    const ciudad = document.getElementById('ciudad').value;
    if (!ciudad) {
        alert('Por favor, ingresa una ciudad');
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputvalue.value}&units=metric&appid={1c3d1451de4bae0e98b22508b5b06b65}`);
        const data = await response.json();

        if (response.ok) {
            mostrarResultado(data);
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        document.getElementById('resultado').innerHTML = `
            <div class="error">
                <p>Error: No se pudo encontrar la ciudad. Por favor, intenta de nuevo.</p>
            </div>
        `;
    }
}

function mostrarResultado(data) {
    const temperatura = Math.round(data.main.temp);
    const sensacionTermica = Math.round(data.main.feels_like);
    const humedad = data.main.humidity;
    const viento = data.wind.speed;
    const descripcion = data.weather[0].description;
    const icono = data.weather[0].icon;

    document.getElementById('resultado').innerHTML = `
        <div class="weather-details">
            <h2>${data.name}, ${data.sys.country}</h2>
            <img src="http://openweathermap.org/img/wn/${icono}@2x.png" alt="Icono del clima">
            <p class="temperatura">${temperatura}°C</p>
            <p class="descripcion">${descripcion}</p>
            <div class="detalles">
                <p><i class="fas fa-thermometer-half"></i> Sensación térmica: ${sensacionTermica}°C</p>
                <p><i class="fas fa-tint"></i> Humedad: ${humedad}%</p>
                <p><i class="fas fa-wind"></i> Viento: ${viento} m/s</p>
            </div>
        </div>
    `;
}

// Cambiar tema (claro/oscuro)
const themeToggler = document.querySelector('.theme-toggler');
themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});