import React, { useContext } from 'react'
import './otherUpdates.css'
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { CiTempHigh } from "react-icons/ci";
import WeatherContext from '../../context/WeatherContext';


function OtherUpdates() {
  const{weatherData}=useContext(WeatherContext)
  return (
  <div className="otherUpdates">
    <div className="humidity">
        <p >Humidity</p>
        <div className="dataHumidity">
        <WiHumidity style={{fontSize:"3.5rem"}}/>
        <p>{weatherData.humidity}%</p>


        </div>
    </div>
    <div className="pressure">
    <p >Pressure</p>
        <div className="dataPressure">
        <FaWind  style={{fontSize:"3rem"}}/>
        <p>{weatherData.pressure}hpa</p>


        </div>
        
    </div>
    <div className="visibilty">
    <p >Visibility</p>
        <div className="datavisibilty">
        <FaEye  style={{fontSize:"3rem"}}/>
        <p>{weatherData.visibility}km</p>


        </div>

    </div>
    <div className="feelsLike">
    <p >Feels_like</p>
        <div className="datafeelsLike">
        <CiTempHigh  style={{fontSize:"3rem"}}/>
        <p>{weatherData.feelsLike}&deg;c</p>


        </div>

    </div>
  </div>
  )
}

export default OtherUpdates