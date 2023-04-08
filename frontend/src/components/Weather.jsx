import React, { useEffect, useState } from 'react'
import '../css/weather.css'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
const Weather = () => {
    const auth = useAuth();
    const [city,setCity]=useState()
    const[weather,setWeather]=useState();
    const [wish,setWish]=useState([])
    const [loader,setLoader]=useState(false)
    // apikey details 
const apikey = "4ed9ae89638a1e0aa080739ce1abe76c";

const getDate=function() {
	let date = new Date();
    
    let currentTime = date.getHours();

	let message = '';

	if(currentTime >= 0 && currentTime <= 12) {
		message = 'Good Morning!';
	} else if(currentTime >= 12 && currentTime <= 16) {
		message = 'Good Afternoon!';
	} else {
		message = 'Good Evening!';
	}
    setWish([message,date])
    console.log(wish[1])
    
    
	
};

const url = async ()=>{
    setLoader(true)
   const test= axios.get( `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`).then((data)=>{
    setWeather(data)
   }).catch((e)=>{
    if(e.code==="ERR_BAD_REQUEST"){
        setWeather(null)
    }
   }).finally(()=>{
    setLoader(false)
   });
}

useEffect(()=>{
    getDate()
},[])

useEffect(()=>{
    if(city==""){
        url()
    }
},[city])
const test=(e)=>{
    if(e.key=="Enter"){
        url()
        console.log(weather)
    }
}

  return (
    <>
    
    <div className="body">
        <div className="util-button">
        <div className=" logout-btn btn btn-success" onClick={auth.handleBack}>Back</div>
            <div className="logout-btn btn btn-danger" onClick={auth.handleLogout}>Logout</div>
        </div>
      <header className="head">
    <h1 className="title"><i className=""></i>Weather App</h1>
    <div className="text greet">
      <div className="greet-msg" id="greet">{wish[0]}</div>
      <div className="date" id="date">{wish[1]?.toDateString()}</div>
    </div>
  </header>

    <div className="weather-container">
        
    <div className="weather">
      <div id="form">
        <input type="text"  id="search" placeholder="search by city" autoComplete="off" onChange={(e)=>{setCity(e.target.value.toLocaleLowerCase())}} onKeyDown={(e)=>{test(e)}}/>
      </div>
    </div>

    <div className="temperature">
      <h2 id="city">{weather==null?" ":weather.data.name+" "+weather.data.sys.country}</h2>
    </div>
    <div className="weather-condition">
      <h1 id="temp">{weather==null?"no city found":weather.data.main.temp+"C"}</h1>
      <div id="description" className="text">{weather==null?" ":"Condition: "+weather.data.weather[0].description}</div>
      <div id="image"></div>
    </div>
    <div className="row text">
      <div id="humidity">{weather==null?" ":"Humidity: "+weather.data.main.humidity+"%"}</div>
      <div id="visibility">{weather==null?" ":"Visibility: "+weather.data.visibility/1000+" mi"}</div>
      <div id="pressure">{weather==null?" ":"Pressure: "+weather.data.main.pressure+" mb"}</div>
      <div id="wind">{weather==null?" ":"Wind Speed: "+weather.data.wind.speed+" mph"}</div>
    </div>
   { loader?<div class="spinner-border text-light" role="status">
  <span class="sr-only"></span>
</div>:""}
  </div>
  </div>
    </>
  )
}

export default Weather