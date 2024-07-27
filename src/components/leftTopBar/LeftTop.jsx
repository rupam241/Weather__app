import React, { useContext, useEffect } from 'react'
import './leftTop.css'
import { FaCloudShowersHeavy } from "react-icons/fa6";
import LocalTime from '../localTime/LocalTime';
import WeatherContext from '../context/WeatherContext';
function LeftTop() {
  
  const{weatherData,cityName}=useContext(WeatherContext)
  const iconUrl = `http://openweathermap.org/img/wn/${weatherData.weatherIcon}.png`;
   
  useEffect(()=>{

  },)
  
  return (
    <div className="leftTop">
        <div className="item">
            <p>NOW</p>
            <div className="temp">
                <h2>{weatherData.temp}&deg;c</h2>
                <img
        src={iconUrl}
        alt={weatherData.weatherDes}
        style={{ width: '100px', height: '100px' }} // Adjust size as needed
      />
            </div>
            <span>{weatherData.weatherDes}</span>
            <hr />
            <LocalTime/>
        </div>
    </div>
  )
}

export default LeftTop