
import { useContext, useEffect, useState } from "react"
import "./usertiles.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import UserContext from "../../context/UserContext"

export default function Usertiles({users}) {

  const [projectlength,setProjectLength]= useState()
  const {setAdmin} = useContext(UserContext)
  const navigate = useNavigate()


  useEffect(()=>{
    const auth = localStorage.getItem("token")
    const token = {token:auth}
    if(users){
    const getProjects= async()=>{
        try {
          const result = await axios.post("http://127.0.0.1:8000/api/projects",token)
          let x=result.data;
          const data = x.filter((e)=>e.userId===users._id)
          setProjectLength(data.length)
        } catch (error) {
          console.log(error);
        }
    }
    getProjects()
  }

  },[])

    const clickHandle = ()=>{
      setAdmin(users)
      navigate("/")
    }

  return (

    <div className="usertiles" onClick={clickHandle}>
            <img src={users.profilepicture?users.profilepicture:"/images/profile.jpg"} className="userimg" alt="" />
            <span className="username">{users?users.name:""}</span>
            <span className="projects">Projects : {projectlength}</span>
    </div>
  )
}
