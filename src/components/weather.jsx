import { useState, useEffect } from "react";
import axios from "axios";
import "./weather.css";
const Weather = () => {
  const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const [weatherData, setWeatherData] = useState({});
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fatchingWeather = async () => {
      const defaultLocation = "Ethiopia";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Metric&appid=${weatherApiKey}`;
      const response = await axios.get(url);
      setWeatherData(response.data);
    };
    fatchingWeather();
  }, []);
  const search = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${weatherApiKey}`;

    try {
      const response = await axios.get(url);
      if (response.data.cod !== 200) {
        setWeatherData({ notFound: true });
      } else {
        setWeatherData(response.data);
        setLocation("");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setWeatherData({ notFound: true });
      } else {
        console.error(
          "An error occurred while fetching the weather data:",
          error
        );
      }
    }
  };

  const getWeatherIcons = (weatherType) => {
    switch (weatherType) {
      case "Clear":
        return <i class="fa-solid fa-sun"></i>;
      case "Clouds":
        return <i class="fa-solid fa-cloud"></i>;
      case "Rain":
        return <i class="fa-solid fa-cloud-rain"></i>;
      case "Thunderstorm":
        return <i class="fa-solid fa-cloud-bolt"></i>;
      case "Snow":
        return <i class="fa-regular fa-snowflake"></i>;
      case "Haze":
      case "Mist":
        return <i class="fa-solid fa-smog"></i>;
      default:
        return <i class="fa-solid fa-cloud"></i>;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <div className="weather">
      <div className="search">
        <div className="search-top">
          <i className="fa-solid fa-location-dot"></i>
          <div className="location">{weatherData?.name}</div>
        </div>
        <div className="search-location">
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
        </div>
      </div>
      {weatherData.notFound ? (
        <div className="not-found">Location Not Found 😥</div>
      ) : (
        <div className="weather-data">
          {getWeatherIcons(
            weatherData.weather ? weatherData.weather[0].main : null
          )}
          <div className="weather-type">
            {weatherData.weather ? weatherData.weather[0].main : null}
          </div>
          <div className="temp">
            {weatherData.main ? `${Math.floor(weatherData.main.temp)}°c` : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
