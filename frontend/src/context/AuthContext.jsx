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
    const [validated,setValidated]=useState(false);
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
            // console.log("tetst")
        }else{
            sessionStorage.setItem("token",checkLogin.data.token);
            setIsLoggedIn(true);
            navigate("/home")
            alert("Succesfully logged in")
        }
    }

    
    const checkValidation=async ()=>{
        let nameReg= new RegExp("^[A-Za-z]+$")
        let emailReg=new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$")
        let phoneReg= new RegExp("^[0-9]{10}$")
        //fname
        if(newUser.fname==""){
            return "Fname cannot be empty"

        }else if(!nameReg.test(newUser.fname)){
            return "Invalid fname type"
        }

        //manme
        if(newUser.fname==""){
            return "Mname cannot be empty"

        }else if(!nameReg.test(newUser.lname)){
            return "Invalid mname type"
        }
        //lname
        if(newUser.fname==""){
            return "Lname cannot be empty"

        }else if(!nameReg.test(newUser.lname)){
            return "Invalid lname type"
        }

        //email
        if(newUser.email==""){
            return "Email field is empty"
        }else if(!emailReg.test(newUser.email)){
            return "Invalid email type"
        }

        //phone
        if(newUser.phone==""){
            return "Phone field is empty"
        }else if(!phoneReg.test(newUser.phone)){
            return "Phone number should be of 10 digit"
        }

        //password
        if(newUser.password==""){
            return "Password field is empty"
        }else if(newUser.password.length==0||newUser.password.length<8){
            return "Password should be of minimum 8 characters"
        }

    }
    //Signup Function
    const handleSignup=async(e)=>{
        e.preventDefault();
        let res=await checkValidation()
        console.log(res,"res")
        if(res!=undefined){
            alert(res)
            return
        }
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
    const handleBack=()=>{
        navigate("/home");
    }

    return(
        <AuthContext.Provider value={{isLoggedIn,setIsLoggedIn,handleLogin,data,setData,handleSignup,newUser,setNewUser,handleLogout,handleDelete,del,setDel,handleBack}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>{
    return useContext(AuthContext);
}
export default AuthContext