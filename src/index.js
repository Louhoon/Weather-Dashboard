function refreshWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity-value");
  let windElement = document.querySelector("#wind-value");
  let dateAndTimeElement = document.querySelector("#date-and-time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#weather-icon");
  temperatureElement.innerHTML = `${Math.round(temperature)}°`;
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `<strong>${response.data.temperature.humidity}%</strong>`;
  windElement.innerHTML = `<strong>${response.data.wind.speed}km/h</strong>`;
  dateAndTimeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}">`;


  getForecast(response.data.city);
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

function displayforecast(response) {


  console.log(response.data);


  let days = ["Thursday", "Friday", "Saturday", "Sunday", "Monday"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml += `
    <div class="row">
    <div class="col-2">
    <i class="las la-cloud-sun-rain"></i>
    <div class="forecast-date">
    ${day}
    <div class="weather-forecast-description">broken clouds</div>
    </div>
    </div>
    <div class="forecast-temperature">
    <div class="weather-forecast-temperature-max">16°</div>
    <div class="weather-forecast-temperature-min">9°</div>
    </div>
    </div>`;
  });

  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

function getForecast(city) {
  let apiKey = "3b7o30109b4aft0712c02563ba2bbf20";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayforecast);
}

let search = document.querySelector("#search-form");
search.addEventListener("submit", displayCurrentCity);
