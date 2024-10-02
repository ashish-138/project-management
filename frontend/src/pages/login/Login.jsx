import { useRef, useEffect, useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import axios from "axios";
import Topbar from "../../components/topbar/Topbar"
import "./login.css"

export default function Login() {

    const {setUser,setToken} = useContext(UserContext)

    const [errmsg,setErrmsg] = useState(false)

    const email=useRef();
    const password=useRef();
    const history = useNavigate()

    useEffect(()=>{
        const auth= localStorage.getItem('token');
        if(auth){
        checkprelogin(auth)
        }
    },errmsg)

    async function checkprelogin(auth){
        const data = {token:auth}
        try {
            const user = await axios.post("http://localhost:8000/api/user",data)
            if(user){
                history("/")
            }else{
                // history("/login")
            }
        } catch (error) {
            console.log(error);
        }
    }

    const submitHandle = async (e)=>{
        e.preventDefault();
        try{
        const user = {
          email:email.current.value,
          password:password.current.value
        }
            const res = await axios.post("http://127.0.0.1:8000/api/login",user);
            setToken(res.data.token)
            setUser(res.data.data)
            await localStorage.setItem("token",res.data.token);
            history("/");
        }catch(err){
          setErrmsg(true)
        }
      }

      const errorHandle = ()=>{
        setErrmsg(false)
      }


    const signupHandle=(e)=>{
        e.preventDefault()
        history("/register");
      }


    return (
        <div className="login">
            <div className="logintop">
                <Topbar />
            </div>
            <div className="loginbottom">
                <div className="logginbwrapper">
                    <div className="login-bt-wr-l">
                        <img src="/images/amlogo.jpg" alt="amlogo" className="logo-img" />
                        <h3 className="login-bt-wr-r-txt">Project Management</h3>
                        <span className="context">Manage your projects and tasks easily.</span>
                    </div>
                    <form className="login-bt-wr-r" onSubmit={submitHandle}>
                        <span className="login-span">Login to your account</span>
                        {errmsg?<span className="err-msg">Invalid Credentials!!!</span>:""}
                        <input type="email" className="loginEmail" ref={email} onClick={errorHandle} placeholder="Enter your Email..." required />
                        <input type="password" className="loginPwd" ref={password} onClick={errorHandle} placeholder="Enter your password..." required />
                        <button className="loginBtn" type="submit">Log in</button>
                        <span className="fg-pwd" >Forgot Password</span>
                        <button className="signupBtn" onClick={signupHandle}>Create New Account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
