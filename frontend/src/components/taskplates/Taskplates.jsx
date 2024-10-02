import EditIcon from '@mui/icons-material/Edit';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import DeleteIcon from '@mui/icons-material/Delete';
import "./taskplates.css"
import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';

export default function Taskplates({data}) {


  const {updates , setUpdates} = useContext(UserContext)

  const [pending,setPending] = useState(false)
  const [states,setStates] = useState(false)
  const [newdata,setNewData] = useState()
  const history = useNavigate()

  const discription = useRef()


  useEffect(()=>{
    getStatus()
  },[data,setStates])


  function getStatus(){
    console.log(data.status);
    if(data){
      data.status==="completed"?setPending(true):setPending(false)
      setNewData(data)}
      else{
  
      }
  }
  
  const pendingHandle = async()=>{
    if(pending===false){
    try {
        const value = {
          status:"completed"
        }
      await axios.put(`http://127.0.0.1:8000/api/project/task/${data._id}`,value)
      } catch (error) {
        console.log(error);  
    }
    setPending(true)
  }
      
  else{
    
    try{
    const value = {
      status:"pending"
    }
    await axios.put(`http://127.0.0.1:8000/api/project/task/${data._id}`,value)
  } catch (error) {
    console.log(error);
    setPending(false)
  } 
    setStates(false)
    setUpdates(!updates)  

  }
}


  const editHandle = ()=>{
    setStates(true)
  }

  const cacleHandler = ()=>{
    setStates(false)
  }

  const submitHandle = async()=>{
        try {
          const value = {
            discription:discription.current.value
          }
          const result = await axios.put(`http://127.0.0.1:8000/api/project/task/${data._id}`,value)
          console.log(result);
        } catch (error) {
          console.log(error);
        }
        
        setStates(false)
        setUpdates(!updates)
  }

  const deleteHandle= async()=>{
    try {
      const result = await axios.delete(`http://127.0.0.1:8000/api/project/task/${data._id}`)
      setUpdates(!updates)
    } catch (error) {
      console.log(error);
    }
    
  }

  return (
    <div className="taskplate">
        <div className="task-left">
            <ArrowRightIcon />
        </div>
        <div className="task-mid">
        <span className="task-discription">{data.discription}</span>
        </div>
        <div className="task-right">
            {!pending?<div className="stetus-pending" onClick={pendingHandle} >Pending</div>: <div className="stetus-complete" onClick={pendingHandle} >Completed</div>}
            <EditIcon className='icon-e' onClick={editHandle} />
            <DeleteIcon className='icon-d' onClick={deleteHandle} />
        </div>
        {states ? <div className="task-container">
        <div className="task">
          <span className="note-task"> Update Your Task </span>
          <div className="task-btm">
          <input type="text" className="taskNote" ref={discription}  placeholder="Update Task Discription" required />
          <button className="submit-task" onClick={submitHandle}>Submit</button>
          <button className="cancle-task" onClick={cacleHandler}>Cancel</button>
          </div>
        </div>
      </div> : ""}
    </div>
  )
}
