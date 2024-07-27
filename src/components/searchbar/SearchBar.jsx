import React, { useContext, useRef } from 'react';
import { CiSearch } from "react-icons/ci";
import './searchbar.css';
import WeatherContext from '../context/WeatherContext';

function SearchBar() {
  const { cityName, setCityName } = useContext(WeatherContext);
  const inputRef = useRef(null);

  const handleInput = () => {
    if (inputRef.current) {
      setCityName(inputRef.current.value); // Update cityName in context
      inputRef.current.value = ''; // Clear the input field
    }
  };

  return (
    <div className='searchbar'>
      <input 
        type="text"  
        ref={inputRef} 
        placeholder='Enter your city' 
        defaultValue={cityName} // Optionally set default value
      />
      <CiSearch onClick={handleInput} style={{ fontSize: "4rem", cursor: "pointer" }} />
    </div>
  );
}

export default SearchBar;
