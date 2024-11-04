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
            <p class= "precio">Precio: $${producto.precio}</p>
            <div class="contador">
                <button class="btn-restar" id="minus-${producto.id}">-</button>
                <span id="counter-${producto.id}">0</span>
                <button class="btn-sumar" id="plus-${producto.id}">+</button>
            </div>`;
        contenedorProductos.appendChild(div);
    });
    agregarBotones();
}

function agregarBotones() {
    productos.forEach(producto => {
        const btnSumar = document.getElementById(`plus-${producto.id}`)
        const btnRestar = document.getElementById(`minus-${producto.id}`)
        const counter = document.getElementById(`counter-${producto.id}`)
        let contador = 0

        btnSumar.onclick = () => {
            contador++
            counter.innerHTML = contador
            btnRestar.disabled = false
            actualizarCarrito(producto.id, contador)
        };

        btnRestar.onclick = () => {
            if (contador > 0) {
                contador--
                counter.innerHTML = contador
                if (contador === 0) {
                    btnRestar.disabled = true
                }
                actualizarCarrito(producto.id, contador)
            }
        };
        btnRestar.disabled = true
    });
}

function actualizarCarrito(id, cantidad) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const producto = productos.find(prod => prod.id == id);
    const productoEnCarrito = carrito.find(item => item.id == id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad = cantidad;
        if (cantidad === 0) {
            carrito = carrito.filter(item => item.id != id);
        }
    } else if (cantidad > 0) {
        carrito.push({ ...producto, cantidad });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

renderizarProductos();


