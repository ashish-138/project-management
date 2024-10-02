import { useEffect, useState } from "react"
import Topbar from "../../components/topbar/Topbar"
import Taskdashboard from "../taskdashboard/Taskdashboard"
import axios from "axios"
import "./adminprojectboard.css"
import { useNavigate } from "react-router-dom"


export default function Adminprojectboard() {



  const [allprojects, setAllprojects] = useState([])
  const history = useNavigate()


  useEffect(() => {
    const auth = localStorage.getItem("token")
    if(auth){
    const token = { token: auth }
    checkprelogin(auth)
    getaccess(token);
    }
  }, [])

  async function checkprelogin(auth) {
    if (auth) {
      const data = { token: auth }
      try {
        const user = await axios.post("http://localhost:8000/api/user", data)
        if (!user.data.isAdmin) {
          history("/")
        } 
      } catch (error) {
        console.log(error);
      }
    }
    else {
      history("/login")
    }
  }


  const getaccess = async (token) => {
    try {
      const result = await axios.post("http://127.0.0.1:8000/api/user", token)
      if (result.data.isAdmin) {
        const allprojects = async () => {
          try {
            const data = await axios.post("http://127.0.0.1:8000/api/projects", token)
            setAllprojects(data.data)
          } catch (error) {
            console.log(error);
          }
        }
        allprojects()
      }
    } catch (error) {
      console.log(error);
    }
  }




  return (
    <div className="adminprojectboard">
      <div className="admin-pr-tp">
        <Topbar />
      </div>
      <div className="admin-pr-bt">
        {allprojects ? allprojects.map((p) => <Taskdashboard key={p._id} project={p} />) : ""}
      </div>
    </div>
  )
}
