// Cambio de tema claro/oscuro
const themeToggler = document.querySelector('.theme-toggler');
const body = document.body;

themeToggler.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    // Guardar preferencia en localStorage
    const isDark = body.classList.contains('dark-theme');
    localStorage.setItem('dark-theme', isDark);
});

// Búsqueda de productos
const searchInput = document.querySelector('.search-bar input');
const productos = document.querySelectorAll('.producto');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    productos.forEach(producto => {
        const titulo = producto.querySelector('h2').textContent.toLowerCase();
        const descripcion = producto.querySelector('.descripcion').textContent.toLowerCase();
        
        if (titulo.includes(searchTerm) || descripcion.includes(searchTerm)) {
            producto.style.display = 'block';
        } else {
            producto.style.display = 'none';
        }
    });
});

// Animación de los botones de compra
const btnsComprar = document.querySelectorAll('.btn-comprar');

btnsComprar.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Añadir efecto de click
        btn.classList.add('clicked');
        setTimeout(() => {
            btn.classList.remove('clicked');
        }, 200);
        
        // Aquí puedes añadir la lógica para agregar al carrito
        alert('¡Producto añadido al carrito!');
    });
});

// Animación de los iconos del overlay
document.querySelectorAll('.overlay i').forEach(icon => {
    icon.addEventListener('click', function() {
        this.classList.add('clicked');
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 200);
    });
});