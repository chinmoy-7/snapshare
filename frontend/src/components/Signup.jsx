import React, { useEffect, useState } from 'react'
import '../css/signup.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
function Signup() {
    const auth = useAuth();




  return (
    <div className="login-container">
    <div className="signup ">
        <h1>Register Yourself</h1>
        <form action="">
        <div className="form-floating mb-3">
            <input type="text" className="form-control" id="floatingfname" placeholder="name@example.com" onChange={(e)=>(auth.setNewUser({...auth.newUser,fname:e.target.value}))}/>
            <label htmlFor="floatingfname">First Name</label>
            {/* {showValidation.fname?<span className='validation'>{validation.fname}</span>:""} */}
        </div>
        <div className="form-floating mb-3">
            <input type="text" className="form-control" id="floatingmname" placeholder="name@example.com" onChange={(e)=>{auth.setNewUser({...auth.newUser,mname:e.target.value})}}/>
            <label htmlFor="floatingmname">Middle Name</label>
            {/* {showValidation.mname?<span className='validation'>{validation.mname}</span>:""} */}
        </div>
        <div className="form-floating mb-3">
            <input type="text" className="form-control" id="floatinglname" placeholder="name@example.com" onChange={(e)=>{auth.setNewUser({...auth.newUser,lname:e.target.value})}}/>
            <label htmlFor="floatinglname">Last Name</label>
            {/* {showValidation.lname?<span className='validation'>{validation.lname}</span>:""} */}
        </div>
        <div className="form-floating mb-3">
            <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" onChange={(e)=>{auth.setNewUser({...auth.newUser,email:e.target.value})}}/>
            <label htmlFor="floatingEmail">Email</label>
            {/* <span className='validation'>asdhsjh</span> */}
        </div>
        <div className="form-floating mb-3">
            <input type="phone" className="form-control" id="floatingPhone" placeholder="name@example.com" onChange={(e)=>{auth.setNewUser({...auth.newUser,phone:e.target.value})}}/>
            <label htmlFor="floatingPhone">Phone Number</label>
            {/* <span className='validation'>asdhsjh</span> */}
        </div>
        <div className="form-floating mb-3">
            <input type="password" className="form-control" id="floatingPassword" placeholder="name@example.com" onChange={(e)=>{auth.setNewUser({...auth.newUser,password:e.target.value})}}/>
            <label htmlFor="floatingPassword">Password</label>
            {/* <span className='validation'>asdhsjh</span> */}
        </div>
       <div >
        <button className='btn btn-primary btn-lg' onClick={auth.handleSignup}>Signup</button>
        <p>Already have an account?<Link to="/">Login</Link></p>
       </div>

        </form>
    </div>
    </div>
  )
}

export default Signup