"use strict";

// Lat nd LON by City API call URL - http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=4b353eec9a0f5405e39ba36498da85f9

// Weather Data API Call Url - https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4b353eec9a0f5405e39ba36498da85f9

const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const temperatureEl = document.querySelector(".temp");
const cityEl = document.querySelector(".city");
const humidityEl = document.querySelector(".humidity");
const windSpeedEl = document.querySelector(".wind");
const weatherIconEl = document.querySelector(".weather-icon");

// Rendering Weather Data
const renderWeatherData = function (...weatherDetails) {
  console.log(...weatherDetails);
  const [{ humidity, main, name, speed, temp }] = weatherDetails;
  temperatureEl.textContent = `${Math.round(+temp)}°C`;
  cityEl.textContent = `${name}`;
  humidityEl.textContent = `${humidity}%`;
  windSpeedEl.textContent = `${speed} km/h`;
  weatherIconEl.src = `./images/${main}.png`;
};

// Function for Getting Coordinates by City Names
const getCoords = async function (cityName) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=4b353eec9a0f5405e39ba36498da85f9`,
      { referrerPolicy: "unsafe_url" }
    );
    console.log(response);
    if (!response.ok) throw new Error("Something Went Wrong, City Not Found");
    const [{ lat, lon }] = await response.json();
    if (!lat) throw new Error("Something Went Wrong, City Not Found");
    return [lat, lon];
  } catch (error) {
    throw error;
  }
};

// Function for Getting Weather Details by CityName
const getWeatherData = async function (cityName) {
  try {
    // Getting Coordinates using Cityname
    const [lat, lon] = await getCoords(cityName);
    if (!lat)
      throw new Error("Something Went Wrong, Weather Cant be displayed");

    // Getting Weather details using Coordinates
    const {
      main: { humidity, temp },
      wind: { speed },
      weather: [{ main }],
      name,
    } = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=4b353eec9a0f5405e39ba36498da85f9`,
      { referrerPolicy: "unsafe_url" }
    ).then((res) => res.json());
    renderWeatherData({ humidity, temp, speed, main, name });
  } catch (error) {
    throw error;
  }
};

buttonEl.addEventListener("click", () => {
  try {
    const searchedCity = inputEl.value;
    if (!searchedCity) return;
    getWeatherData(searchedCity);
    document.querySelector(".weather").style.display = "block";
  } catch (err) {
    console.warn(err);
  }
});
