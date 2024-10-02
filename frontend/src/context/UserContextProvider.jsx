 import { useState } from "react";
 import UserContext from "./UserContext";


 export default function UserContextProvider({children}){

    const [user, setUser] =useState(0);
    const [project,setProject] =useState(0);
    const [token,setToken] = useState(0)
    const [updates,setUpdates] = useState(false)
    const [admin,setAdmin] = useState("")


    return(
        <UserContext.Provider value={{user,setUser,project,setProject,token,setToken,updates,setUpdates,admin,setAdmin}} >
        {children}
        </UserContext.Provider>
    )

 }
