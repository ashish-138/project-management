import express from "express"
import project from "../database/projectModel.js"
import jwt from "jsonwebtoken"

const router = express.Router();

//create project
router.post("/project", async (req, res) => {
       
    try {
        const newProject = new project(req.body)
        const result = await newProject.save();
        res.status(201).json(result)

    } catch (error) {
        res.status(500).json(error)
    }

})

//find Projects
router.post("/projects", async (req, res) => {
    
    try {
        if(!req.body.userId && !req.body.projectId){
        const verify = jwt.verify(req.body.token,process.env.REFERESH_TOKEN_SECRET) 
        if(verify.isAdmin){
            const projects = await project.find()
            res.status(200).json(projects)
        }else{
            if(req.body.projectId){
                const projects = await project.find({ _id: req.body.projectId })
                res.status(200).json(projects)
            }
            else{
                const projects = await project.find({ userId: verify._id })
                res.status(200).json(projects)
            }
        }
    }else{
                if(!req.body.projectId){
                const projects = await project.find({ userId: req.body.userId })
                res.status(200).json(projects)
                }else{
                    const projects = await project.find({ _id: req.body.projectId })
                    res.status(200).json(projects)
                }
    }
    } catch (error) {
        res.status(500).json(error)
    }

})

//find admin projects
router.get("/admin/projects",async(req,res)=>{
    try {
        const verify = jwt.verify(req.body.token,process.env.REFERESH_TOKEN_SECRET)
        const projects = await project.find({userId:verify._id})
        res.status(200).json(projects)
    } catch (error) {
        res.status(500).json(error)
    }

})

//delete Project
router.delete("/project/:id", async (req, res) => {
    try {
        console.log(req.params.id);
        const result = await project.findByIdAndDelete({_id:req.params.id})
        console.log(result);
        res.status(200).json("Project deleted successfully!")
    } catch (error) {
        res.status(200).json(error)
    }
})



export default router;