let productos = JSON.parse(localStorage.getItem('productos')) || []

const agregarProducto = () => {
    const nombre = document.getElementById('nombre').value.trim()
    const categoria = document.getElementById('categoria').value.trim()
    const precio = document.getElementById('precio').value

    if(nombre !== "" && categoria !== "" && precio !== ''){
        productos.push({nombre, categoria, precio})

        localStorage.setItem('productos', JSON.stringify(productos))
        renderizarProducto()
        mostrarResumen()
        document.getElementById('nombre').value = ''
        document.getElementById('categoria').value = ''
        document.getElementById('precio').value = ''

        
    }

}
const filtrarProductos = () => {
    const texto = document.getElementById('busqueda').value.toLowerCase()

    const productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(texto)) 

    renderizarProducto(productosFiltrados)
    calcularTotal(productosFiltrados)
} 




const renderizarProducto = (lista = productos) => {
    const tabla = document.getElementById("tablaProductos").querySelector('tbody')

    tabla.innerText = ''

    lista.forEach((producto, index)=> {
        const fila = document.createElement('tr')

        fila.innerHTML=
        `<td>${index + 1} </td>
        <td>${producto.nombre} </td>
        <td>${producto.categoria} </td>
        <td>${producto.precio} </td>
        <td>
                <button onclick="eliminarProducto(${index})">Eliminar</button>
        </td>
        `
        tabla.appendChild(fila)
    })
}

const eliminarProducto = (index) => {

    productos.splice(index, 1)
    
    localStorage.setItem('productos', JSON.stringify(productos))
    
    renderizarProducto()

}
const calcularTotal = (lista = productos) => {
    const total = lista.reduce((acumulador, producto) => {
        return acumulador + parseFloat(producto.precio)
    }, 0)

    document.getElementById('totalAcumulado').innerText = `Total: $${total.toFixed(2)}`
}

const mostrarResumen = () => {
    const resumen = document.getElementById('resumenProductos')
    
    if(productos.length === 0){
        resumen.innerText = 'No hay productos agregados.'
        return;
    }
    const total = productos.length

    const sumaPrecios = productos.reduce((acumulador, producto) => acumulador + parseInt(producto.precio), 0)
    const promedio = (sumaPrecios / total).toFixed(1)
    
    const productoCaro = productos.reduce((nuevo, producto) => (producto.precio > nuevo.precio ? producto : nuevo) , productos[0])

    const productoBarato = productos.reduce((nuevo, producto) => (producto.precio < nuevo.precio ? producto : nuevo) , productos[0])
    resumen.innerHTML = `
        <p>Total de productos: ${total}</p>
        <p>Precio total: $${sumaPrecios}</p>
        <p>Precio promedio: $${promedio}</p>
        <p>Producto más caro: ${productoCaro.nombre} - $${productoCaro.precio}</p>
        <p>Producto más barato: ${productoBarato.nombre} - $${productoBarato.precio}</p>
    `
    
    }


// Evento que sirve para renderizar contenido una vez cardado el dom de la pagina inicial
document.addEventListener('DOMContentLoaded', () => {
    renderizarProducto()
    mostrarResumen()
    calcularTotal()
})