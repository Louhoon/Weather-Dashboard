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

function formatDay(timeStamp) {

  let date = new Date(timeStamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[date.getDay()];
}


function displayforecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      let temperatureMin = Math.round(day.temperature.minimum);
      let temperatureMax = Math.round(day.temperature.maximum);
      forecastHtml += `
        <div class="row">
        <div class="col-2">
        <img class="forecast-icon" src="${day.condition.icon_url}">
        <div class="forecast-date">
        ${formatDay(day.time)}
        <div class="weather-forecast-description">${day.condition.description}</div>
        </div>
        </div>
        <div class="forecast-temperature">
        <div class="weather-forecast-temperature-max">${temperatureMax}°</div>
        <div class="weather-forecast-temperature-min">${temperatureMin}°</div>
        </div>
        </div>`;
    }
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
