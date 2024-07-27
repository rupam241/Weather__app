import React from 'react'
import './dailyUpdates.css'
import SunDetails from './sunDetails/SunDetails';

import AirQuality from './airQuality/AirQuality';
import OtherUpdates from './otherUpdates/OtherUpdates';

function DailyUpdates() {
  return (
    <>
  
    <AirQuality/>
    <SunDetails/>
    <OtherUpdates/>

    
   
    </>
  )
}

export default DailyUpdates