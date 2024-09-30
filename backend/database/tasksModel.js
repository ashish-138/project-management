import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    projectId:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"Pending"
    },
    priority:{
        type:String,
        default:"low"
    }
},{timestamps:true})


export default mongoose.model("Tasks",taskSchema);