let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedorCarrito = document.getElementById("contenedor-carrito");
const totalCompra = document.getElementById("total-compra");

function actualizarCarrito() {
    contenedorCarrito.innerHTML = "";
    carrito.forEach((item) => {
        if (item.cantidad > 0) {
            const div = document.createElement("div");
            div.className = "item-carrito";
            div.innerHTML = `<p>${item.nombre} x ${item.cantidad}</p>
                <p class= "precio">$${item.precio * item.cantidad}</p>
                <button class="btn-eliminar" id="btn${item.id}">Eliminar</button>`;

            contenedorCarrito.appendChild(div);

            const botonEliminar = document.getElementById(`btn${item.id}`);
            botonEliminar.addEventListener("click", () => eliminarDelCarrito(item.id));
        }
    });

    calcularTotal();
}

function calcularTotal() {
    let total = 0;
    for (let i = 0; i < carrito.length; i++) {
        total += carrito[i].precio * carrito[i].cantidad;
    }
    const totalConDescuento = total > 4500 ? total * 0.9 : total;
    totalCompra.innerText = `Total sin descuento: $${total}`;
    if (total > 4500) {
        const mensajeDescuento = document.createElement("p");
        mensajeDescuento.innerText = "¡Al superar el monto de $4500 se aplica un descuento del 10%!";
        totalCompra.appendChild(mensajeDescuento);
        const totalFinal = document.createElement("p");
        totalFinal.innerText = `Total: $${totalConDescuento.toFixed(2)}`;
        totalCompra.appendChild(totalFinal);
    }
}

function eliminarDelCarrito(id) {
    const index = carrito.findIndex((item) => item.id == id);

    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

actualizarCarrito();

