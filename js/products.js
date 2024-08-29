class ProductoCuidado {
    constructor(nombre, precio, tipo, imagen, cantidad = 1) {
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.tipo = tipo;
        this.imagen = imagen;
        this.cantidad = cantidad;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    
    if (!localStorage.getItem('productos')) {
        agregarProductosEjemplo();
    }
    mostrarProductos();

    
    document.getElementById('searchInput').addEventListener('input', filtrarProductos);
    mostrarCarrito();
});

function agregarProductosEjemplo() {
    let productos = [
        new ProductoCuidado("Crema Tattoo", 15.99, "Crema", "../img/crema_tattoo.jpg"),
        new ProductoCuidado("Loción Aftercare", 12.99, "Loción", "../img/locion_aftercare.jpg"),
        new ProductoCuidado("Jabón Antibacterial", 9.99, "Jabón", "../img/jabon_antibacterial.jpg"),
        new ProductoCuidado("Pomada Sanadora", 14.99, "Pomada", "../img/pomada_sanadora.jpg"),
        new ProductoCuidado("Spray Refrescante", 11.99, "Spray", "../img/spray_refrescante.jpg"),
        new ProductoCuidado("Crema Hidratante", 13.99, "Crema", "../img/crema_hidratante.jpg")
    ];
    localStorage.setItem('productos', JSON.stringify(productos));
}

function mostrarProductos(filtrados = null) {
    let productos = filtrados || JSON.parse(localStorage.getItem('productos')) || [];
    let catalog = document.getElementById('catalog');
    catalog.innerHTML = '';

    if (productos.length > 0) {
        productos.forEach(prod => {
            let catalogItem = document.createElement('div');
            catalogItem.className = 'col-md-4';
            catalogItem.innerHTML = `
                <div class="card mb-4 shadow-sm">
                    <img src="${prod.imagen}" class="card-img-top product-img" alt="${prod.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${prod.nombre}</h5>
                        <p class="card-text">Precio: $${prod.precio}</p>
                        <p class="card-text">Tipo: ${prod.tipo}</p>
                        <button class="btn custom-button add-to-cart" data-name="${prod.nombre}">Agregar al Carrito</button>
                    </div>
                </div>
            `;
            catalog.appendChild(catalogItem);
        });

       
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', agregarAlCarrito);
        });
    } else {
        catalog.innerHTML = '<p>No hay productos disponibles.</p>';
    }
}

function filtrarProductos(event) {
    let searchQuery = event.target.value.toLowerCase();
    let productos = JSON.parse(localStorage.getItem('productos')) || [];
    let productosFiltrados = productos.filter(prod => {
        return prod.nombre.toLowerCase().includes(searchQuery) ||
               prod.tipo.toLowerCase().includes(searchQuery) ||
               prod.precio.toString().includes(searchQuery);
    });
    mostrarProductos(productosFiltrados);
}

function agregarAlCarrito(event) {
    let productoNombre = event.target.getAttribute('data-name');
    let productos = JSON.parse(localStorage.getItem('productos')) || [];
    let producto = productos.find(prod => prod.nombre === productoNombre);

    if (producto) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        let productoEnCarrito = carrito.find(prod => prod.nombre === productoNombre);

        if (productoEnCarrito) {
            productoEnCarrito.cantidad += 1;
        } else {
            carrito.push(new ProductoCuidado(producto.nombre, producto.precio, producto.tipo, producto.imagen, 1));
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
    }
}

function removerDelCarrito(event) {
    let productoNombre = event.target.getAttribute('data-name');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(prod => prod.nombre !== productoNombre);

    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

function actualizarCantidad(event) {
    let productoNombre = event.target.getAttribute('data-name');
    let action = event.target.getAttribute('data-action');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let producto = carrito.find(prod => prod.nombre === productoNombre);

    if (producto) {
        if (action === 'increase') {
            producto.cantidad += 1;
        } else if (action === 'decrease' && producto.cantidad > 1) {
            producto.cantidad -= 1;
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
    }
}

function calcularTotal() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    return carrito.reduce((total, prod) => total + (prod.precio * prod.cantidad), 0).toFixed(2);
}

// Función para mostrar el carrito
function mostrarCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let cart = document.getElementById('cart');
    cart.innerHTML = '';

    if (carrito.length > 0) {
        carrito.forEach(prod => {
            let cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <h4>${prod.nombre}</h4>
                <p>Precio: $${prod.precio}</p>
                <p>Tipo: ${prod.tipo}</p>
                <p>Cantidad: ${prod.cantidad}</p>
                <img src="${prod.imagen}" alt="${prod.nombre}" style="max-width: 50px; max-height: 50px;">
                <button class="btn btn-secondary" data-name="${prod.nombre}" data-action="decrease">-</button>
                <button class="btn btn-secondary" data-name="${prod.nombre}" data-action="increase">+</button>
                <button class="btn btn-danger" data-name="${prod.nombre}">Eliminar</button>
            `;
            cart.appendChild(cartItem);
        });

        document.querySelectorAll('.btn-danger').forEach(button => {
            button.addEventListener('click', removerDelCarrito);
        });

        document.querySelectorAll('.btn-secondary').forEach(button => {
            button.addEventListener('click', actualizarCantidad);
        });

        let total = calcularTotal();
        let totalElement = document.createElement('div');
        totalElement.className = 'total';
        totalElement.innerHTML = `<h4>Total: $${total}</h4>`;
        cart.appendChild(totalElement);
    } else {
        cart.innerHTML = '<p>El carrito está vacío.</p>';
    }
}

// Función para finalizar la compra
function finalizarCompra() {
    // Vaciar el carrito
    localStorage.removeItem('carrito');

    // Mostrar mensaje
    alert('¡Gracias por tu compra! Tu carrito ha sido vaciado.');

    // Actualizar la vista del carrito
    mostrarCarrito();
}

// Ejecutar código cuando el documento esté listo
document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('productos')) {
        agregarProductosEjemplo();
    }
    mostrarProductos();
    document.getElementById('searchInput').addEventListener('input', filtrarProductos);
    mostrarCarrito();

    // Agregar el manejador de eventos para el botón "Finalizar compra"
    const finalizarCompraBtn = document.getElementById('finalizarCompraBtn');
    if (finalizarCompraBtn) {
        finalizarCompraBtn.addEventListener('click', finalizarCompra);
    }
});
