// Función para calcular el precio del tatuaje según el tamaño
function calcularPrecio(tamano) {
    let precio;
    if (tamano <= 5) {
      precio = 50; // Precio para tatuajes pequeños
    } else if (tamano <= 10) {
      precio = 100; // Precio para tatuajes medianos
    } else {
      precio = 200; // Precio para tatuajes grandes
    }
    return precio;
  }
  
  // Función para solicitar múltiples tamaños y calcular precios
  function cotizarTatuajes() {
    let continuar = true;
    while (continuar) {
      // Solicitar input del usuario
      let tamanoTatuaje = parseInt(prompt("Por favor, ingrese el tamaño del tatuaje en cm (por ejemplo, 7). Ingrese 0 para terminar:"));
  
      // Condicional para verificar si el tamaño del tatuaje es válido
      if (tamanoTatuaje === 0) {
        continuar = false;
        console.log("Proceso terminado.");
      } else if (isNaN(tamanoTatuaje) || tamanoTatuaje < 0) {
        console.log("Por favor, ingrese un tamaño válido.");
      } else {
        // Calcular y mostrar el precio del tatuaje ingresado usando la función
        let precio = calcularPrecio(tamanoTatuaje);
        console.log("El precio para un tatuaje de " + tamanoTatuaje + " cm es: $" + precio);
      }
    }
  }
  
  // Iniciar el proceso de cotización
  cotizarTatuajes();
  