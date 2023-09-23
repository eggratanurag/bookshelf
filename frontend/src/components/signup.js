import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import "./login.css"
import { useToast } from '@chakra-ui/react'
import axios from 'axios';
import SignUpForm from "./signUpForm.js"
import { UserState } from '../context/userProvider';
export default function Signup() {
  const [show, setShow] = useState(false);
  const {user, setUser} = UserState()
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const Navigate = useNavigate();
   
    const[loading, setLoading] = useState(false);
   
    
    const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
   

    // sign up function
    const collectData = async (name,email,password,mob, state, address,e) => {
      setLoading(true);
      if (!name || !email || !password ) {
   
        // console.log("no data typed")
        toast({
          title: "fill all the fields",
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        return;
      }
      
        if (!isEmail(email)) {
      
          toast({
            title: "oops!",
            description: "type a valid email",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "bottom",
          });
         setLoading(false);
          return
        }

        // console.log(name, email, password)
        // Navigate("/")
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
         
          const  {data}  = await axios.post("/api/user",{name, email, password, address,mob, state},
            config
          );
         
         
          toast({
            title: "Registration Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        
          localStorage.setItem("userInfo", JSON.stringify(data));
          // const decoded = jwt(JSON.stringify(data.token))
          // cookies.set("jwt_authorization", JSON.stringify(data.token), {
          //    expires: new Date(2592000),
          //    HttpOnly:true
          // })
          Navigate('/')
     
          window.location.reload(); 
          setLoading(false);
        } catch (error) {
         
         setLoading(false);
          // console.log(error)
          toast({
            title: "oops!",
            description: error.response.data.message,
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "bottom",
          });
        }
    
    }



  return (
    <SignUpForm
    btnText={"Sign Up"}
    collectData={collectData}
    loading={loading}
     />
   
  )
}