import React, { useContext } from 'react'
import "./sundetails.css"
import { IoSunnySharp } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import WeatherContext from '../../context/WeatherContext';

function SunDetails() {
  const {weatherData}=useContext(WeatherContext);

  const sunriseMillis = weatherData.sunrise * 1000;
  const sunsetMillis = weatherData.sunset * 1000;
  

  // Create a Date object
  const sunriseDate = new Date(sunriseMillis);
  const sunsetDate = new Date(sunsetMillis);

  // Format the sunrise time
  const options = {
    
    
    hour: '2-digit',
    minute: '2-digit',
    
  };

  // Format using Intl.DateTimeFormat
  const sunriseTimeString = new Intl.DateTimeFormat('en-US', options).format(sunriseDate);
  const sunsetTimeString = new Intl.DateTimeFormat('en-US', options).format(sunsetDate);
  

  return (
    <div className="sunDetails">
      <div className="sunDataDetails">
        <h5>Sunrise</h5>
        <div className="sunrise">
          <IoSunnySharp style={{ fontSize: "4.5rem" }} />
          <div className="dataSun">
            <p>Sunrise</p>
            <h5>{sunriseTimeString}</h5>

          </div>
          

        </div>
      </div>
      <div className="sunDataDetails">
      <h5>sunset</h5>
        
        <div className="sunrise">
          <FaMoon style={{ fontSize: "4.5rem" }} />
          <div className="dataSun">
            <p>Sunrise</p>
            <h5>{sunsetTimeString}</h5>

          </div>
          

        </div>
      </div>


    </div>
  )
}

export default SunDetails