// 1. Capturar entradas
let userName = prompt("Ingrese su nombre:");
alert(`Hola, ${userName}! Bienvenido al sistema de gestión de productos de cuidado post tatuaje.`);

// 2. Declarar variables y objetos
class ProductoCuidado {
    constructor(nombre, precio, tipo) {
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.tipo = tipo;
    }
}

let productos = [];

// Función para agregar productos
function agregarProducto() {
    let nombre = prompt("Ingrese el nombre del producto:");
    let precio = prompt("Ingrese el precio del producto:");
    let tipo = prompt("Ingrese el tipo de producto (crema, loción, jabón, etc.):");
    productos.push(new ProductoCuidado(nombre, precio, tipo));
    alert(`Producto ${nombre} agregado con éxito!`);
}

// Función para buscar un producto por nombre
function buscarProducto() {
    let nombre = prompt("Ingrese el nombre del producto a buscar:");
    let producto = productos.find(prod => prod.nombre.toLowerCase() === nombre.toLowerCase());
    if (producto) {
        alert(`Producto encontrado: ${producto.nombre}, Precio: ${producto.precio}, Tipo: ${producto.tipo}`);
    } else {
        alert("Producto no encontrado.");
    }
}

// Función para filtrar productos por tipo
function filtrarProductos() {
    let tipo = prompt("Ingrese el tipo de producto para filtrar (crema, loción, jabón, etc.):");
    let productosFiltrados = productos.filter(prod => prod.tipo.toLowerCase() === tipo.toLowerCase());
    if (productosFiltrados.length > 0) {
        let mensaje = "Productos de tipo " + tipo + ":\n";
        productosFiltrados.forEach(prod => {
            mensaje += `${prod.nombre} - $${prod.precio}\n`;
        });
        alert(mensaje);
    } else {
        alert("No se encontraron productos de este tipo.");
    }
}

// Agregar algunos productos de ejemplo
agregarProducto();
agregarProducto();
agregarProducto();

// Buscar un producto
buscarProducto();

// Filtrar productos por tipo
filtrarProductos();
