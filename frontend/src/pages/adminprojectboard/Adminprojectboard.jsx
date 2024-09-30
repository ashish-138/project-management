import { useEffect, useState } from "react"
import Topbar from "../../components/topbar/Topbar"
import Taskdashboard from "../taskdashboard/Taskdashboard"
import axios from "axios"
import "./adminprojectboard.css"


export default function Adminprojectboard() {



        const [allprojects,setAllprojects]=useState()


        useEffect(()=>{
            const auth = localStorage.getItem("token")
            const token={token:auth}
            const getaccess=async()=>{
                try {
                  const result = await axios.post("http://127.0.0.1:8000/api/user",token)
                  if(result.data.isAdmin){
                    const allprojects = async()=>{
                        try {
                          const data = await axios.post("http://127.0.0.1:8000/api/projects",token)
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
              
              getaccess();
        },[])




  return (
    <div className="adminprojectboard">
        <div className="admin-pr-tp">
            <Topbar/>
        </div>
        <div className="admin-pr-bt">
           {allprojects?allprojects.map((p)=><Taskdashboard key={p._id} project={p}/>):"" } 
        </div>
    </div>
  )
}
