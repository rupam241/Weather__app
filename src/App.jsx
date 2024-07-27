import React, { useEffect, useState } from 'react'
import SearchBar from './components/searchbar/SearchBar'
import { TiWeatherCloudy } from "react-icons/ti";
import './App.css'
import Current from './components/currentlocation/Current';
import LeftTop from './components/leftTopBar/LeftTop';
import FiveDaysForeCast from './components/weatherForecast/fiveDaysForeCast/FiveDaysForeCast';
import DailyUpdates from './components/dailyUpdates/DailyUpdates';

import WeatherContextProvider from './components/context/WeatherContextProvider';
import Api from './components/api/Api';
import ThreeHourForecast from './components/weatherForecast/threeHourForeCast/ThreeHourForecast';






function App() {
  


  
  return (
    <WeatherContextProvider>
   
    <div className="header">
      <div className="icons">
      <TiWeatherCloudy style={{fontSize:"3rem"}}/>
      <span>Weatherapp</span>

      </div>
   <SearchBar/>
   <Current/>
    </div>
    <div className="main">
      <LeftTop/>
      <FiveDaysForeCast/>
      <DailyUpdates/>
      <ThreeHourForecast/>
    </div>
   
    <Api/>
    </WeatherContextProvider>
    
   
  )
}

export default App