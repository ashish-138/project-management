import Topbar from "../../components/topbar/Topbar"
import ProjectTiles from "../../components/projectTiles/ProjectTiles"
import Add from "../../components/add/Add"
import "./dashboard.css"
import { useEffect, useState, useContext } from "react"
import UserContext from "../../context/UserContext"
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function Dashboard() {


    const {admin} = useContext(UserContext)

    const [users,setUsers] = useState({})
    const [projects,setProjects] = useState([])
    const history = useNavigate()


    
    useEffect(()=>{
      const auth = !admin?localStorage.getItem("token"):admin;
      if(!admin){checkprelogin(auth)}
      if(!admin){getUser(auth)
        }else{
            setUsers(admin)
        }
      
      getProjects(auth);   
    },[])


    async function checkprelogin(auth){
      if(auth){
      const data = {token:auth}
      try {
          const user = await axios.post("http://localhost:8000/api/user",data)
          if(user){
              history("/")
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
      let data = !admin?{token:token}:{userId:token._id}
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
