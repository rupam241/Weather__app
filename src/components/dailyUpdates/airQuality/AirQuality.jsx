import React, { useContext } from 'react';
import "./airquality.css";
import { GiAirZigzag } from "react-icons/gi";
import WeatherContext from '../../context/WeatherContext';

const AirQuality = () => {
    const { airQuality } = useContext(WeatherContext);

    const findAqi = (aqi) => {
        if (aqi ==1) {
            return <div className='aqi good'>Good</div>;
        } else if (aqi==2) {
            return <div className='aqi moderate'>Fair</div>;
        } else if (aqi==3) {
            return <div className='aqi unhealthy-for-sensitive'>Moderate</div>;
        } else if (aqi==4) {
            return <div className='aqi unhealthy'>Poor</div>;
        } else if (aqi==5) {
            return <div className='aqi very-unhealthy'>Very Poor</div>;
        } 
        else {
            return <div className='aqi unknown'>Unknown</div>;
        }
    };

    return (
        <div className="dailyUpdates">
            <div className="dailyData">
                <h3>Today's Highlights</h3>
                <div className="airQuality">
                    <div className="title">
                        <h5>Air Quality Index</h5>
                        {findAqi(airQuality.aqi)}
                    </div>
                    <div className="data">
                        <GiAirZigzag style={{ fontSize: "2rem", marginLeft: "1.5rem" }} />
                        <div className="pm2s">
                            <h5>PM2.5</h5>
                            <p>{airQuality.pm2s}</p>
                        </div>
                        <div className="so2">
                            <h5>SO2</h5>
                            <p>{airQuality.so2}</p>
                        </div>
                        <div className="no2">
                            <h5>NO2</h5>
                            <p>{airQuality.no2}</p>
                        </div>
                        <div className="o3">
                            <h5>O3</h5>
                            <p>{airQuality.o3}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AirQuality;
