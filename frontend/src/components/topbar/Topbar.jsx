import SearchIcon from '@mui/icons-material/Search';
import "./topbar.css"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Topbar() {

    const [user,setUser] = useState()



  useEffect(()=>{
      getUserdetails()
  },[])
  

  async function getUserdetails(){
    const auth = localStorage.getItem("token")

    const token = {token:auth}
      try {
        const result = await axios.post("http://127.0.0.1:8000/api/user", token)
        setUser(result.data)      
      } catch (error) {
        console.log(error);
      }
  }

  const navigate = useNavigate()


  const clickHandle = () => {
    navigate("/")
  }

  const logoutHandle = ()=>{
    localStorage.clear()
    navigate("/login")
  }

  const userHandle = ()=>{
    navigate("/admin/users")
  }

  const projectHandle = ()=>{
        navigate("/admin/projects")
  }

  const searchHandle = ()=>{
    
  }

  const homebtnHandel = ()=>(navigate("/"))


  return (
    <div className='topbar'>
      <div className="topleft">
        <img src="/images/amlogo.jpg" alt="applogo" className="top-logo" />
        <span className="topleftspan" onClick={clickHandle}>Project Management</span>
        {/* {user ? <span className="home" onClick={clickHandle}>Home</span> : ""} */}
      </div>
      {user ? user.isAdmin ? <>
        <div className="topcenter">
          <div className="search">
            <input type="text" className='textsearch' />
            <SearchIcon className='searchicon' onClick={searchHandle} />
          </div>
          <div className="menu">
            <span className="users menu-i" onClick={userHandle}>Users</span>
            <span className="Projects menu-i" onClick={projectHandle} >Projects</span>
          </div>
        </div>
        <div className="topright">
          <img src={user.profilepicture ? user.profilepicture : "/images/profile.jpg"} alt="" className='profile-img' />
          <span className="user">{user.name}</span>
          <button className='log-out' onClick={logoutHandle} >Log Out</button>
        </div></> :
        <div className="topright">
          {user?<>
          <span className="homebtn" onClick={homebtnHandel}>Home</span>
          <img src={user ? user.profilepicture ? user.profilepicture : "/images/profile.jpg" : ""} alt="" className='profile-img' />
          <span className="user-rt">{user.name}</span>
          <button className='log-out' onClick={logoutHandle} >Log Out</button></>:""}
        </div>:""} 
        </div>
  )
}
