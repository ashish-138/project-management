import Topbar from "../../components/topbar/Topbar"
import ProjectTiles from "../../components/projectTiles/ProjectTiles"
import Add from "../../components/add/Add"
import "./dashboard.css"
import { useEffect, useState, useContext } from "react"
import UserContext from "../../context/UserContext"
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function Dashboard() {


    const {user,setUser,setUpdates} = useContext(UserContext)

    const [users,setUsers] = useState({})
    const [projects,setProjects] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
      const auth = localStorage.getItem("token")
      if(!auth){
        navigate("/login")
      }
      getUser(auth);
      getProjects(auth);   
    },[setUpdates])

    async function getUser(token){
      let data = {token:token}
      try {
        const user = await axios.post("http://localhost:8000/api/user",data)
        setUsers(user.data)
      } catch (error) {
        console.log(error);
      }
    }
    async function getProjects(token){
      let data = {token:token}
      try {
        const result = await axios.post("http://localhost:8000/api/projects",data)
        setProjects(result.data)
      } catch (error) {
        console.log(error);
      }
    }
      
  return (
    <div className="dashboard">
        <div className="dashtop">
           {users?<Topbar props={users} />:<Topbar />}
        </div>
        <div className="dashbottom">
          {projects?
            projects.map((p)=>(<ProjectTiles key={p._id} project={p} />)):""
          }
          
        </div>
        <Add />
    </div>
  )
}
