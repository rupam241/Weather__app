import React, { useContext, useEffect, useState } from 'react';
import { CiTimer } from "react-icons/ci";
import "./localTime.css";
import { CiCalendarDate } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import WeatherContext from '../context/WeatherContext';
import moment from 'moment-timezone';

function LocalTime() {
    const { weatherData } = useContext(WeatherContext);

    // State to store formatted date and time
    const [formattedDate, setFormattedDate] = useState('');
    const [formattedTime, setFormattedTime] = useState('');

    useEffect(() => {
        if (weatherData && weatherData.dt && weatherData.timezone) {
            const dt = weatherData.dt; // Unix timestamp in seconds
            const timezoneOffsetSeconds = weatherData.timezone; // Offset in seconds

            // Convert Unix timestamp to milliseconds
            const timestampMillis = dt * 1000;

            // Convert timezone offset to minutes
            const timezoneOffsetMinutes = timezoneOffsetSeconds / 60;

            // Create a moment object with UTC time
            const utcDate = moment.utc(timestampMillis);

            // Convert to local time using timezone offset
            const localDate = utcDate.utcOffset(timezoneOffsetMinutes);

            // Format the date and time
            setFormattedDate(localDate.format('D MMMM, YYYY'));
            setFormattedTime(localDate.format('h:mm:ss A'));
        }
    }, [weatherData]);

    return (
        <div className="time">
            <div className="localTime">
                <CiTimer style={{ fontSize: "2rem" }} />
                <span>{formattedTime}</span>
            </div>
            <div className="localDate">
                <CiCalendarDate style={{ fontSize: "2rem" }} />
                <span>{formattedDate}</span>
            </div>
            <div className="location">
                <CiLocationOn style={{ fontSize: "2rem" }} />
                <span>{weatherData.cityname}, {weatherData.country}</span>
            </div>
        </div>
    );
}

export default LocalTime;
