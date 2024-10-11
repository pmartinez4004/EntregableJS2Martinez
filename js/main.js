
const productos = [
    {
        id: 1,
        nombre: "2/11 PUEBLO ESCONDIDO",
        precio: 90000,
        img: '../img/sierrassur5.webp'
    },
    {
        id: 2,
        nombre: "9/11 QUEBRADA DEL SINGURIENTE",
        precio: 75000,
        img: '../img/sierrascentro5.webp'
    },
    {
        id: 3,
        nombre: "16/11 SENDEROS DE COPACABANA",
        precio: 65000,
        img: '../img/sierrasnorte5.webp'
    },
    {
        id: 4,
        nombre: "23/11 VALLE DE LOS LISOS",
        precio: 75000,
        img: '../img/s1.png'
    },
    {
        id: 5,
        nombre: "30/11 LAGOS DE CALAMUCHITA",
        precio: 55000,
        img: '../img/s2w.webp'
    },
    {
        id: 6,
        nombre: "4/12 ARROYOS SIERRAS CHICAS",
        precio: 30000,
        img: '../img/s7w.webp'
    },
    {
        id: 7,
        nombre: "7/12 RIOS DE PARAVACHASCA",
        precio: 50000,
        img: '../img/s3w.webp'
    },
    {
        id: 8,
        nombre: "14/12 PARQUE NAC CONDORITO",
        precio: 60000,
        img: '../img/s4w.webp'
    },
    {
        id: 9,
        nombre: "21/12 CASCADAS DE PUNILLA",
        precio: 50000,
        img: '../img/s8w.webp'
    },
    {
        id: 10,
        nombre: "28/12 VOLCANES DE POCHO",
        precio: 95000,
        img: '../img/s9w.webp'
    },
    {
        id: 11,
        nombre: "4/1 LAGOS SIERRAS CHICAS",
        precio: 40000,
        img: '../img/s10w.webp'
    },{
        id: 12,
        nombre: "11/1 CERRO COLORADO",
        precio: 85000,
        img: '../img/s11w.webp'
    },
]

let cantidadCarrito = document.getElementById("cantidad-container")

class ProductoCarrito {
    constructor(imagen, nombre, precio, id) {
        this.imagen = imagen
        this.nombre = nombre
        this.precio = precio
        this.id = id
        this.cantidad = 1
        this.subtotal = 0
    }

    obtenerTotal() {
        this.subtotal = this.precio * this.cantidad
    }
}

let cartProducts = []
cartProducts = localStorage.getItem("cartProducts") // carga valores previos

if (cartProducts) {
    cartProducts = JSON.parse(cartProducts)  // si no está vacio almacenamiento lo carga
} else {
    cartProducts = []
}

let productsContainer = document.getElementById("products-container")

function renderProductos(productsArray) {   // muestra productos dinamicamente en pagina

    productsArray.forEach(producto => {
        const card = document.createElement("div")
        card.className = "tarjetaCalendario"
        card.innerHTML = `<img class="imagenCalendario" src="../img/${producto.img}" alt="${producto.nombre}" />
                          <h3 class="descripCal">${producto.nombre}</h3>
                          <p class="precio">Precio: $${producto.precio}</p>
                          <button class="productoAgregar" id="${producto.id}">Agregar al Carrito</button>`
        productsContainer.appendChild(card)
    })
    addToCartButton()
    cantidadProductosCarrito()
}



function addToCartButton() {  // agrega al carrito el producto asociado al boton correspondiente
    addButton = document.querySelectorAll(".productoAgregar")
    addButton.forEach(button => {
        button.onclick = (e) => {
            const productId = e.currentTarget.id
            const selectedProduct = productos.find(producto => producto.id == productId)  // selecciona producto
            
            const datosProducto = new ProductoCarrito(selectedProduct.img, selectedProduct.nombre, selectedProduct.precio, selectedProduct.id)
            datosProducto.obtenerTotal()

            if (cartProducts) { // verifica si existe para incrementar cantidad o crear nuevo
                const existeEnCarrito = cartProducts.some(producto => producto.id === datosProducto.id)
                if (existeEnCarrito) {
                    const productos2 = cartProducts.map((producto) => {
                        if (producto.id === datosProducto.id) {
                            producto.cantidad++
                            producto.subtotal = producto.precio * producto.cantidad
                            return producto
                        } else {
                            return producto
                        }
                    })
                    cartProducts = productos2 // carga cantidad modificada
                } else {
                    cartProducts.push(datosProducto)  // agrega producto
                }
            } else {
                cartProducts.push(datosProducto)
            }

            localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
            cantidadProductosCarrito()
        }
    })

}

function cantidadProductosCarrito() {  // contador items carrito
    let contarProductos = 0

    if (Number(productos.length) > 0) {
        contarProductos = cartProducts.reduce((cantidad, producto) => cantidad + producto.cantidad, 0)
        if (contarProductos) {
            cantidadCarrito.innerHTML = `${contarProductos}`
        }
    }
}

renderProductos(productos)  //ejecuta