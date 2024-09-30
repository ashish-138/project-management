import { useEffect, useState } from "react"
import Topbar from "../../components/topbar/Topbar"
// import Taskdashboard from "../taskdashboard/Taskdashboard"
import Usertiles from "../../components/usertiles/Usertiles"
import "./adminboard.css"
import axios from "axios"

export default function Adminboard() {

      const [allusers, setAllusers] = useState()

    useEffect(()=>{
      const auth = localStorage.getItem("token")
      const token = {
        token:auth
      }
      const getData=async()=>{
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
      getData();
    })


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
