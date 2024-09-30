import { useEffect, useState, useRef, useContext} from "react";
import "./add.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";


export default function Notes() {

    const {user,token,setProject}  = useContext(UserContext)

  const [states, setStates] = useState(false)
  // const [data, setData] = useState()
  const history = useNavigate()
  const projectName = useRef();

  function addHandle() {
    setStates(true)
  }

  const cacleHandler = () => {
    setStates(false)
  }

  const submitHandle = async () => {
    const auth = localStorage.getItem("token");
    const tokens = { token: auth }
    try {
      const result = await axios.post("http://127.0.0.1:8000/api/user", tokens)
      try {
        const data = {
          userId: result.data._id,
          projectName: projectName.current.value
        }
        const resp = await axios.post("http://127.0.0.1:8000/api/project", data)
        localStorage.setItem("projectId",resp.data._id)
        setProject(resp.data._id)
        setStates(false)
        history("/login")
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
    
  }

  useEffect(() => {

  }, states)




  return (
    <div className="mainnote">
      {states ? <div className="container">
        <div className="note">
          <span className="note-xt"> Create Your Project </span>
          <input type="text" ref={projectName} className="projectNote" placeholder="Enter project name" required />
          <button className="submit" onClick={submitHandle}>Create Project</button>
          <button className="cancle" onClick={cacleHandler}>Cancel</button>
        </div>
      </div> : ""}
      <div className="add" onClick={addHandle} >
        <span className="addBtn">+</span>
      </div>
    </div>
  )
}
