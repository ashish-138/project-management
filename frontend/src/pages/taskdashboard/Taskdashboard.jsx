import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import CloseIcon from '@mui/icons-material/Close';
import {Doughnut} from "react-chartjs-2"
import "./taskdashboard.css"
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';


ChartJS.register(ArcElement, Tooltip, Legend);


export default function Taskdashboard({project}) {


    const navigate = useNavigate()
    const {setAdmin,setUpdates} = useContext(UserContext)
    const [allprojects,setAllprojects] = useState()
    const [allusers,setAllusers]=useState()
    const [alltask,setAlltask]=useState()
    const [cnfclose, setCnfclose] = useState(false)

    useEffect(()=>{
          const auth = localStorage.getItem("token");
          const token={token:auth,userId:project.userId}
          if(project){
          const getUser = async() =>{
            try {
              const result = await axios.post("http://127.0.0.1:8000/api/user",token)
              setAllusers(result.data)
            } catch (error) {
              console.log(error);
            }
          }

          const getTaskstatics = async () =>{
            try {
              const result = await axios.get(`http://127.0.0.1:8000/api/project/statics/${project._id}`)
              
              
              let x=result.data.pending
              let y=result.data.length
              if( x===0 && y===0){
                let statics={
                  completed:100,
                  pending:0
                }
                setAlltask(statics)
              }else{
                let z=(x/y)*100;
                let statics={
                  completed:100-z,
                  pending:z
                }
                setAlltask(statics)
              }
            } catch (error) {
              console.log(error);
            }
          }

          getUser()
          getTaskstatics()
        }
    },[])

    useEffect(()=>{},[cnfclose])


    const clickHandle = ()=>{
              setAdmin(project)
              navigate("/projects")
    }

    const closeHandle = ()=>{
      setCnfclose(true)
    }

    const confirmHandle = async()=>{
        try {
          await axios.delete(`http://127.0.0.1:8000/api/project/${project._id}`)
          await axios.delete(`http://127.0.0.1:8000/api/project/tasks/${project._id}`)
          setUpdates(true)
          setCnfclose(false)
        } catch (error) {
          console.log(error);
        }
    }

    const cacleHandler = ()=>{
      setCnfclose(false)
    }



  return (
    <>
    <div className="taskdashboard" >
      <div className="closeBtn">
        <CloseIcon className='close-icon' onClick={closeHandle} />
      </div>
      <div className="project-container" onClick={clickHandle}>
      {alltask?
        <div className="t-chart">
                    <Doughnut
                        data={{
                            labels:[],
                            datasets:[{
                                label:"",
                                data:[alltask.completed,alltask.pending],
                                backgroundColor:[
                                '#44bd32',
                                '#e84118'
                                ],
                                borderColor:[
                                '#44bd32',
                                '#e84118'
                                ],
                            borderWidth:2
                        }]}}
                    />
        </div>:""}
        <div className="t-info" >
                    <span className="p-name">{project?project.projectName:""}</span>
                    <span className="p-user">Assigned to : {allusers?allusers.name:""}</span>
                    {!true?<div className="status-pending">Pending</div>: <div className="status-complete">Completed</div>}
        </div>
        </div>
    </div>
    {cnfclose ? <div className="container-delete">
      <div className="container-2-delete">
      <span className="close-msg"> Do you want to Delete?</span>
      <div className="close-btns">
      <button className="cl-bt" onClick={confirmHandle}>Confirm</button>
      <button className="cl-bt" onClick={cacleHandler}>Cancel</button>
      </div>
    </div>
  </div> : ""}
  </>
  )
}
