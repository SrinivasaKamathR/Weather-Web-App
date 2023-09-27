import "./styles.css";

const apiKey = "054463d1655963ec66e37e625680f804"; // Replace with your API key
const weatherInfo = document.getElementById("weatherInfo");
const errorInfo = document.getElementById("errorInfo");
const locationInput = document.getElementById("locationInput");

document.getElementById("getWeatherButton").addEventListener("click", () => {
  const location = locationInput.value; // Get the location input value
  const unit = document.querySelector('input[name="unit"]:checked').value;

  fetchWeather(location, unit);
  locationInput.value = "";
});

function fetchWeather(location, unit) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Weather data not found.");
      }
      return response.json();
    })
    .then((data) => {
      displayWeatherData(data);
    })
    .catch((error) => {
      displayError(error.message);
    });
}

function displayWeatherData(data, unit) {
  errorInfo.textContent = "";
  const temperature =
    unit === "metric" ? `${data.main.temp}&deg;C` : `${data.main.temp}&deg;F`;

  weatherInfo.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>Temperature: ${temperature}</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
      <p>Weather: ${data.weather[0].description}</p>
  `;
}

function displayError(errorMessage) {
  weatherInfo.textContent = "";
  errorInfo.textContent = errorMessage;
}
