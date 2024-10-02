import { useEffect, useState } from "react"
import Topbar from "../../components/topbar/Topbar"
// import Taskdashboard from "../taskdashboard/Taskdashboard"
import Usertiles from "../../components/usertiles/Usertiles"
import "./adminboard.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Adminboard() {

      const [allusers, setAllusers] = useState()
      const history = useNavigate()

    useEffect(()=>{
      const auth = localStorage.getItem("token")
      const token = {
        token:auth
      }
      checkprelogin(auth)
      getData(token)
    })


    async function checkprelogin(auth){
      if(auth){
      const data = {token:auth}
      try {
          const user = await axios.post("http://localhost:8000/api/user",data)
          if(!user.data.isAdmin){
            history("/")
          }
      } catch (error) {
          console.log(error);
      }}
      else{
        history("/login")
      }
  }

  async function getData(token){
    try {
      const result = await axios.post("http://127.0.0.1:8000/api/user",token)
      if(result.data.isAdmin){
        const allUserdata = async()=>{
            try {
              const data = await axios.post("http://127.0.0.1:8000/api/admin",token)
              setAllusers(data.data)
            } catch (error) {
              console.log(error);
            }
        }
        allUserdata()
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="adminboard">
        <div className="admin-top">
            <Topbar/>
        </div>
        <div className="admin-bottom">
          {allusers?allusers.map((u)=>(<Usertiles key={u._id} users={u}/>)):""
            }
        </div>
    </div>
  )
}
