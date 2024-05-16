// Crear un programa que permita guardar en un array los datos ingresados por el usuario, y luego mostrarlos en pantalla.

let arrayB = [];
const inputEl = document.querySelector("input");
const saveBtn = document.querySelector("#save-btn");
const tabBtn = document.querySelector("#tab-btn");
tabBtn.className = "tab-button";
const ulEl = document.querySelector("ul");
const savedData = JSON.parse(localStorage.getItem("savedData"));

if (savedData) {
  arrayB = [...savedData]; // Spread operator to copy values from savedData
  savedData.forEach((item) => render(item)); // Call render for each item in savedData
}

tabBtn.addEventListener("click", function (e) { // Event listener para el botón de tabs que obtiene la url de la pestaña activa
  e.preventDefault();

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let newUrl = tabs[0].url;
    arrayB.push(newUrl);
    localStorage.setItem("savedData", JSON.stringify(arrayB));
    render(newUrl);
  });
});

function render(value) {
  // Función para renderizar la lista con parámetro que obtenga (value)
  let aEl = document.createElement("a");
  aEl.textContent = value; // el parametro value se reasignará con el valor de inputValue
  aEl.href = value;
  aEl.className = "truncate";
  aEl.target = "_blank";

  let copyEl = document.createElement("span"); // Crear un span para el ícono
  copyEl.className = "material-symbols-outlined";
  copyEl.textContent = "link";
  copyEl.addEventListener("click", function () {
    // Agregar un event listener al span
    navigator.clipboard.writeText(value);
  });
  
  let deleteEl = document.createElement("span");
  deleteEl.className = "material-symbols-outlined delete-icon";
  deleteEl.textContent = "delete";
  deleteEl.onclick = function() { deleteLink(value); };


  let liEl = document.createElement("li");
  let divEl = document.createElement("div");
  divEl.className = "list-item";

  divEl.appendChild(aEl);
  divEl.appendChild(copyEl);
  liEl.appendChild(divEl);
  liEl.appendChild(deleteEl);
  ulEl.appendChild(liEl);
}

saveBtn.addEventListener("click", function (e) {
  e.preventDefault();

  let inputValue = inputEl.value;
  if (inputValue.trim() !== "") {
    arrayB.push(inputValue); // Guardar el valor del input en el array
    localStorage.setItem("savedData", JSON.stringify(arrayB)); // Guardar el array en el localStorage
    render(inputValue); // Renderizar la lista con el valor del input utilizando el parametro de la función
  }
  inputEl.value = "";
});

function deleteLink(urlToDelete) {
  arrayB = arrayB.filter((url) => url !== urlToDelete);
  localStorage.setItem("savedData", JSON.stringify(arrayB));
  ulEl.innerHTML = "";
  arrayB.forEach((item) => render(item));
}