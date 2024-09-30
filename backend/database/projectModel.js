import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
         },
    projectName:{
        type:String,
        required:true
    }
},{timestamps:true})

export default mongoose.model("Project",projectSchema);