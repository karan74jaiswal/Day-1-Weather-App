"use strict";
// Weather API Key - 4b353eec9a0f5405e39ba36498da85f9

// Lat nd LON by City API call URL - http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=4b353eec9a0f5405e39ba36498da85f9

// Weather Data API Call Url - https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4b353eec9a0f5405e39ba36498da85f9

const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const temperatureEl = document.querySelector(".temp");
const cityEl = document.querySelector(".city");
const humidityEl = document.querySelector(".humidity");
const windSpeedEl = document.querySelector(".wind");
const weatherIconEl = document.querySelector(".weather-icon");
const renderWeatherData = function (...weatherDetails) {
  console.log(...weatherDetails);
  const [{ humidity, main, name, speed, temp }] = weatherDetails;
  temperatureEl.textContent = `${temp}°C`;
  cityEl.textContent = `${name}`;
  humidityEl.textContent = `${humidity}%`;
  windSpeedEl.textContent = `${speed} km/h`;
  weatherIconEl.src = `./images/${main}.png`;
};

// Function for Getting Coordinates by City Names
const getCoords = async function (cityName) {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=4b353eec9a0f5405e39ba36498da85f9`
  );
  const [{ lat, lon }] = await response.json();
  return [lat, lon];
};

// Function for Getting Weather Details by CityName
const getWeatherData = async function (cityName) {
  // Getting Coordinates using Cityname
  const [lat, lon] = await getCoords(cityName);

  // Getting Weather details using Coordinates
  const {
    main: { humidity, temp },
    wind: { speed },
    weather: [{ main }],
    name,
  } = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=4b353eec9a0f5405e39ba36498da85f9`
  ).then((res) => res.json());
  // console.log(humidity, temp, speed, main, name);
  renderWeatherData({ humidity, temp, speed, main, name });
};

buttonEl.addEventListener("click", () => {
  const searchedCity = inputEl.value;
  if (!searchedCity) return;
  getWeatherData(searchedCity);
  document.querySelector(".weather").style.display = "block";
});
