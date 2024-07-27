import React, { useContext } from 'react';
import { CiLocationOn } from 'react-icons/ci';
import './current.css';
import WeatherContext from '../context/WeatherContext';

function Current() {
  const { setLocation } = useContext(WeatherContext);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        // Pass the coordinates to setLocation
        setLocation({ latitude, longitude });
      },
      (error) => {
        console.error(`Error getting location: ${error.message}`);
        alert(`Error getting location: ${error.message}`);
      }
    );
  };

  return (
    <div className='current' onClick={getCurrentLocation}>
      <CiLocationOn style={{ fontSize: '2rem', padding: '5px' }} />
      <p style={{ fontSize: '20px' }}>Current location</p>
    </div>
  );
}

export default Current;
