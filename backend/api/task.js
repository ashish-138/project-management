import express from "express";
import Task from "../database/tasksModel.js"


const router = express.Router()


//create Task
router.post("/project/task", async(req,res)=>{
    try {
        const newTask = new Task({
                projectId:req.body.projectId,
                discription:req.body.discription,
                priority:req.body.priority
        })

        await newTask.save()
        res.status(201).json("task created succefully!")

    } catch (error) {
        res.status(500).json(error)
    }
})

//find all task relevent to projectid
router.get("/project/task/:projectId", async(req,res)=>{
    try {
        const result = await Task.find({projectId:req.params.projectId})
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }

})

//update Task
router.put("/project/task/:id",async(req,res)=>{
    try {
        await Task.findByIdAndUpdate(req.params.id,{$set:req.body})
        res.status(200).json("Task updated successfully!")
    } catch (error) {
        res.status(500).json(error)
    }
})

//project statics
router.get("/project/statics/:projectId",async(req,res)=>{
    try {
        const result = await Task.find({projectId:req.params.projectId})
        if(result){
        const pending = result.filter((pending)=>pending.status=="Pending")
        const data = {length:result.length,
                      pending:pending.length
                    }
                    console.log(data);
        res.status(200).json(data)
                }
            else{
                const data = {length:0,pending:0}
                res.status(200).json(data)
            }
    } catch (error) {
        res.status(500).json(error)
    }
})

//delete Task
router.delete("/project/tasks/:projectId", async(req,res)=>{
    try {
        await Task.deleteMany({projectId:req.params.projectId})
        res.status(200).json("Tasks deletes sucessfully")
    } catch (error) {
        res.status(500).json(error)
    }
})

//delete one Task
router.delete("/project/task/:id", async(req,res)=>{
    try {
        await Task.findByIdAndDelete({_id:req.params.id})
        res.status(200).json("Task Deleted Successfully!")
    } catch (error) {
        res.status(500).json(error)
    }
})






export default router;