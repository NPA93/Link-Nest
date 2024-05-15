// Crear un programa que permita guardar en un array los datos ingresados por el usuario, y luego mostrarlos en pantalla.

  let arrayB = []
  const inputEl = document.querySelector("input");
  const saveBtn = document.querySelector("#save-btn");
  const ulEl = document.querySelector("ul");  
  const savedData = JSON.parse(localStorage.getItem("savedData"));

  if (savedData) {
    arrayB = [...savedData]; // Spread operator to copy values from savedData
    savedData.forEach(item => render(item)); // Call render for each item in savedData
  }


  function render(value) { // Función para renderizar la lista con parámetro que obtenga (value)
    let aEl = document.createElement("a");
    aEl.textContent = value; // el parametro value se reasignará con el valor de inputValue
    aEl.href = value;
    aEl.target = "_blank";

    let spanEl = document.createElement("span"); // Crear un span para el ícono
    spanEl.className = "material-symbols-outlined";
    spanEl.textContent = "link";
    spanEl.addEventListener("click", function() { // Agregar un event listener al span
      navigator.clipboard.writeText(value);
  });

    let liEl = document.createElement("li");
    liEl.appendChild(aEl);
    liEl.appendChild(spanEl);
    ulEl.appendChild(liEl);
  }


  
  saveBtn.addEventListener("click", function(e) {
    e.preventDefault();

    let inputValue = inputEl.value; 
    if (inputValue.trim() !== "") { 
    arrayB.push(inputValue); // Guardar el valor del input en el array
    localStorage.setItem("savedData", JSON.stringify(arrayB)); // Guardar el array en el localStorage
    render(inputValue); // Renderizar la lista con el valor del input utilizando el parametro de la función
    }
    inputEl.value = ""; 
  })



  navigator.clipboard.writeText(passwordCopy);



