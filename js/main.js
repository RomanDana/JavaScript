/* let totalCompra = 0;
let cantidadManzanas = 0;
let cantidadBananas = 0;
let cantidadNaranjas = 0;
let cantidadPeras = 0;
let cantidadCiruela = 0;
let cantidadMandarina = 0;
let cantidadMango = 0;
let cantidadDurazno = 0;
let carritocompras = [cantidadManzanas, cantidadBananas, cantidadNaranjas, cantidadPeras, cantidadCiruela, cantidadMandarina, cantidadMango, cantidadDurazno]

const precioManzana= 210;
const precioBanana= 185;
const precioNaranja= 208;
const precioPera= 156;
const precioCiruela= 106;
const precioMandarina= 98;
const precioMango= 280;
const precioDurazno= 164;

function manzana(cantidad){
   (cantidadManzanas += cantidad)     
}

function banana(cantidad){
       (cantidadBananas += cantidad) 
}

function naranja(cantidad){
        (cantidadNaranjas += cantidad)
}

function pera(cantidad){
        (cantidadPeras += cantidad)
}   
function ciruela(cantidad){
        (cantidadCiruela  += cantidad)
}
function mandarina(cantidad){
        (cantidadMandarina  += cantidad)
}
function mango(cantidad){
        (cantidadMango  += cantidad)
}
function durazno(cantidad){
        (cantidadDurazno  += cantidad)
}

function compraTotal(){
        let manzanas = (cantidadManzanas * precioManzana);
        let bananas = (cantidadBananas * precioBanana);
        let naranjas = (cantidadNaranjas * precioNaranja);
        let peras = (cantidadPeras * precioPera); 
        let ciruela = (cantidadCiruela * precioCiruela);
        let mandarina = (cantidadMandarina * precioMandarina);
        let mango = (cantidadMango * precioMango);
        let durazno = (cantidadDurazno * precioDurazno); 
        let resultado = (manzanas + bananas + naranjas + peras + ciruela + mandarina + mango + durazno);
        return resultado 
}
function aplicarDescuento(total) {
        if (total > 5500) {
            alert("¡Felicidades! Tenes un descuento del 10%, porque has superado el monto de $5500");
            return total * 10; 
        }
        return total;
}
 
let continuar = true  

while(continuar){
let frutas =parseInt(prompt("Elija un producto: \n 1- Manzana \n 2- Banana \n 3- Naranja \n 4- Pera \n 5- Ciruela \n 6- Mandarina \n 7- Mango \n 8- Durazno \n 9- Salir"))         
        switch(frutas){
                case 1:           
                        let cantidadManzanas = parseInt(prompt("¿Cuantas manzanas desea llevar?")) ;manzana(cantidadManzanas)
                        console.log("Las manzanas son una buena eleccion para este verano...")
                        break
                case 2:                       
                        let cantidadBananas = parseInt(prompt("¿Cuantas bananas desea llevar?")) ;banana(cantidadBananas)
                        console.log("Las bananas aportan potasio ")
                        break
                case 3: 
                        let cantidadNaranjas = parseInt(prompt("¿Cuantas naranjas desea llevar?")) ;naranja(cantidadNaranjas)
                        console.log("las naranjas son fuente de vitamina C")
                        break
                case 4:                         
                        let cantidadPeras =  parseInt(prompt("¿Cuantas peras desea llevar?")) ;pera(cantidadPeras)
                        console.log("las peras estan en su punto justo!!")
                        break
                case 5:
                        let cantidadCiruela =  parseInt(prompt("¿Cuantas ciruela desea llevar?")) ;ciruela(cantidadCiruela)
                        console.log("las ciruelas estan dulces y jugosas")
                        break
                case 6:
                        let cantidadMandarina =  parseInt(prompt("¿Cuantas mandarina desea llevar?")) ;mandarina(cantidadMandarina)
                        console.log("Estas mandarinas estan muy dulces")
                        break
                case 7: 
                        let cantidadMango =  parseInt(prompt("¿Cuantos mango desea llevar?")) ;mango(cantidadMango)
                        console.log("el mango esta bueno para hacer licuado tropical!!")
                        break
                case 8:
                        let cantidadDurazno =  parseInt(prompt("¿Cuantos duraznos desea llevar?")) ;durazno(cantidadDurazno)
                        console.log("la pulpa del durazno tiene un rico aroma")
                        break
                case 9:
                        continuar = false
                        console.log("¡¡Gracias por su compra!!")
                default:
                        alert("No tenemos ese producto....")
                        break    
        }
        if(continuar){
                let confirmacion = prompt("¿Desea seguir comprando? (si/no)").toLowerCase()
                if (confirmacion === "no"){
                        continuar = false
                        console.log("¡¡Gracias por su compra!!")
                } 
                else if(confirmacion === "si"){
                        console.log("¿Que mas quiere llevar?")
                } 
                else{
                        console.log ("No he entendido tu respuesta...") 
                }        
        }      
}
let total = compraTotal();
total = aplicarDescuento(total);

alert("El total de la compra es: $" + total)

alert("Finalizando compra, ¡¡Gracias por confiar en Fruteria Román!!") */





let totalCompra = 0;
let cantidades = [0, 0, 0, 0, 0, 0, 0, 0];
const precios = [210, 185, 208, 156, 106, 98, 280, 164];
const frutas = ["manzanas", "bananas", "naranjas", "peras", "ciruelas", "mandarinas", "mangos", "duraznos"];



const sumar = (cantidad, indice) => cantidades[indice] += cantidad;

function compraTotal(cantidades, precios) {
    let total = 0;
    for (let i = 0; i < cantidades.length; i++) {
        total += cantidades[i] * precios[i];
    }
    return total;
}

function aplicarDescuento(total) {
    if (total > 5500) {
        alert("¡Felicidades! Tienes un descuento del 10%, porque has superado el monto de $5500");
        return total * 0.90; 
    }
    return total;
}

let continuar = true;

while (continuar) {
    let menu = parseInt(prompt("Elija un producto: \n 1- Manzana \n 2- Banana \n 3- Naranja \n 4- Pera \n 5- Ciruela \n 6- Mandarina \n 7- Mango \n 8- Durazno \n 9- Salir"));
    if (menu >= 1 && menu <= 8){
        let cantidad = parseInt(prompt("¿Cuantas unidades de " + frutas[menu -1] + " desea llevar?" ))
        sumar(cantidad, menu -1)
        console.log("agregaste " + (cantidad) + " " + frutas[menu -1] + " a tu compra")
        }else if (menu === 9){
                continuar=false
                console.log("gracias por su compra!!")
        }else{
                alert("no tenemos ese producto....")
        }

    if (continuar) {
        let confirmacion = prompt("¿Desea seguir comprando? (si/no)").toLowerCase();
        if (confirmacion === "no") {
            continuar = false;
            console.log("¡¡Gracias por su compra!!");
        } else if (confirmacion === "si") {
            console.log("No he entendido tu respuesta...");
        }
    }
}

let total = compraTotal(cantidades, precios);
total = aplicarDescuento(total);

alert("El total de la compra es: $" + total);
alert("Finalizando compra, ¡¡Gracias por confiar en Frutería Román!!");


