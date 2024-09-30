import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Taskboard from "./pages/taskboard/Taskboard";
import Adminboard from "./pages/admindashboard/Adminboard";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Adminprojectboard from "./pages/adminprojectboard/Adminprojectboard";
import { useEffect } from "react";
import axios from "axios";



function Home() {


  return (
    <div className="main">
      <Router>
    <Routes>
    <Route exact path ="/" element= { <Dashboard />}/>
    <Route path = "/login" element= {<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/projects" element={<Taskboard />}/>
    <Route path="/admin/users" element={<Adminboard />}/>
    <Route path="/" element={<Adminprojectboard/>}/>
    </Routes>
    </Router>
      
    </div>
  );
}

export default Home;
