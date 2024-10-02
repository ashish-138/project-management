import express from "express"
import User from "../database/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const router = express.Router()

//userRegistration
router.post("/register", async (req, res) => {

    try {
        //user existence check
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            //new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            const newUser = await new User({
                email: req.body.email,
                name: req.body.name,
                password: hashedPassword
            })

            //saveuser
            await newUser.save();
            res.status(201).json("User registered successfully!")
        }
        else {
            res.status(409).json({
                code: 11000,
                message: "email Id is already register!"
            })
        }


    } catch (error) {
        res.status(500).json(error)
    }
})

//exist email check
router.post(("/register/:email"), async(req,res)=>{
    try {
        const result = await User.find({email:req.params.email})
        res.status(200).json(result)
    } catch (error) {
        res.status(500)
    }
})


//login
router.post("/login", async (req, res) => {
    try {
        //finding user
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            res.status(404).json("user not found")
        }
        else {
            //password validation
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                res.status(400).json("Invalid password!")
            } else {
                //token generation
                const token = await jwt.sign({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin
                }, process.env.REFERESH_TOKEN_SECRET)

                const data = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    profilePicture: user.profilepicture,
                    isAdmin: user.isAdmin
                }
                res.status(200).json({ token,data })
            }
        }
    } catch (error) {
        res.status(500).json(error)
    }
})


//get a user
router.post("/user", async (req, res) => {

    try {
        const token = jwt.verify(req.body.token, process.env.REFERESH_TOKEN_SECRET)
        if (!req.body.userId) {
            const user = await User.findById({ _id: token._id })
            const data = {
                _id: user._id,
                name: user.name,
                email: user.email,
                profilepicture: user.profilepicture,
                isAdmin: user.isAdmin
            }
            
            res.status(200).json(data)
        } else {
            const user = await User.findById({ _id: req.body.userId })
            const data = {
                _id: user._id,
                name: user.name,
                email: user.email,
                profilepicture: user.profilepicture,
                isAdmin: user.isAdmin
            }

            res.status(200).json(data)
        }

    } catch (error) {
        res.status(500).json(error)
    }

})




//get all users
router.post("/admin", async (req, res) => {
    try {
        const token = jwt.verify(req.body.token, process.env.REFERESH_TOKEN_SECRET)
        if (token.isAdmin) {
            const users = await User.find({ isAdmin: false })
            res.status(200).json(users)
        }
        else {
            res.status(403).json(false)
        }
    } catch (error) {
        res.status(500).json(error)
    }
})


export default router;