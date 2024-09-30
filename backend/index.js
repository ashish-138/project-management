//import libraries
import express from "express"
import cors from "cors"
import DBconnect from "./database/dbconnection.js"
import auth from "./api/auth.js"
import project from "./api/project.js"
import task from "./api/task.js"


const app = express()

//database connection
DBconnect()

//middlewares
app.use(express.json())
app.use(cors())


//api routes
app.use("/api",auth)
app.use("/api",project)
app.use("/api",task)




//server port
app.listen(8000,()=>{
    console.log("Server is running");
})