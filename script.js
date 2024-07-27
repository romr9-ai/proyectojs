// Clase para representar un producto de cuidado post tatuaje
class ProductoCuidado {
    constructor(nombre, precio, tipo) {
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.tipo = tipo;
    }
}

let productos = [];

// Función para mostrar el menú y capturar la opción del usuario
function mostrarMenu() {
    return prompt("Elige una opción:\n1. Agregar producto\n2. Buscar producto\n3. Filtrar productos por tipo\n4. Salir");
}

// Función para agregar un producto
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

// Función principal para manejar el menú y las opciones
function gestionarProductos() {
    let opcion;
    do {
        opcion = mostrarMenu();
        switch (opcion) {
            case "1":
                agregarProducto();
                break;
            case "2":
                buscarProducto();
                break;
            case "3":
                filtrarProductos();
                break;
            case "4":
                alert("Saliendo del sistema...");
                break;
            default:
                alert("Opción no válida, intenta de nuevo.");
        }
    } while (opcion !== "4");
}

// Iniciar la gestión de productos
gestionarProductos();
