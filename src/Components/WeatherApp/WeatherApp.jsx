import React, { useRef, useState, useEffect } from 'react'
import './WeatherApp.css'

import serch_icon from '../Assets/search.png';
import snow_icon from '../Assets/snow.png';
import clear_icon from '../Assets/clear.png';
import drizzle_icon from '../Assets/drizzle.png';
import humidity_icon from '../Assets/humidity.png';
import rain_icon from '../Assets/rain.png';
import wind_icon from '../Assets/wind.png';
import cloud_icon from '../Assets/cloud.png'

const WeatherApp = () => {
  let api_key = "3d9834df1d6d43eb2b46c7864e0fac22"
  const [wicon, setwicon] = useState(cloud_icon); 
  const inputRef = useRef(null);

  const search = async () =>{
       const element = document.getElementsByClassName("cityInput")
       if(element[0].value ===""){
            return 0;
       }
       let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`
       let response = await fetch(url) 
       let data = await response.json()
       const humidity = document.getElementsByClassName("humidity-percent")
       const wind = document.getElementsByClassName('wind-rate')
       const temprature = document.getElementsByClassName('weather-temp')
       const location = document.getElementsByClassName('weather-location')
       humidity[0].innerHTML = data.main.humidity+" %";
       wind[0].innerHTML = data.wind.speed+" km/h";
       temprature[0].innerHTML =  data.main.temp+"°c"; 
       location[0].innerHTML = data.name;

       if(data.weather[0].icon ==="01d" || data.weather[0].icon ==="01n"){
        setwicon(clear_icon)
       }else if(data.weather[0].icon ==="02d" || data.weather[0].icon ==="02n"){
        setwicon(cloud_icon)
       }else if(data.weather[0].icon ==="03d" || data.weather[0].icon ==="03n"){
        setwicon(drizzle_icon)
       }else if(data.weather[0].icon ==="04d" || data.weather[0].icon ==="04n"){
        setwicon(drizzle_icon)
       }else if(data.weather[0].icon ==="09d" || data.weather[0].icon ==="09n"){
        setwicon(rain_icon)
       }else if(data.weather[0].icon ==="10d" || data.weather[0].icon ==="10n"){
        setwicon(rain_icon)
       }else if(data.weather[0].icon ==="13d" || data.weather[0].icon ==="13n"){
        setwicon(snow_icon)
       }else{
        setwicon(clear_icon)
       }

  }

  
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        search();
      }
    };

    const input = inputRef.current;
    input.addEventListener('keydown', handleKeyPress);

    return () => {
      input.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
  return (
    <div class = "container">
      <div className='top-bar'>
        <input type = "text" ref={inputRef} className='cityInput' placeholder='search'/>
        <div className='search-icon' onClick={() =>{search()}}>
          <img src={serch_icon} alt =""/>
        </div>
      </div>  
        <div className="weather-image">
          <img src={wicon} alt="" />
        </div>
        <div className='weather-temp'>24°c</div>
        <div className="weather-location">----</div>
        <div className="data-container">

          <div className="element">
            <img src={humidity_icon} alt="" className='icon'/>
            <div className="data">
               <div className="humidity-percent">50%</div>
               <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind_icon} alt="" className='icon'/>
            <div className="data">
               <div className="wind-rate">18 km/h</div>
               <div className="text">Wind Speed</div>
            </div>
          </div>

        </div>
      {/* </div> */}
      
    </div>
  )
}

export default WeatherApp
