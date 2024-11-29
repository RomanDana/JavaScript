let container = document.getElementById("contenedor-productos");

// funcion que maneja la carga de productos
function cargarProductos() {
    return new Promise((resolve, reject) => {
        fetch("./db/data.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error("No se pudo cargar el archivo JSON");
                }
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(`Error al cargar productos: ${error.message}`);
            });
    });
}

// inicializar productos con try-catch y renderizarlos
async function inicializarProductos() {
    try {
        const productos = await cargarProductos();
        productos.forEach(producto => {
            const card = document.createElement("div");
            card.className = "producto";
            card.innerHTML = `
                <h3>${producto.nombre}</h3>
                <img src="./img/${producto.imagen}" alt="${producto.nombre}" class="imagen-producto">
                <p class="precio">Precio: $${producto.precio}</p>
                <div class="contador">
                    <button class="btn-restar" id="minus-${producto.id}">-</button>
                    <span id="counter-${producto.id}">0</span>
                    <button class="btn-sumar" id="plus-${producto.id}">+</button>
                </div>
                <button class="btn-agregar" id="add-${producto.id}">Agregar</button>`;
            container.appendChild(card);
        });
        agregarBotones(productos);
    } catch (error) {
        mostrarMensajeError(error);
    }
}

// funcion para mostrar errores en el DOM
function mostrarMensajeError(mensaje) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error";
    errorDiv.textContent = mensaje;
    container.appendChild(errorDiv);
}

// validar carrito
function validarCarrito(carrito) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (carrito.length === 0) {
                reject("No has seleccionado la cantidad.");
            } else {
                resolve("Producto agregado al carrito.");
            }
        }, 250);
    });
}

// logica de los botones
function agregarBotones(productos) {
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
            actualizarCarrito(producto.id, contador, productos);
        };

        // boton restar
        btnRestar.onclick = () => {
            if (contador > 0) {
                contador--;
                actualizarContador(counter, contador);
                if (contador === 0) {
                    btnRestar.disabled = true;
                }
                actualizarCarrito(producto.id, contador, productos);
            }
        };
        btnRestar.disabled = true;

        // boton agregar
        btnAgregar.onclick = async () => {
            try {
                if (contador === 0) {
                    throw new Error("No has seleccionado la cantidad.");
                }
                const mensaje = await validarCarrito(obtenerCarrito());
                Toastify({
                    text: mensaje,
                    duration: 2000,
                    destination: "../carrito.html",
                    newWindow: true,
                    close: false,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                        background: "linear-gradient(to right, #c80000, #ff0000)",
                    },
                }).showToast();
            } catch (error) {
                Toastify({
                    text: error.message,
                    duration: 1200,
                    destination: "",
                    newWindow: true,
                    close: false,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                        background: "linear-gradient(to right, #c80000, #ff0000)",
                    },
                }).showToast();
            }
        };
    });
}

// actualizar el contador de productos
function actualizarContador(elemento, valor) {
    elemento.innerHTML = valor;
}

// funciones relacionadas con el carrito
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

// actualizar el carrito con un producto
function actualizarCarrito(id, cantidad, productos) {
    let carrito = obtenerCarrito();
    const producto = obtenerProducto(id, productos);
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

// obtener un producto por id
function obtenerProducto(id, productos) {
    return productos.find(prod => prod.id == id);
}

// guardar el carrito en el localStorage
function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

inicializarProductos();



