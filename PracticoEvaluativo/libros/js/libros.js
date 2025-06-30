// Cargar los libros desde localStorage o inicializar un array vacío
let libros = JSON.parse(localStorage.getItem('libros')) || []

let editando = false;
let indiceEditar = null;
let ordenAscendente = false;

// agregar o actualizar un libro
const agregarlibro = () => {  
    const titulo = document.getElementById('titulo').value.trim()
    const autor = document.getElementById('autor').value.trim()  
    const anio = document.getElementById('anio').value
    const genero = document.getElementById('genero').value
    const leido = document.getElementById('leido').checked
    const anioactual = new Date().getFullYear()

    //Validacion del año de publicación
    if (anio < 1900 || anio > anioactual) {
        alert(`el año del libro debe ser igual o mayor a 1900 y menor a ${anioactual}`)
        return
    }
    // Validación de campos obligatorios
    if (titulo !== '' && autor !== '' && anio !== '' && genero !== '') {
        if (editando) {
            libros[indiceEditar] = { titulo, autor, anio, genero, leido }  
            editando = false
            indiceEditar = null
            document.querySelector('button[type="submit"]').innerText = 'Agregar libro'
        } else {
            const yaExiste = libros.some(libro =>
                libro.titulo.toLowerCase() === titulo.toLowerCase() &&
                libro.autor.toLowerCase() === autor.toLowerCase() 
            )
            if (yaExiste) {
                alert('Este libro ya se encuentra cargado en el listado')
                return
            }
            libros.push({ titulo, autor, anio, genero })  
        }
        // Guardar los libros en localStorage
        localStorage.setItem('libros', JSON.stringify(libros))
        renderizarlibros()
        mostrarResumen()
        actualizarSelecttitulo()
        // Limpiar el formulario
        document.getElementById('titulo').value = ''
        document.getElementById('autor').value = ''  
        document.getElementById('anio').value = ''
        document.getElementById('genero').value = ''
        document.getElementById('leido').checked = false 
    }
}
// Mostrar los libros en la tabla HTML
const renderizarlibros = (lista = libros) => {
    const tabla = document.getElementById('tablalibros').querySelector('tbody')
    tabla.innerText = ''

    lista.forEach(libro => {
        const indexReal = libros.indexOf(libro)
        const fila = document.createElement('tr')
        fila.innerHTML = `
            <td>${indexReal + 1}</td>
            <td>${libro.titulo}</td>
            <td>${libro.autor}</td>
            <td>${libro.anio}</td>
            <td>${libro.genero}</td>
            <td>${libro.leido ? '✅' : '❌'}</td>
            <td>
                <button onclick="editarLibro(${indexReal})">Editar</button>  
                <button onclick="eliminarLibro(${indexReal})">Eliminar</button>  
            </td>
            `
        tabla.appendChild(fila)
    })
}
//Cargar los datos del libro en el formulario para editar
const editarLibro = (index) => {  
    const libro = libros[index]
    document.getElementById('titulo').value = libro.titulo
    document.getElementById('autor').value = libro.autor  
    document.getElementById('anio').value = libro.anio
    document.getElementById('genero').value = libro.genero
    document.getElementById('leido').checked = libro.leido || false 
    document.querySelector('button[type="submit"]').innerText = 'Actualizar libro'
    editando = true
    indiceEditar = index
}
//Eliminar un libro de la lista
const eliminarLibro = (index) => {  
    libros.splice(index, 1)
    localStorage.setItem('libros', JSON.stringify(libros))
    renderizarlibros()
    mostrarResumen()
    actualizarSelecttitulo()
}
// Ordenar los libros por año de publicación
const ordenarPorAnio = () => {
    const librosOrdenados = [...libros].sort((a, b) => {
        return ordenAscendente ? a.anio - b.anio : b.anio - a.anio
    })

    ordenAscendente = !ordenAscendente
    renderizarlibros(librosOrdenados)
}
// Mostrar resumen de los libros y estadistica
const mostrarResumen = () => {
    const resumen = document.getElementById('resumenlibros')

    if (libros.length === 0) {
        resumen.innerText = 'No existen libros cargados'
        return;
    }

    // Total de libros
    const total = libros.length

    // promedio de años
    const sumaAnios = libros.reduce((acum, libro) => acum + parseInt(libro.anio), 0)

    const promedio = Math.round(sumaAnios / total)

    // filtro libros posteriores a 2015
    const posterioresA2010 = libros.filter(libro => libro.anio > 2010).length

    //  Filtrar libro mas nuevo
    const libroNuevo = libros.reduce((nuevo, libro) => (libro.anio > nuevo.anio ? libro : nuevo), libros[0])

    // Filtrar libro mas antiguo
    const libroViejo = libros.reduce((nuevo, libro) => (libro.anio < nuevo.anio ? libro : nuevo), libros[0])
    // Libros Leídos
    const librosLeidos = libros.filter(libro => libro.leido).length
    const librosNoLeidos = libros.filter(libro => !libro.leido).length

    resumen.innerHTML = `
    <p>Total de libros: ${total}</p>
    <p>Promedio: ${promedio}</p>
    <p>libros posteriores a 2010: ${posterioresA2010}</p>
    <p>libro mas nuevo: ${libroNuevo.titulo}  ${libroNuevo.anio}</p>
    <p>libro mas viejo: ${libroViejo.titulo}  ${libroViejo.anio}</p>
    <p>📗 Leídos: ${librosLeidos}</p>
    <p>📕 No leídos: ${librosNoLeidos}</p>
    `

}


const actualizarSelecttitulo = () => {
    const select = document.getElementById('filtrotitulo')
    const titulosUnicas = [...new Set(libros.map(libro => libro.titulo))]

    select.innerHTML = `<option value="todas">Todas</option>`
    titulosUnicas.forEach(titulo => {
        const option = document.createElement("option")
        option.value = titulo
        option.text = titulo
        select.appendChild(option)
    })

}

const filtrarlibros = () => {
    const texto = document.getElementById('busqueda').value.toLowerCase()
    const filtroEstado = document.getElementById('filtroLeido').value
    const tituloSelect = document.getElementById('filtrotitulo').value.toLowerCase()

    let librosFiltrados = libros.filter(libro =>
        libro.titulo.toLowerCase().includes(texto)
    )

    if (filtroEstado === 'leidos') {
        librosFiltrados = librosFiltrados.filter(libro => libro.leido)
    } else if (filtroEstado === 'no-leidos') {
        librosFiltrados = librosFiltrados.filter(libro => !libro.leido)
    }

    if (tituloSelect !== 'todas') {
        librosFiltrados = librosFiltrados.filter(libro =>
            libro.titulo.toLowerCase() === tituloSelect
        )
    }

    renderizarlibros(librosFiltrados)
}

// Evento que sirve para renderizar contenido una vez cardado el dom de la pagina inicial
document.addEventListener('DOMContentLoaded', () => {
    renderizarlibros()
    mostrarResumen()
    actualizarSelecttitulo()
})