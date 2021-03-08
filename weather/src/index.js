function formateDate(currentTime) {
  let now = new Date();
  let millisecs = now.getMilliseconds();
  let date = now.getDate();
  let year = now.getFullYear();
  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  let month = months[now.getMonth()];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];

  let currentDate = `${day}, ${month} ${date}, ${year}`;

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let formattedDate = `${day} ${hours}:${minutes}`;
  return formattedDate;
}

date.innerHTML = formateDate();

function showWeather(response) {
  document.querySelector("#cityDisplay").innerHTML = response.data.name;
  let newtemp = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  newtemp.innerHTML = `${temperature}°`;
}

function retrievePosition(position) {
  let apiKey = "a38bcbee54ef653d9657ebf90e6e0b68";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function searchCity(city) {
  let apiKey = "a38bcbee54ef653d9657ebf90e6e0b68";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#searchCity").value;
  searchCity(city);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 5;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let currentLocationButton = document.querySelector("#refresh");
currentLocationButton.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#search");
searchForm.addEventListener("submit", handleSubmit);
