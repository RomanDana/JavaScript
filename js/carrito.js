let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const contenedorCarrito = document.getElementById("contenedor-carrito");
const totalCompra = document.getElementById("total-compra");
const btnFinalizarCompra = document.getElementById("finalizar-compra");
const mensajeCompra = document.getElementById("mensaje-compra");

// cargar los productos desde un archivo JSON
async function cargarProductos() {
    try {
        const response = await fetch("./db/data.json");
        if (!response.ok) {
            throw new Error(`Error al obtener los datos: archivo JSON no disponible.`);
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Error al cargar productos: ${error.message}`);
    }
}

// actualizar el contenido del carrito
async function actualizarCarrito() {
    contenedorCarrito.innerHTML = "";
    try {
        const productos = await cargarProductos();
        carrito.forEach((item) => {
            const producto = productos.find((prod) => prod.id === item.id);
            if (producto && item.cantidad > 0) {
                const div = document.createElement("div");
                div.className = "item-carrito";
                div.innerHTML = `
                    <p>${producto.nombre} x ${item.cantidad}</p>
                    <p class="precio">$${producto.precio * item.cantidad}</p>
                    <div class="control-cantidad">
                        <button class="btn-restar" id="restar-${producto.id}">-</button>
                        <span class="cantidad" id="counter-${producto.id}">${item.cantidad}</span>
                        <button class="btn-sumar" id="sumar-${producto.id}">+</button>
                    </div>
                    <button class="btn-eliminar" id="btn${producto.id}">Eliminar</button>
                `;
                contenedorCarrito.appendChild(div);
            }
        });

        agregarBotonesCarrito();
        calcularTotal();
    } catch (error) {
        mensajeCompra.innerHTML = `<p class="error">${error.message}</p>`;
    }
}

// agregar eventos a los botones del carrito
function agregarBotonesCarrito() {
    carrito.forEach((item) => {
        const btnSumar = document.getElementById(`sumar-${item.id}`);
        const btnRestar = document.getElementById(`restar-${item.id}`);
        const btnEliminar = document.getElementById(`btn${item.id}`);
        const counter = document.getElementById(`counter-${item.id}`);
        let contador = item.cantidad;

        // Boton sumar
        btnSumar.onclick = () => {
            contador++;
            actualizarContador(counter, contador);
            btnRestar.disabled = false;
            actualizarCarritoItem(item.id, contador);
        };

        // Boton restar
        btnRestar.onclick = () => {
            if (contador > 0) {
                contador--;
                actualizarContador(counter, contador);
                if (contador === 0) {
                    btnRestar.disabled = true;
                }
                actualizarCarritoItem(item.id, contador);
            }
        };
        btnRestar.disabled = contador === 0;

        // Boton eliminar
        btnEliminar.onclick = () => eliminarDelCarrito(item.id);
    });
}

// actualizar el contador de cantidad
function actualizarContador(elemento, valor) {
    elemento.innerText = valor;
}

// actualizar la cantidad de un producto en el carrito
function actualizarCarritoItem(id, cantidad) {
    const productoEnCarrito = carrito.find(item => item.id === id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad = cantidad;
        if (cantidad === 0) {
            carrito = carrito.filter(item => item.id !== id);
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();
    }
}

// calcular el total de la compra
function calcularTotal() {
    let total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    const totalConDescuento = total > 4500 ? total * 0.9 : total;
    totalCompra.innerHTML = `Total sin descuento: $${total}`;
    
    if (total > 4500) {
        totalCompra.innerHTML += `
            <p>¡Al superar el monto de $4500 se aplica un descuento del 10%!</p>
            <p class= "total">Total: $${totalConDescuento.toFixed(2)}</p>
        `;
    } else {
        totalCompra.innerHTML += `<p class= "total">Total: $${totalConDescuento.toFixed(2)}</p>`;
    }
}

// eliminar un producto del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

// finalizar la compra con un mensaje
function finalizarCompra() {
    if (carrito.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Tu carrito está vacío!!",
            text: "Necesitas agregar productos"
        });
    } else {
        Swal.fire({
            title: "¡Atención!",
            text: "¿Quieres finalizar la compra?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#118c11",
            cancelButtonColor: "#ff0000",
            confirmButtonText: "Comprar",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "¡Has comprado en Frutería Roman!",
                    text: "En 1 hora recibirás detalles del envío",
                    icon: "success",
                    confirmButtonColor: "#118c11",
                });
                carrito = [];
                localStorage.removeItem("carrito");
                actualizarCarrito();
            }
        });
    }
}

btnFinalizarCompra.onclick = finalizarCompra;
actualizarCarrito();