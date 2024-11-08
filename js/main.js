// array de productos
const productos = [
    { id: 1, nombre: "Manzana", precio: 210, imagen: "manzanas.jpeg"},
    { id: 2, nombre: "Banana", precio: 185, imagen: "bananas.jpg"},
    { id: 3, nombre: "Ciruela", precio: 106, imagen: "ciruelas.jpeg"},    
    { id: 4, nombre: "Pera", precio: 156, imagen: "peras.jpg"},
    { id: 5, nombre: "Mango", precio: 280, imagen: "mangos.jpeg"},
    { id: 6, nombre: "Mandarina", precio: 98, imagen: "mandarinas.jpeg"},
    { id: 7, nombre: "Naranja", precio: 208, imagen: "naranjas.jpg"},
    { id: 8, nombre: "Durazno", precio: 164, imagen: "Duraznos.jpg"},
];

// contenedor de productos en el DOM
const contenedorProductos = document.getElementById("contenedor-productos");

// funcion  para renderizar los productos en el contenedor
function renderizarProductos() {
    productos.forEach(producto => {
        const div = crearElementoProducto(producto);
        contenedorProductos.appendChild(div);
    });
    agregarBotones();
}

// fncion para crear la estructura HTML de un producto individual
function crearElementoProducto(producto) {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = 
        `<h3>${producto.nombre}</h3>
        <img src="./img/${producto.imagen}" alt="${producto.nombre}" class="imagen-producto">
        <p class="precio">Precio: $${producto.precio}</p>
        <div class="contador">
            <button class="btn-restar" id="minus-${producto.id}">-</button>
            <span id="counter-${producto.id}">0</span>
            <button class="btn-sumar" id="plus-${producto.id}">+</button>
        </div>
        <button class="btn-agregar" id="add-${producto.id}">Agregar</button>`;
    return div;
}

// funcion para la logica de los botones sumar y restar para cada producto
function agregarBotones() {
    productos.forEach(producto => {
        const btnSumar = document.getElementById(`plus-${producto.id}`);
        const btnRestar = document.getElementById(`minus-${producto.id}`);
        const counter = document.getElementById(`counter-${producto.id}`);
        const btnAgregar = document.getElementById(`add-${producto.id}`);
        let contador = 0;

        // boton sumar
        btnSumar.onclick = () => {
            contador++;
            actualizarContador(counter, contador);
            btnRestar.disabled = false;
            actualizarCarrito(producto.id, contador);
        };

        // boton restar
        btnRestar.onclick = () => {
            if (contador > 0) {
                contador--;
                actualizarContador(counter, contador);
                if (contador === 0) {
                    btnRestar.disabled = true;
                }
                actualizarCarrito(producto.id, contador);
            }
        };
        btnRestar.disabled = true;

        //boton agregar
        btnAgregar.onclick = () => {
            if(contador > 0){
                actualizarCarrito(producto, id, contador);
            }
        }
    });
}

// actualizar el contenido del contador de productos en el HTML
function actualizarContador(elemento, valor) {
    elemento.innerHTML = valor;
}

// funcion para gestionar el carrito de compras
function actualizarCarrito(id, cantidad) {
    let carrito = obtenerCarrito();
    const producto = obtenerProducto(id);
    const productoEnCarrito = carrito.find(item => item.id == id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad = cantidad;
        if (cantidad === 0) {
            carrito = carrito.filter(item => item.id != id);
        }
    } else if (cantidad > 0) {
        carrito.push({ ...producto, cantidad });
    }

    guardarCarrito(carrito);
}

// obtener el carrito del localStorage
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

// obtener un producto por su ID
function obtenerProducto(id) {
    return productos.find(prod => prod.id == id);
}

// guardar el carrito en el localStorage
function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// renderizar los productos al cargar el script
renderizarProductos();
