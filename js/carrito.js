let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedorCarrito = document.getElementById("contenedor-carrito");
const totalCompra = document.getElementById("total-compra");

function actualizarCarrito() {
    contenedorCarrito.innerHTML = "";
    carrito.forEach(item => {
        if (item.cantidad > 0) {
            const div = document.createElement("div");
            div.className = "item-carrito";
            div.innerHTML = 
                `<p>${item.nombre} x ${item.cantidad}</p>
                <p>$${item.precio * item.cantidad}</p>
                <button class="btn-eliminar" data-id="${item.id}">Eliminar</button>`;
            contenedorCarrito.appendChild(div);
        }
    });
    calcularTotal();
    agregarEliminar();
}

function calcularTotal() {
    let total = 0;
    for (let i = 0; i < carrito.length; i++) {
        total += carrito[i].precio * carrito[i].cantidad;
    }
    let totalConDescuento; 
    if (total > 4500) {
        totalConDescuento = total * 0.9; 
    } else {
        totalConDescuento = total; 
    }

    totalCompra.innerText = `Total sin descuento: $${total}`;

    if (total > 4500) {
        const mensajeDescuento = document.createElement("p");
        mensajeDescuento.innerText = "¡Se ha aplicado un descuento del 10%!";
        totalCompra.appendChild(mensajeDescuento);
        const totalFinal = document.createElement("p");
        totalFinal.innerText = `Total: $${totalConDescuento.toFixed(2)}`;
        totalCompra.appendChild(totalFinal);
    }
}

function agregarEliminar() {
    const botonesEliminar = document.querySelectorAll(".btn-eliminar");
    botonesEliminar.forEach(boton => {
        boton.onclick = (e) => {
            const productoId = e.target.getAttribute("data-id");
            eliminarDelCarrito(productoId);
        };
    });
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id != id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

actualizarCarrito();
