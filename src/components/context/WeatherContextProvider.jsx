import React, { useEffect, useState } from 'react';
import WeatherContext from './WeatherContext';

const WeatherContextProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState({
    temp: null,
    humidity: null,
    pressure: null,
    cityname:null,
    dt:null,
    timezone:null,
    visibility:null,
    weatherDes:null,
    weatherIcon:null,
    sunrise:null,
    sunset:null,
    feelsLike:null,
    lat:null,
    lan:null

  });
  const [cityName,setCityName]=useState()
  const [time,setTime]=useState(null);
  const [forecast,setForecast]=useState(null)
  const[threeHourForeCast,setThreeHourForeCast]=useState(null);
  const[airQuality,setAirQuality]=useState({
    pm2s:null,
    so2:null,
    no2:null,
    o3:null,
    aqi:null
  })
  const[location,setLocation]=useState(null)



  return (
    <WeatherContext.Provider value={{location,setLocation, airQuality,setAirQuality, weatherData, setWeatherData,cityName,setCityName ,forecast,setForecast,threeHourForeCast,setThreeHourForeCast}}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContextProvider;
