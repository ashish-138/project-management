 import { useState } from "react";
 import UserContext from "./UserContext";


 export default function UserContextProvider({children}){

    const [user, setUser] =useState(0);
    const [project,setProject] =useState(0);
    const [token,setToken] = useState(0)
    const [updates,setUpdates] = useState(false)


    return(
        <UserContext.Provider value={{user,setUser,project,setProject,token,setToken,updates,setUpdates}} >
        {children}
        </UserContext.Provider>
    )

 }
