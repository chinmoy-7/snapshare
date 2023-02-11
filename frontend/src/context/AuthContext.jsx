import {createContext,useContext, useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthContextProvider=({children})=>{
    const navigate = useNavigate();
    const [del,setDel]=useState(false);
    const [isLoggedIn,setIsLoggedIn]=useState(false)
    const [data,setData]=useState({email:"",password:""})
    const [newUser,setNewUser]=useState({fname:"",mname:"",lname:"",email:"",phone:"",password:""})
    const [errors,setErrors]=useState({email:"",password:""})
    const headersProvider = ()=>{
        let token = null;
        token = sessionStorage.getItem("token");
        return {
          Authorization: token,
        }
        // const headers={"token":sessionStorage.getItem("token")}
      }

    //Login Function
    const handleLogin=async (e)=>{
        e.preventDefault();
        if(data.email==""){
            setErrors({...errors,email:"email field cannot be empty"})
            return
        }
        if(data.password==""){
            setErrors({...errors,password:"password field is empty"});
            return
        }
        const checkLogin = await axios.post('http://localhost:3004/login',data)
        console.log(checkLogin.data.token)
            
        if(checkLogin.data.status=="failed"){
            alert("Enter correct credentials");
            console.log("tetst")
        }else{
            sessionStorage.setItem("token",checkLogin.data.token);
            setIsLoggedIn(true);
            navigate("/welcome")
            alert("Succesfully logged in")
        }
    }

    //Signup Function
    const handleSignup=async(e)=>{
        e.preventDefault();
        const newUserSignup = await axios.post("http://localhost:3004/signup",newUser)
        if(newUserSignup.data.status=="success"){
            alert("User succesfully added");
            navigate("/");
        }else{
            alert("Failed")
        }
    }

    //Logout Function
    const handleLogout=()=>{
        sessionStorage.clear();
        navigate("/");
    }

    //Delete task
    const handleDelete=async (e,id)=>{    
        e.preventDefault();
        console.log(id)
        const deleted=await axios.delete(`http://localhost:3004/api/del/${id}`,{headers:headersProvider()})
        if(deleted.data.status=="success"){
            setDel(!del);
            alert("Deleted")
        }else{
            alert("failed")
        }
    }


    return(
        <AuthContext.Provider value={{isLoggedIn,setIsLoggedIn,handleLogin,data,setData,handleSignup,newUser,setNewUser,handleLogout,handleDelete,del,setDel}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>{
    return useContext(AuthContext);
}
export default AuthContext