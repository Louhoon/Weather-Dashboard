function displayCurrentCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
}

let search = document.querySelector("#search-form");
search.addEventListener("submit", displayCurrentCity);
