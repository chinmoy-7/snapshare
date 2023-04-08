import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/home.css'
import {useAuth} from '../context/AuthContext.jsx'

function HomePage(){
    const auth = useAuth();
    const navigate = useNavigate()
    const handleHomeSelection=(value)=>{
        navigate(`/${value}`)
    }
    useEffect(()=>{
       if(sessionStorage.getItem("token")!=null){
           navigate("/home")
       }else{
           navigate("/")
       }
   },[])
  return (
    <>
        <div className="home-container">
        <div className="logout-btn btn btn-danger" onClick={auth.handleLogout}>Logout</div>
            <div className="home-content">
                <div className="home-heading">
                <h1>Effortlessly Manage Your Tasks, Weather, and Books</h1>
                </div>
                <div className="home-options">
                    <button className='btn btn-dark btn-outline-light btn-lg'  onClick={(e)=>{handleHomeSelection("welcome")}}>TODO-APP</button>
                    <button className='btn btn-dark btn-outline-light btn-lg'  onClick={(e)=>{handleHomeSelection("weather")}}>WEATHER-APP</button>
                    <button className='btn btn-dark btn-outline-light btn-lg'  onClick={(e)=>{handleHomeSelection("book-landing ")}}>BOOK-SEARCH</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default HomePage