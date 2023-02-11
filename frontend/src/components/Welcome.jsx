import axios, { all } from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../css/welcome.css'
import del from '../imgs/del.png'
import edit from '../imgs/edit.png'
function Welcome() {
  
    const auth = useAuth();
    const navigate = useNavigate()  

    //States
    const [task,setTask]=useState();
    const [newTask,setNewTask]=useState({id:"",description:""});
    const [isEditable,setIsEditable]=useState(false)
    
    const headersProvider = ()=>{
      let token = null;
      token = sessionStorage.getItem("token");
      return {
        Authorization: token,
      }

    }


    //Functions
    useEffect(()=>{
         getAllUser()
        if(sessionStorage.getItem("token")!=null){
            navigate("/welcome")
        }else{
            navigate("/")
        }
    },[auth.del,newTask.description])

    //Fetch all the tasks
    const getAllUser=async ()=>{
      
      const allUsers=await axios.get("http://localhost:3004/api/tasks",{headers:headersProvider()});
      setTask(allUsers.data.allTask)
    }

    //Add task functionality
    const handleAdd=async ()=>{
      if(newTask.description==""){
        alert("Field is empty");
        return
      }
      const addedTask = await axios.post("http://localhost:3004/api/addTask",
      {description:newTask.description},
      {
        headers:headersProvider()
      }
      )

      setNewTask({...newTask,description:""})
    }

    //Edit functionality
    const handleEditButton=(desc,id)=>{
      setNewTask({...newTask,id:id,description:desc})
      setIsEditable(true)
    }
    const handleEdit = async()=>{
      if(newTask.description==""){
        alert("Empty field")
        return
      }
        await axios.put(`http://localhost:3004/api/edit/${newTask.id}`,newTask,{headers:headersProvider()})
        setNewTask({...newTask,description:""})
        setIsEditable(false)
    }


  return (
    <>
      <div className="todo-container">
            <div className="logout-btn btn btn-danger" onClick={auth.handleLogout}>Logout</div>
            <div className="box">
              <div className="box-top">
                <h1 style={{"fontWeight":"600"}}>Your Task</h1>
              </div>
              <div className="box-bottom">
                <div className="input-task">
                  <input type="text" name="" id="" value={newTask.description} onChange={(e)=>{setNewTask({...newTask,description:e.target.value})}}/>
                  {isEditable?<div><button className='btn btn-warning btn-md' onClick={(e)=>handleEdit()}>OK</button>
                    <button className='btn btn-danger btn-md' onClick={()=>setIsEditable(false)}>Cancel</button></div>
                  :<button className='btn btn-primary btn-md' onClick={handleAdd}>Add</button>}
                </div>
                {task?.map((item,id)=>{
                  return(
                    <div className="task" key={id}>
                    <div className="task-left">
                    <p>{id+1}.{item.description}</p>
                    </div>
                    <div className="task-right">
                    <img src={del} alt="" onClick={(e)=>{auth.handleDelete(e,item._id)}}/>
                    <img src={edit} alt="" onClick={()=>handleEditButton(item.description,item._id)}/>
                    </div>
                  </div>
                  )
                })}
              </div>
            </div>
      </div>
    </>
  )
}

export default Welcome