let productos = JSON.parse(localStorage.getItem('productos')) || []

const agregarProducto = () => {
    const nombre = document.getElementById('nombre').value.trim()
    const categoria = document.getElementById('categoria').value.trim()
    const precio = document.getElementById('precio').value

    if(nombre !== "" && categoria !== "" && precio !== ''){
        productos.push({nombre, categoria, precio})

        localStorage.setItem('productos', JSON.stringify(productos))
        renderizarProducto()
        
        document.getElementById('nombre').value = ''
        document.getElementById('categoria').value = ''
        document.getElementById('precio').value = ''

        
    }

}
const renderizarProducto = () => {
    const tabla = document.getElementById("tablaProductos").querySelector('tbody')

    tabla.innerText = ''

    productos.forEach((producto, index)=> {
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
const calcularTotal = () => {
    const total = productos.reduce((acumulador, producto) => {
        return acumulador + parseFloat(producto.precio)
    }, 0)

    document.getElementById('totalAcumulado').innerText = `Total: $${total.toFixed(2)}`
}

// Evento que sirve para renderizar contenido una vez cardado el dom de la pagina inicial
document.addEventListener('DOMContentLoaded', () => {
    renderizarProducto()
})