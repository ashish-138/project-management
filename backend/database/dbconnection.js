import mongoose from "mongoose"
import dotenv from "dotenv"


//database secure connection
dotenv.config()


//database connection
const DBconnect = async()=>{

    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected sucessfully");
    } catch (error) {
        console.log(error);
    }

}

export default DBconnect;