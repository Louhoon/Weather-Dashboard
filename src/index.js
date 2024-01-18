function refreshWeather(response) {
	let temperatureElement = document.querySelector("#current-temperature");
	let temperature = response.data.temperature.current;
	temperatureElement.innerHTML = `${Math.round(temperature)}°`;
	let cityElement = document.querySelector("#city");
	cityElement.innerHTML = response.data.city;
}


function searchCity(city) {
  let apiKey = "3b7o30109b4aft0712c02563ba2bbf20";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function displayCurrentCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

let search = document.querySelector("#search-form");
search.addEventListener("submit", displayCurrentCity);
