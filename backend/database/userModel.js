import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
        },
    name:{
        type:String,
        required:true
        },
    password:{
        type:String,
        required:true
        },
    profilepicture:{
        type:String,
        default:""
        },
    isAdmin:{
        type:Boolean,
        default:false
       }    
},
{timestamps:true}
)

export default mongoose.model("User",UserSchema);

