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
    const [newTask,setNewTask]=useState({id:"",description:"",status:"false"});
    const [isEditable,setIsEditable]=useState(false)
    //To indicate the active edit state
    const [isActive,setIsActive]=useState(false)
    
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
    },[auth.del])

    //Fetch all the tasks
    const getAllUser=async ()=>{
      
      const allUsers=await axios.get("http://localhost:3004/api/tasks",{headers:headersProvider()});
      // console.log(allUsers.data.allTask)
      setTask(allUsers.data.allTask)
    }

    //Add task functionality
    const handleAdd=async ()=>{
      if(newTask.description==""){
        alert("Field is empty");
        return
      }
      const addedTask = await axios.post("http://localhost:3004/api/addTask",
      {description:newTask.description,status:false},
      {
        headers:headersProvider()
      }
      )

      setNewTask({...newTask,description:""})
      getAllUser();
    }
    //Edit functionality
    const handleEditButton=(desc,id,e)=>{
      // console.log(e)
      setIsActive(true)
      // console.log(newTask)
      const test  = task?.filter((data,idx)=>{
        if(data._id==id){
          data.status=true;
          return data
        }else{
          return data
        }
      })
      setTask(test)
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
        setIsActive(false)
    }


  return (
    <>
      <div className="todo-container">
            <div className=" logout-btn btn btn-success" onClick={auth.handleBack}>Back</div>
            <div className="logout-btn btn btn-danger" onClick={auth.handleLogout}>Logout</div>
            <div className="box">
              <div className="box-top">
                <h1 style={{"fontWeight":"600"}}>Your Task</h1>
              </div>
              <div className="box-bottom">
                <div className="input-task">
                  <textarea name="" id="" cols="30" rows="10" value={newTask.description} onChange={(e)=>{setNewTask({...newTask,description:e.target.value})}}></textarea>
                  {/* <input type="text" name="" id="" value={newTask.description} onChange={(e)=>{setNewTask({...newTask,description:e.target.value})}}/> */}
                  {isEditable?<div><button className='btn btn-warning btn-md' onClick={(e)=>handleEdit()}>OK</button>
                    <button className='btn btn-danger btn-md' onClick={()=>setIsEditable(false)}>Cancel</button></div>
                  :<button className='btn btn-primary btn-md' onClick={handleAdd}>Add</button>}
                </div>
                {task?.map((item,id)=>{
                  return( 
                    <div  key={id}  className='task'>
                    <div className="task-left">
                    <p>{id+1}.{" "+item.description}</p>
                    </div>
                    <div className="task-right">
                    <img src={del} alt="" onClick={(e)=>{auth.handleDelete(e,item._id)}}/>
                    <img src={edit} alt="" onClick={(e)=>handleEditButton(item.description,item._id,e)}/>
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