import React, { useContext } from 'react'
import './fiveDaysForeCast.css'
import { IoMdRainy } from "react-icons/io";
import { FaCloud } from "react-icons/fa";
import { CiCloud } from "react-icons/ci";
import WeatherContext from '../../context/WeatherContext';

const getWeatherIcon = (iconCode) => {
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
    return <img src={iconUrl} alt="weather icon" style={{ width: '4.5rem', height: '4.5rem' }} />;
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'short' }; // e.g., "27 Jul"
    return date.toLocaleDateString(undefined, options);
  };
  


function FiveDaysForeCast() {


    const{forecast}=useContext(WeatherContext);

    if (!forecast || forecast.length === 0) {
        return <div>No forecast data available</div>;
      }
    
    return (
      <>
      <h2 style={{marginLeft:"2rem"}}> 5 Days Forecast</h2>
        <div className="fiveDaysForeCast">
        {forecast.map((day, index) => (
          <div key={index} className={`day${index + 1}`}>
            {getWeatherIcon(day.weatherIcon)}
            <span style={{ fontSize: "1.5rem" }}>{day.weatherDescription}</span>
            <p style={{ marginLeft: "2rem", fontSize: "1.5rem" }}>{day.temp}&deg;c</p>
            <p style={{ marginLeft: "7rem", fontSize: "1.5rem" }}>{formatDate(day.date)}</p>
          </div>
        ))}
      </div>
      </>
    )
}

export default FiveDaysForeCast