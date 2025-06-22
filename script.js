/*
Author: Shoikot Sen
Project: Weather App - JavaScript Logic
Description:
  This script fetches weather data from OpenWeatherMap based on
  the city input by the user, then displays temperature, weather type,
  and an icon. It also shows a loading message during the fetch.
*/

// Your API key from OpenWeatherMap
const apiKey = "50b7cb81ea0b3c1d308dfde5ab9a4aae";

// Main function that runs when "Get Weather" button is clicked
function getWeather() {
  // Get the city name from input field
  const city = document.getElementById("cityInput").value;

  // Construct the API URL with city and API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // Show "Loading..." while fetching data
  document.getElementById("loading").style.display = "block";
  document.getElementById("weatherResult").innerHTML = "";

  // Fetch weather data from API
  fetch(url)
    .then(response => response.json()) // Convert response to JSON
    .then(data => {
      // Hide loading text once data is received
      document.getElementById("loading").style.display = "none";

      // Check if city is found (code 200 = OK)
      if (data.cod === 200) {
        // Format weather data into HTML
        const result = `
  <h2>${data.name}, ${data.sys.country}</h2>
  <p>Temperature: ${data.main.temp} °C</p>
  <p>Weather: ${data.weather[0].main}</p>
  <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon">
`;

        // Display the result in the DOM
        document.getElementById("weatherResult").innerHTML = result;
      } else {
        // If city not found
        document.getElementById("weatherResult").innerHTML = "City not found.";
      }
    })
    .catch(error => {
      // Hide loading text and show error message
      document.getElementById("loading").style.display = "none";
      console.error("Error fetching weather:", error);
      document.getElementById("weatherResult").innerHTML = "Something went wrong.";
    });
}
