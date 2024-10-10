let cartContainer = document.getElementById("cart-section")
let totalContainer = document.getElementById("total-carrito")

let cartStorage = localStorage.getItem("cartProducts") // Carga valores previos
cartStorage = JSON.parse(cartStorage)

function renderCarrito(cartItems) {   
    while (cartContainer.firstChild) {
        cartContainer.removeChild(cartContainer.firstChild)  // vacia contenido nodo
    }
    cartItems.forEach(producto => {
        const card = document.createElement("div")
        card.className = "contenedorElemento"
        card.innerHTML = ` <span class="col-6">${producto.nombre}</span> 
                            <span class="col-1">$${producto.precio}</span>
                             <button class="col -1 productoIncrementar" id="${producto.id}"> + </button>
                            <span class="col-1 colCant">${producto.cantidad}</span>
                            <button class="col-1 productoDecrementar" id="${producto.id}"> - </button>
                            <span class="col-1 colSubtotal">$${producto.subtotal}</span>
                            <button class="col-1 productoEliminar" id="${producto.id}"> X </button>
                            `
        cartContainer.appendChild(card)
        
        deleteFromCartButton() // lee eventos botones
        addUnitToCartButton()
        substractUnitToCartButton()
        calcularTotal()  // agrega total
    })
}

function deleteFromCartButton() {
    deleteButton = document.querySelectorAll(".productoEliminar")
    deleteButton.forEach(button => {
        button.onclick = (e) => {
            const productId = e.currentTarget.id
            cartStorage = cartStorage.filter((producto) => producto.id !== Number(productId))  // retira item seleccionado
            localStorage.setItem("cartProducts", JSON.stringify(cartStorage))
            calcularTotal() 
            renderCarrito(cartStorage)  // actualiza
        }
    })
}

function addUnitToCartButton() {
    addUnButton = document.querySelectorAll(".productoIncrementar")
    addUnButton.forEach(button => {
        button.onclick = (e) => {
            const productId = e.currentTarget.id
            const productos2 = cartStorage.map((producto) => {
                if (producto.id === Number(productId)) {
                    if (producto.cantidad < 10) {      // maxima cantidad a agregar =10
                        producto.cantidad++
                    }
                    producto.subtotal = producto.precio * producto.cantidad
                    return producto
                } else {
                    return producto
                }
            })
            localStorage.setItem("cartProducts", JSON.stringify(cartStorage))
            renderCarrito(cartStorage)
        }
    })
}

function substractUnitToCartButton() {
    addUnButton = document.querySelectorAll(".productoDecrementar")
    addUnButton.forEach(button => {
        button.onclick = (e) => {
            const productId = e.currentTarget.id

            const productos2 = cartStorage.map((producto) => {
                if (producto.id === Number(productId)) {
                    if (producto.cantidad > 1) {      // minima cantidad a agregar =1
                        producto.cantidad--
                    }
                    producto.subtotal = producto.precio * producto.cantidad
                    return producto
                } else {
                    return producto
                }
            })
            localStorage.setItem("cartProducts", JSON.stringify(cartStorage))
            renderCarrito(cartStorage)
        }
    })
}

function calcularTotal() {
    let total = cartStorage.reduce((sumaTotal, producto) => sumaTotal + producto.subtotal, 0)
    totalContainer.innerHTML = `  <span class="col-8"> </span>
                                <span class="col-4"> Importe total   Ar$ ${total}</span>`
}

renderCarrito(cartStorage)