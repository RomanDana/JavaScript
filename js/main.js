const productos = [
    { id: 1, nombre: "Manzana", precio: 210 },
    { id: 2, nombre: "Banana", precio: 185 },
    { id: 3, nombre: "Naranja", precio: 208 },
    { id: 4, nombre: "Pera", precio: 156 },
    { id: 5, nombre: "Ciruela", precio: 106 },
    { id: 6, nombre: "Mandarina", precio: 98 },
    { id: 7, nombre: "Mango", precio: 280 },
    { id: 8, nombre: "Durazno", precio: 164 },
];

const contenedorProductos = document.getElementById("contenedor-productos");

function renderizarProductos() {
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.className = "producto";
        div.innerHTML = 
            `<h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button class="btn-agregar" id="${producto.id}">Agregar al carrito</button>`
        ;
        contenedorProductos.appendChild(div);
    });
    agregarBotones();
}

function agregarBotones() {
    const botonesAgregar = document.querySelectorAll(".btn-agregar");
    botonesAgregar.forEach(boton => {
        boton.onclick = (e) => {
            const productoId = e.target.id;
            agregarAlCarrito(productoId);                      
        };
    });
}

// Agrega productos al carrito y lo guarda en localStorage
function agregarAlCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const producto = productos.find(prod => prod.id == id);
    const productoEnCarrito = carrito.find(item => item.id == id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    console.log(carrito);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Llama a la función para renderizar productos
renderizarProductos();


