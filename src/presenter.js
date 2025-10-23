const form = document.querySelector("#verMasc-form");
const div = document.querySelector("#resultado-div");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  div.innerHTML = "<p>No hay mascotas disponibles.</p>";
});