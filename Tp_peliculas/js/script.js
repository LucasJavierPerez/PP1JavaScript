let peliculas = [ "El Padrino", "Gladiador", "Matrix"]

const mostrarPelicula = () => {
    const listaPeliculas = document.getElementById("listaPeliculas")
    listaPeliculas.innerHTML = '';

    peliculas.forEach(pelicula => {
        const li = document.createElement('li')
        li.innerText = pelicula
        listaPeliculas.appendChild(li)
    });
    


}

const agregarPelicula = () => {
    const nuevaPelicula =document.getElementById('agregarPelicula').value 
    
    
    console.log("peliculas", peliculas);
    mostrarPelicula()
    document.getElementById('agregarPelicula').value = ''
    if (peliculas.includes(nuevaPelicula)) {
        alert(`La película "${nuevaPelicula}" ya está en la lista.`);
    }
    else {
        peliculas.push(nuevaPelicula)
        console.log("peliculas", peliculas);
        mostrarPelicula()
        alert(`Nueva Pelicula agregada: ${nuevaPelicula}`)
    }
 
}
const eliminarPelicula = () => {
    const posicionPelicula = document.getElementById('posicionPelicula').value 
    const cantidadPeliculas = document.getElementById('cantidadPelicula').value 
    peliculas.splice(posicionPelicula, cantidadPeliculas)
    console.log("peliculas", peliculas)
    document.getElementById('posicionPelicula').value = ''
    document.getElementById('cantidadPelicula').value = ''
}

const verPeliculasNumeradas = () => {
  const numeradas = peliculas.map((pelicula, index) => `${index + 1}. ${pelicula}`)
  alert("Películas numeradas:\n" + numeradas.join('\n'))
}

const ordenarPeliculas = () => {
    peliculas.sort((a, b) => a.localeCompare(b))
    alert("Películas ordenadas alfabéticamente.")
    mostrarPelicula()
    }

const editarPelicula = () => {
  const posicion = parseInt(prompt("¿Qué número de película querés editar?"));
  const nuevaPelicula = prompt("¿Cuál es el nuevo nombre de la película?");

  
  if (posicion > 0 && posicion <= peliculas.length) {
    peliculas[posicion - 1] = nuevaPelicula;
    alert("Película actualizada.");
  } else {
    alert("Posición inválida.");
  }
};