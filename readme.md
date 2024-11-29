Frutería Román - Proyecto Final
Frutería Román es una aplicación desarrollada como proyecto final para la entrega de un ecommerce funcional en JavaScript.

Estructura del Proyecto
El proyecto se organiza en varias carpetas y archivos para mantener el código limpio y modular:



HTML: Contiene dos páginas principales:

index.html: Página principal donde se muestran los productos.

carrito.html: Página del carrito de compras.



CSS: Archivo style.css para los estilos de la aplicación.



JS:

main.js: se encarga de la carga de productos, interacción con los botones de sumar/restar y agrega los productos al carrito.

carrito.js: visualiza los productos seleccionados, actualiza la cantidad y finaliza la compra.



DB: Archivo data.json que contiene la información de los productos.



Librerías:

Toastify.js: Para notificaciones.

SweetAlert2: Para mostrar alertas personalizadas.



Funcionalidades



Página Principal (index.html):

Carga de productos desde un archivo JSON.
Interacción con botones de sumar, restar y agregar productos al carrito.
Notificaciones usando Toastify.


Carrito de Compras (carrito.html):

Visualización de los productos añadidos al carrito.
Posibilidad de sumar, restar o eliminar productos.
Cálculo del total de la compra, además un descuento del 10% para montos superiores a $4500.
Mensajes personalizados al finalizar la compra con SweetAlert2.
Almacenamiento de Datos: El carrito de compras se almacena en localStorage para mantener los datos entre sesiones.

Creador: Martín Román Dana