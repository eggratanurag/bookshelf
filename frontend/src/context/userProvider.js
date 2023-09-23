import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
const UserContext = createContext();

const UserProvider = ({children})=> {
    const [user, setUser]= useState();
    // user && console.log(user.city)
    async function getUser (userInfo) {
    
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                   
                },
              };
              await axios
            .get(`/api/user/${userInfo._id}`, config)
            .then(user => setUser(user.data));
        
        } catch (error) {
         console.log(error)
        }
    }
    useEffect(()=> {
      
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      
         if(userInfo) {
               getUser(userInfo);
         
         }
        
    },[])

return <UserContext.Provider value={{user, setUser}}>
        {children}
        </UserContext.Provider>
}

export const UserState = () => {
   return useContext(UserContext);
}
export default UserProvider;