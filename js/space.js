// Asignar el evento de clic al botón "Buscar"
document.getElementById("btnBuscar").addEventListener("click", buscarImagenes);

// Función para buscar imágenes
function buscarImagenes() {
  const busqueda = document.getElementById("inputBuscar").value;
  const url = `https://images-api.nasa.gov/search?q=${busqueda}`;

  fetch(url)
    .then(response => response.json())
    .then(data => mostrarResultados(data.collection.items))
    .catch(error => console.error('Error:', error));
}

// Mostrar los resultados de la búsqueda
function mostrarResultados(items) {
  const infoContenedor = document.getElementById("contenedor");
  infoContenedor.innerHTML = ""; // Limpiar resultados anteriores

  if (items.length === 0) {
    infoContenedor.innerHTML = "<p>No se encontraron resultados.</p>";
    return;
  }

  items.forEach(item => {
    const { data, links } = item;
    const { title, description, date_created } = data[0];
    const imageUrl = links ? links[0].href : 'imagen_no_disponible.jpg';

    mostrarTarjeta(imageUrl, title, description, date_created);
  });
}

// Mostrar cada tarjeta con Bootstrap
function mostrarTarjeta(imagen, titulo, descripcion, fecha) {
  const tarjeta = `
    <div class="col-md-4">
      <div class="card mb-4">
        <img src="${imagen}" class="card-img-top" alt="${titulo}">
        <div class="card-body">
          <h5 class="card-title">${titulo}</h5>
          <p class="card-text">${descripcion ? descripcion : 'Descripción no disponible'}</p>
          <p class="card-text"><small class="text-muted">Fecha: ${new Date(fecha).toLocaleDateString()}</small></p>
        </div>
      </div>
    </div>
  `;

  document.getElementById("contenedor").innerHTML += tarjeta;
}