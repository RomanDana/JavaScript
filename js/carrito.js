let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const contenedorCarrito = document.getElementById("contenedor-carrito");
const totalCompra = document.getElementById("total-compra");
const btnFinalizarCompra = document.getElementById("finalizar-compra");
const mensajeCompra = document.getElementById("mensaje-compra");

function actualizarCarrito() {
    contenedorCarrito.innerHTML = "";
    carrito.forEach((item) => {
        if (item.cantidad > 0) {
            const div = document.createElement("div");
            div.className = "item-carrito";
            div.innerHTML = `
                <p>${item.nombre} x ${item.cantidad}</p>
                <p class="precio">$${item.precio * item.cantidad}</p>
                <div class="control-cantidad">
                    <button class="btn-restar" id="restar-${item.id}">-</button>
                    <span class="cantidad" id="counter-${item.id}">${item.cantidad}</span>
                    <button class="btn-sumar" id="sumar-${item.id}">+</button>
                </div>
                <button class="btn-eliminar" id="btn${item.id}">Eliminar</button>
            `;

            contenedorCarrito.appendChild(div);
        }
    });

    agregarBotonesCarrito();
    calcularTotal();
}

function agregarBotonesCarrito() {
    carrito.forEach((item) => {
        const btnSumar = document.getElementById(`sumar-${item.id}`);
        const btnRestar = document.getElementById(`restar-${item.id}`);
        const btnEliminar = document.getElementById(`btn${item.id}`);
        const counter = document.getElementById(`counter-${item.id}`);
        let contador = item.cantidad;

        // Botón sumar
        btnSumar.onclick = () => {
            contador++;
            actualizarContador(counter, contador);
            btnRestar.disabled = false;
            actualizarCarritoItem(item.id, contador);
        };

        // Botón restar
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

        // Botón eliminar
        btnEliminar.onclick = () => eliminarDelCarrito(item.id);
    });
}

function actualizarContador(elemento, valor) {
    elemento.innerText = valor;
}

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

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

function finalizarCompra() {
    if (carrito.length === 0) {
        mensajeCompra.innerText = "Tu carrito está vacío.";
    } else {
        mensajeCompra.innerText = "Gracias por comprar en Frutería Roman";
        carrito = [];
        localStorage.removeItem("carrito");
        actualizarCarrito();
    }
}

btnFinalizarCompra.addEventListener("click", finalizarCompra);
actualizarCarrito();


