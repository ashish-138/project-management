import Topbar from "../../components/topbar/Topbar"
import Taskplates from "../../components/taskplates/Taskplates"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import "./taskboard.css"


export default function Taskboard() {

  const [task, setTask] = useState()
  const [states,setStates] = useState(false)
  const [update,setUpdate] = useState(false)

  const discription = useRef()

  useEffect(() => {
    
    getTaskdata()
  },[states])

  async function getTaskdata (){
  const auth = localStorage.getItem("projectId")
    
      try {
        const result = await axios.get(`http://127.0.0.1:8000/api/project/task/${auth}`)
        setTask(result.data)
      } catch (error) {
        console.log(error);
      }
    }

  useEffect(()=>{},[states, update,task])

  const addTaskHandle = ()=>{
        setStates(true)
  }

  const submitHandle = async()=>{
        const auth = localStorage.getItem("projectId")
        const data = {
          projectId:auth,
          discription:discription.current.value
        }
        try {
           await axios.post("http://localhost:8000/api/project/task",data)
        } catch (error) {
          console.log(error);
        }
        setUpdate(!update)
        setStates(false)
  }

  const cacleHandler = ()=>{
        setStates(false)
  }


  return (
    <div className="taskboard">
      <div className="task-top">
        <Topbar />
        <span className="task-page"> Your Project Task Board </span>
      </div>
      <div className="task-bottom">
        {task?
        task.map((t)=>(<Taskplates key={t._id} data={t} />)):""}
      </div>
      {states ? <div className="task-container">
        <div className="task">
          <span className="note-task"> Create Your Task </span>
          <div className="task-btm">
          <input type="text" className="taskNote" ref={discription} placeholder="Enter Task Discription" required />
          <button className="submit-task" onClick={submitHandle}>Submit</button>
          <button className="cancle-task" onClick={cacleHandler}>Cancle</button>
          </div>
        </div>
      </div> : ""}
      <div className="addtask">
        <div className="add" onClick={addTaskHandle} >
          <span className="addBtn">+</span>
        </div>
      </div>
    </div>
  )
}
