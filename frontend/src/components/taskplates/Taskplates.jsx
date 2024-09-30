import EditIcon from '@mui/icons-material/Edit';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import DeleteIcon from '@mui/icons-material/Delete';
import "./taskplates.css"
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Taskplates({data}) {

  const [pending,setPending] = useState(false)
  const [states,setStates] = useState(false)
  const [newdata,setNewData] = useState()
  const [update,setUpdate] = useState(false)
  const history = useNavigate()

  const discription = useRef()


  useEffect(()=>{
    if(data){
    data.status===pending?setPending(false):setPending(true)
    setNewData(data)}
    else{

    }
    history("/projects")
  },[data,pending,setStates])

  useEffect(()=>{},[update,states])

  const pendingHandle = ()=>{
    setPending(!pending)
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
        
        setUpdate(!update)
        setPending(false)
  }

  const deleteHandle= async()=>{
    try {
      const result = await axios.delete(`http://127.0.0.1:8000/api/project/task/${data._id}`)
      history("/projects")
    } catch (error) {
      console.log(error);
    }
    

  }

  const onChangeHandle = (value)=>{
      setNewData(value)
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
            {pending?<div className="stetus-pending" onClick={pendingHandle} >Pending</div>: <div className="stetus-complete" onClick={pendingHandle} >Completed</div>}
            <EditIcon className='icon-e' onClick={editHandle} />
            <DeleteIcon className='icon-d' onClick={deleteHandle} />
        </div>
        {states ? <div className="task-container">
        <div className="task">
          <span className="note-task"> Update Your Task </span>
          <div className="task-btm">
          <input type="text" className="taskNote" value={newdata.discription} ref={discription} onChange={onChangeHandle} placeholder="Update Task Discription" required />
          <button className="submit-task" onClick={submitHandle}>Submit</button>
          <button className="cancle-task" onClick={cacleHandler}>Cancle</button>
          </div>
        </div>
      </div> : ""}
    </div>
  )
}
