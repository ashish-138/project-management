import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {Doughnut} from "react-chartjs-2"
import "./projecttiles.css"
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';



ChartJS.register(ArcElement, Tooltip, Legend);



export default function ProjectTiles({project}) {

    const {setUpdates} = useContext(UserContext)

    const [projects , setProjects] = useState({})
    const [projectValue, setProjectValue] = useState({})
    const [update,setUpdate]= useState(false)
    const history = useNavigate()

    useEffect(()=>{
        setProjects(project)
        const projectStatics =async (projectId)=>{
            try {
                const result = await axios.get(`http://localhost:8000/api/project/statics/${projectId}`)
                let x = result.data.pending;
                let y = result.data.length;

                if(x===0 && y===0){
                    let statics = {completed:100,pending:0}
                    setProjectValue(statics)
                }else{
                    let z=(x/y)*100;
                    let statics = {pending:z,completed:100-z}
                    setProjectValue(statics)
                }
            } catch (error) {
                console.log(error)
            }   
        } 
        projectStatics(project._id)
    },[project,update,setUpdate])


    const clickHandel=()=>{
        history("/projects");
        localStorage.setItem("projectId",project._id)
    }

    const deleteHandle = async()=>{

        try {
            const result = await axios.delete(`http://127.0.0.1:8000/api/project/${project._id}`)
            try {
                    const res = await axios.delete(`http://127.0.0.1:8000/api/project/tasks/${project._id}`)
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
        setUpdate(true);
        history("/login");
        setUpdates(true)

    }


  return (
    <div className="prjtiles">
        <div className="prj-top">
            <div className="prj-top-left">
                <span className="title">{project.projectName}</span>
            </div>
            <div className="prj-top-right">
                {projectValue.pending>0?<div className="status-pendiing">Pending</div>: <div className="status-compleete">Completed</div>}
                <DeleteForeverIcon className='del-icon' onClick={deleteHandle} />
            </div>
        </div>
        <div className="prj-bottom" onClick={clickHandel}>
            <div className="prj-bottom-left">
                <div className="bottom-left">
                    <span className="left">Completed : {Math.floor(projectValue.completed)}%</span>
                </div>
                <div className="bottom-left">
                    <span className="left">Pending : {Math.floor(projectValue.pending)}%</span>
                </div>
            </div>
            <div className="prj-bottom-right">
                    <Doughnut
                        data={{
                            labels:[],
                            datasets:[{
                                label:"",
                                data:[projectValue.completed,projectValue.pending],
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
            </div>
        </div>
    </div>
  )
}
