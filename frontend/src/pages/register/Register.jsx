import { useRef,useEffect, useState } from "react"
import Topbar from "../../components/topbar/Topbar"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import "./register.css"

export default function Register() {

    const [errmsg, setErrmsg] = useState(false)
    const [errpwd,setErrpwd] = useState(false)
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const cnfpassword = useRef();
    const history = useNavigate()



    useEffect(() => {
        const auth = localStorage.getItem("token");
        checkprelogin(auth)
    })

    async function checkprelogin(auth){
        const data = {token:auth}
        try {
            const user = await axios.post("http://localhost:8000/api/user",data)
            if(user){
                history("/")
            }else{
                history("/register")
            }
        } catch (error) {
            console.log(error);
        }
    }

    const clickHandle = async (e) => {
        e.preventDefault();
        if (cnfpassword.current.value !== password.current.value) {
            cnfpassword.current.setCustomValidity("Password don't match")
        } else {
            const newName=  name.current.value;
            const newEmail= email.current.value;
            const user = {
                name: newName.toUpperCase(),
                email: newEmail.toLowerCase(),
                password: password.current.value
            }
            try {
                const result = await axios.post("http://127.0.0.1:8000/api/register", user);
                console.log(result);
                alert("User register succefully!");
                history("/login")
            } catch (err) {
                console.log(err);
            }
        }
    }

    const loginHandle = (e) => {
        e.preventDefault();
        history("/login");
    }

    const onblurHandl = async() =>{
        console.log(email.current.value);
        try {
            const result = await axios.post(`http://127.0.0.1:8000/api/register/${email.current.value}`)
            if(result.data.length===1){
                setErrmsg(true)
            }
            console.log(email.current.value);
        } catch (err) {
            console.log(err);
        }
    }

    const cnfpwdHandle = () =>{
        if(cnfpassword.current.value !== password.current.value){
            setErrpwd(true)
        }
    }

    

    return (
        <div className="register">
            <div className="registertop">
                <Topbar />
            </div>
            <div className="registerbottom">
                <div className="registerbwrapper">
                    <div className="register-bt-wr-l">
                        <img src="/images/amlogo.jpg" alt="amlogo" className="logo-img" />
                        <h3 className="register-bt-wr-r-txt">Project Management</h3>
                        <span className="context">Manage your projects and tasks easily.</span>
                    </div>
                    <div className="register-bt-wr-r">
                        <form className="signupwrapper" onSubmit={clickHandle}>
                            <span className="register-span">Create A New Account</span>
                            {errmsg?<span className="rg-err-msg">Email is already registered!!!</span>:""}
                            <input type="email" ref={email} className="registerEmail" onBlur={onblurHandl} onFocus={()=>(setErrmsg(false))} placeholder="Enter your Email" required />
                            <input type="text" ref={name} className="registerName" placeholder="Enter your Full Name" minLength={3} required />
                            <input type="password" ref={password} className="registerPwd" placeholder="Enter New Password" minLength={6} required />
                            {errpwd?<span className="pwd-err">Password don't match!!!</span>:""}
                            <input type="password" ref={cnfpassword} className="registerPwd" onBlur={cnfpwdHandle} onFocus={()=>(setErrpwd(false))} placeholder="Enter Confirm Password" minLength={6} required />
                            <button className="registerBtn" type="submit">Sign up</button>

                        </form>
                        <span className="login" onClick={loginHandle}>Already have an Account</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
