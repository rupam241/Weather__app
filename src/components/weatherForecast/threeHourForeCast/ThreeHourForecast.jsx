import React, { useContext, useEffect } from 'react';
import './threeHourForeCast.css';
import WeatherContext from '../../context/WeatherContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const getWeatherIcon = (iconCode) => {
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
    return <img src={iconUrl} alt="weather icon" style={{ width: "5rem" }} />;
};

const getWindIconRotationStyle = (deg) => {
    return { transform: `rotate(${deg}deg)` };
};

function ThreeHourForecast() {
    const { threeHourForeCast } = useContext(WeatherContext);
    

    if (!threeHourForeCast || threeHourForeCast.length === 0) {
        return <div>No threeHourForeCast data available</div>;
    }

    // Slice to get only the first 8 items
    const forecastToDisplay = threeHourForeCast.slice(0, 8);

    useEffect(()=>{

    },[threeHourForeCast])

    return (
        <div className="threeHourForecast">
            {forecastToDisplay.map((forecast, index) => (
                <div key={index} className={`day${index + 1}`}>
                    <div className="weather">
                        <p style={{ fontSize: "1.2rem" }}>{new Date(forecast.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                        {getWeatherIcon(forecast.weatherIcon)}
                        <p style={{ fontSize: "1.5rem" }}>{forecast.temp}°C</p>
                    </div>
                    <div className="wind">
                        <p style={{ fontSize: "1.2rem" }}>{new Date(forecast.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                        <FontAwesomeIcon icon={faArrowUp} style={getWindIconRotationStyle(forecast.windDirection)} />
                        <p style={{ fontSize: "1.2rem" }}>{forecast.windSpeed.toFixed(1)} km/h</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ThreeHourForecast;
