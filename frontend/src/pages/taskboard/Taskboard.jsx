import Topbar from "../../components/topbar/Topbar"
import Taskplates from "../../components/taskplates/Taskplates"
import { useContext, useEffect, useRef, useState } from "react"
import UserContext from "../../context/UserContext"
import axios from "axios"
import "./taskboard.css"
import { useNavigate } from "react-router-dom"


export default function Taskboard() {

  const {updates,setUpdates, admin} = useContext(UserContext)

  const [task, setTask] = useState("")
  const [states,setStates] = useState(false)
  const [projectdata,setProjectData] = useState("")

  const discription = useRef()
  const history = useNavigate()

  useEffect(() => {
    if(!admin){
    checkprelogin()}

    getTaskdata()
    
  },[states, updates])

  async function checkprelogin(){
    const auth = localStorage.getItem("token")
    if(auth){
    const data = {token:auth}
    try {
        const user = await axios.post("http://localhost:8000/api/user",data)
        if(user){
            history("/projects")
        }else{
            history("/login")
        }
    } catch (error) {
        console.log(error);
    }}
    else{
      history("/login")
    }
}

  async function getTaskdata (){
  const auth =!admin? localStorage.getItem("projectId"):admin._id;
  const token= localStorage.getItem("token")
    
      try {
        const result = await axios.get(`http://127.0.0.1:8000/api/project/task/${auth}`)
        setTask(result.data)
       let taskData = result.data.map((e)=>{
              let x= {
                discription:e.discription,
                status:e.status
              }
              return x;
       })
      
        localStorage.setItem("tasks", JSON.stringify(taskData))
      } catch (error) {
        console.log(error);
      }
      try {
        
          let data={}
          if(!admin){
          data={token:token,
          projectId:auth
        }}else{
          data={projectId:admin._id}
          console.log(data);
        }
        const result = await axios.post("http://localhost:8000/api/projects",data)
        setProjectData(result.data)
      } catch (error) {
        console.log(error);
      }
    }


  const addTaskHandle = ()=>{
        setStates(true)
        setUpdates(!updates)
  }

  const submitHandle = async()=>{
        const auth = !admin?localStorage.getItem("projectId"):admin._id;
        const data = {
          projectId:auth,
          discription:discription.current.value
        }
        try {
           await axios.post("http://localhost:8000/api/project/task",data)
        } catch (error) {
          console.log(error);
        }
        setUpdates(!updates)
        setStates(false)
  }

  const cacleHandler = ()=>{
        setStates(false)
  }


  return (
    <div className="taskboard">
      <div className="task-top">
        <Topbar />
        <span className="task-page">{!task.length?"Your Project Task Board":projectdata?projectdata[0].projectName:"" } </span>
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
          <button className="cancle-task" onClick={cacleHandler}>Cancel</button>
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
