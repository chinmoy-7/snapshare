import React, { useContext } from 'react'
import '../css/login.css'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
function Login() {
    const navigate=useNavigate();
    const auth = useAuth()


    useEffect(()=>{  
        if(sessionStorage.getItem("token")!=null){
            navigate("/welcome")
        }else{
            navigate("/")
        }
    },[])
  return (
    <div className="login-container">
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
            </div>
            </form>
        </div>
        
        <div className="login-right">
            <h1 className='login-padding'>Shot Share</h1>
            <p className='login-padding'>Click and share your moments</p>
        </div>
    </div>
  )
}

export default Login