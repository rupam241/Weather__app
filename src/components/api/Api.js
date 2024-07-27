import React, { useContext, useEffect } from "react";
import WeatherContext from "../context/WeatherContext";

const Api = () => {
  const { cityName, location, setWeatherData, setForecast, setThreeHourForeCast, setAirQuality } = useContext(WeatherContext);
  const apiKey = '199d5344b26837e4c7a016e214b9da58'; // Replace with your API key

  // Define a default city
  const defaultCity = "Kolkata";

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        let apiUrl;
        let fetchLocation = location;
        let fetchCityName = cityName || defaultCity; // Use defaultCity if cityName is not provided

        if (!fetchLocation) {
          // Get location from city name if location is not provided
          fetchLocation = await getLocationFromCityName(fetchCityName);
        }

        if (fetchLocation) {
          const { latitude, longitude } = fetchLocation;
          apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        } else if (fetchCityName) {
          apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${fetchCityName}&appid=${apiKey}`;
        } else {
          return; // No cityName or location available
        }

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();

        const weatherData = {
          temp: Math.floor(data.main.temp - 273.15), // Convert Kelvin to Celsius
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          cityname: data.name,
          country: data.sys.country,
          dt: data.dt,
          timezone: data.timezone,
          visibility: data.visibility / 1000,
          feelsLike: Math.floor(data.main.feels_like - 273.15),
          weatherDes: data.weather[0].description,
          weatherIcon: data.weather[0].icon,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          lat: data.coord.lat,
          lon: data.coord.lon
        };

        setWeatherData(weatherData);

        // Fetch air quality data using the latitude and longitude from weather data
        fetchAirQualityData(data.coord.lat, data.coord.lon);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    const fetchAirQualityData = async (lat, lon) => {
      try {
        const apiUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();

        setAirQuality({
          pm2s: data.list[0].components.pm2_5,
          so2: data.list[0].components.so2,
          no2: data.list[0].components.no2,
          o3: data.list[0].components.o3,
          aqi: data.list[0].main.aqi
        });
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    const fetchForecastData = async () => {
      try {
        let apiUrl;
        let fetchCityName = cityName || defaultCity;

        if (location && location.latitude && location.longitude) {
          const { latitude, longitude } = location;
          apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        } else if (fetchCityName) {
          apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${fetchCityName}&appid=${apiKey}`;
        } else {
          return; // No cityName or location available
        }

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();

        // Process daily forecasts
        const dailyForecasts = {};
        data.list.forEach(item => {
          const date = item.dt_txt.split(' ')[0]; // Get the date part
          if (!dailyForecasts[date]) dailyForecasts[date] = [];
          dailyForecasts[date].push(item);
        });

        const forecastList = Object.keys(dailyForecasts).map(date => {
          const representativeForecast = dailyForecasts[date].find(item => item.dt_txt.includes('12:00:00')) || dailyForecasts[date][0];
          return {
            date,
            temp: Math.floor(representativeForecast.main.temp - 273.15), // Convert Kelvin to Celsius
            feelsLike: Math.floor(representativeForecast.main.feels_like - 273.15),
            weatherDescription: representativeForecast.weather[0].description,
            weatherIcon: representativeForecast.weather[0].icon,
            windSpeed: representativeForecast.wind.speed,
            windDirection: representativeForecast.wind.deg,
            clouds: representativeForecast.clouds.all,
            rain: representativeForecast.rain ? representativeForecast.rain['3h'] : 0,
            visibility: representativeForecast.visibility,
          };
        }).slice(0, 5); // Get only the next 5 days

        setForecast(forecastList);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    const fetchThreeHourForecastData = async () => {
      try {
        let apiUrl;
        let fetchCityName = cityName || defaultCity;

        if (location && location.latitude && location.longitude) {
          const { latitude, longitude } = location;
          apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        } else if (fetchCityName) {
          apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${fetchCityName}&appid=${apiKey}`;
        } else {
          return; // No cityName or location available
        }

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();

        // Process 3-hour intervals
        const threeHourForecastData = data.list.map(item => ({
          dt_txt: item.dt_txt,
          temp: Math.floor(item.main.temp - 273.15), // Convert Kelvin to Celsius
          weatherDescription: item.weather[0].description,
          weatherIcon: item.weather[0].icon,
          windSpeed: item.wind.speed, // Wind speed in meters per second
          windDirection: item.wind.deg, // Wind direction in degrees
          clouds: item.clouds.all,
          rain: item.rain ? item.rain['3h'] : 0,
        }));

        setThreeHourForeCast(threeHourForecastData); // Save to context
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchWeatherData();
    fetchForecastData();
    fetchThreeHourForecastData();
  }, [cityName, location, setWeatherData, setForecast, setThreeHourForeCast, setAirQuality]);

  // Function to get location from city name
  const getLocationFromCityName = async (cityName) => {
    try {
      // Use a geocoding API to get latitude and longitude from city name
      // Here we use OpenWeatherMap's geocoding API
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      return {
        latitude: data.coord.lat,
        longitude: data.coord.lon
      };
    } catch (error) {
      console.error('Error getting location from city name:', error);
      return null;
    }
  };

  return null; // This component doesn't render anything
};

export default Api;
