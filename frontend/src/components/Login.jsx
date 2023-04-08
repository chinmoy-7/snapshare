import React, { useContext, useState } from 'react'
import '../css/login.css'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import {bcrypt} from 'bcryptjs-react'
function Login() {
    const navigate=useNavigate();
    const auth = useAuth()
    const [resetPassword,setResetPassword]=useState({email:""});
    const [OTP,setOTP]=useState({OTP:""})
    const [hashedOTP,setHashedOTP]=useState({hashedOTP:""})
    const [loader,setLoader]=useState(false)
    const [isReset,setIsReset]=useState(false);
    const [verifyOTP,setVerifyOTP]=useState(false);
    const [newPass,setNewPass]=useState();
    const [isActiveNewPass,setIsActiveNewPass]=useState(false)

    //this function handles the reset email
    const handleResetPassword=async ()=>{
        setLoader(true)
        const resp=await axios.post("http://localhost:3004/otp-mail",resetPassword)
        setHashedOTP({hashedOTP:resp.data.OTP})
        console.log(OTP)
        if(resp.data.status==="no_user"){
            alert("No user found")
        }else{
            alert("OTP sent to the email")
            setIsReset(false)
            setVerifyOTP(true)
        }
        setLoader(false)
    }

    //changes the state so that the reset div can popup or cancel
    const handleReset=(e)=>{
        e.preventDefault();
        setIsReset(true)
    }

    //Function to verify the OTP
    const handleVerifyOTP=async()=>{
        const resp = await axios.post("http://localhost:3004/verify-otp",{OTP:OTP.OTP,hashedOTP})
        if(resp.data.result){
            alert("OTP verified")
            setVerifyOTP(false)
            setIsActiveNewPass(true)
        }else{
            alert("Wrong OTP")
            return
        }
    }
    
    //This function sets new password
    const handleNewPassword=async ()=>{
        const email=resetPassword.email
        const resp = await axios.post("http://localhost:3004/reset-password",{email:email,password:newPass})
        if(resp.data.status==="success"){
            alert("Password updated")
            setIsActiveNewPass(false)
        }else{
            alert("failed to update")
        }
    }



    //verifies token
    useEffect(()=>{  
        if(sessionStorage.getItem("token")!=null){
            navigate("/home")
        }else{
            navigate("/")
        }
    },[])
  return (
    <div className="login-container">

        {isReset?<div className="reset-password">

            <div className="form mb-3">
                <h2>RESET YOUR Password</h2>
                {loader?
                <div class="spinner-border text-warning" role="status">
                 <span class="sr-only"></span>
                </div>
                :""}

                <input type="email" className="form-control py-3" id="floatingEmail" placeholder="name@example.com" onChange={(e)=>{setResetPassword({email:e.target.value})}}/>
                {/* <label htmlFor="floatingEmail">Email address</label> */}
                <button className='btn btn-success mt-3  btn-lg' onClick={handleResetPassword}>OK</button>
                <button className='btn btn-danger mt-3 ms-3 btn-lg ' onClick={()=>setIsReset(false)}>Cancel</button>
                
            </div>
        </div>:""}
        
        {verifyOTP?<div className="reset-password">

            <div className="form mb-3">
                <h2>Verify Your OTP</h2>
                {loader?
                <div class="spinner-border text-warning" role="status">
                 <span class="sr-only"></span>
                </div>
                :""}

                <input type="email" className="form-control py-3" id="floatingEmail" placeholder="name@example.com" onChange={(e)=>{setOTP({OTP:e.target.value})}}/>
                {/* <label htmlFor="floatingEmail">Email address</label> */}
                <button className='btn btn-success mt-3  btn-lg' onClick={handleVerifyOTP}>Verify</button>
            </div>
        </div>:""}
        {isActiveNewPass?<div className="reset-password">

            <div className="form mb-3">
                <h2>Enter your new password</h2>
                {loader?
                <div class="spinner-border text-warning" role="status">
                 <span class="sr-only"></span>
                </div>
                :""}

                <input type="password" className="form-control py-3" id="floatingEmail" placeholder="name@example.com" onChange={(e)=>{setNewPass({password:e.target.value})}}/>
                {/* <label htmlFor="floatingEmail">Email address</label> */}
                <button className='btn btn-success mt-3  btn-lg' onClick={handleNewPassword}>Submit</button>
            </div>
        </div>:""}




        <div className="login-left">
            <form action="">
            <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" onChange={(e)=>{auth.setData({...auth.data,email:e.target.value})}}/>
                <label htmlFor="floatingEmail">Email address</label>
              <span className='validation'>{auth?.errors?.email}</span>
            </div>
            <div className="form-floating mb-3">
                <input type="password" className="form-control" id="floatingPassword" placeholder="name@example.com" onChange={(e)=>{auth.setData({...auth.data,password:e.target.value})}}/>
                <label htmlFor="floatingPassword">Password</label>
                <span className='validation'>{auth?.errors?.password}</span>
            </div>
            <div>
                <button className='btn btn-primary login self-center' onClick={auth.handleLogin}>Login</button>
            </div>
            <div>
                <p className='self-center'>Dont have an account?<Link to="/signup">Signup</Link></p>
                <p className='self-center'>Forgot Password?<button onClick={handleReset} className='btn btn-success btn-sm'>Reset</button></p>
            </div>
            </form>
        </div>
        
        <div className="login-right">
            <h1 className='login-padding'>All-In-One-Organiser</h1>
            <p className='login-padding'>Everything you need</p>
        </div>
    </div>
  )
}

export default Login