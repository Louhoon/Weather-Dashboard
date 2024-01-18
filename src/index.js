function refreshWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity-value");
  let windElement = document.querySelector("#wind-value");
  let dateAndTimeElement = document.querySelector("#date-and-time");
  let date = new Date(response.data.time * 1000);
  temperatureElement.innerHTML = `${Math.round(temperature)}°`;
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `<strong>${response.data.temperature.humidity}%</strong>`;
  windElement.innerHTML = `<strong>${response.data.wind.speed}km/h</strong>`;
  dateAndTimeElement.innerHTML = formatDate(date);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} - ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "3b7o30109b4aft0712c02563ba2bbf20";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function fetchDefaultCity() {
  let defaultCity = "Paris";
  searchCity(defaultCity);
}

window.addEventListener("load", fetchDefaultCity);

function displayCurrentCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

let search = document.querySelector("#search-form");
search.addEventListener("submit", displayCurrentCity);
