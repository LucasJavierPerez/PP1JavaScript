Práctico: Gestor de Películas Favoritas

🎯 Objetivo general
Crear una aplicación web que permita al usuario gestionar su lista de películas favoritas, aplicando los conceptos de arrays y los métodos:
.push()


.splice()


.forEach()


.map()


Este práctico busca consolidar el trabajo con arrays y su relación con el DOM para generar vistas dinámicas en pantalla, y transformar datos desde JavaScript.

📚 Contenidos involucrados
Arrays y acceso por índice


Manipulación de arrays con métodos nativos


Renderizado dinámico en HTML (forEach)


Transformación de datos con .map()


Manejo de eventos y DOM



🧩 Consigna
Tu objetivo es desarrollar una página web que permita a los usuarios:
1. Agregar películas
Ingresar el nombre de una película en un campo de texto.


Al hacer clic en el botón “Agregar”, se debe guardar en un array.


Mostrar la película agregada en una lista debajo.


2. Ver la lista de películas
Al hacer clic en el botón “Ver todas”, la lista debe mostrarse en pantalla.


Utilizar .forEach() para recorrer el array y crear elementos <li> en el HTML.


3. Eliminar una película
Ingresar el número de la película que se desea eliminar (por posición).


Al hacer clic en “Eliminar”, se debe eliminar del array y actualizar la lista.


Usar .splice() para quitar el elemento.


4. Ver lista numerada (uso de .map())
Al hacer clic en el botón “Ver numeradas”, debe aparecer un alert con la lista de películas numeradas automáticamente.
Ejemplo:
Películas numeradas:
1. El Padrino
2. Gladiador
3. Matrix
Usar .map() para crear un nuevo array con los nombres numerados y mostrarlo con alert().



✅ Requisitos técnicos mínimos
Usar un array para guardar las películas (let peliculas = [])


Usar .push() para agregar


Usar .splice() para eliminar por índice


Usar .forEach() para mostrar la lista en pantalla (HTML)


Usar .map() para generar la lista numerada


Limpiar el campo de texto luego de agregar


Validar que no se agregue texto vacío

🎁 Extras
Mostrar cuántas películas hay en total.


Evitar películas repetidas.


Agregar una opción para ordenar alfabéticamente (peliculas.sort()).


Permitir edición del nombre de una película.


