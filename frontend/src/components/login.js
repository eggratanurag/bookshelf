import React, {useState, useEffect} from 'react'

import { useNavigate} from 'react-router-dom';
import "./login.css"
import { UserState } from '../context/userProvider';
import { useToast } from '@chakra-ui/react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
// import googleLogin from "react-google-login"
import SignUpForm from './signUpForm.js';

export default function Login() {

  const{user, setUser} = UserState()
  const toast = useToast(); 
    const [loading, setLoading] = useState(false);
    const Navigate = useNavigate();

    const isEmail = (email) => 
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
      
  


      const checkData = async (email,password,e) => {
        setLoading(true);
        if (!email || !password) {
       
          toast({
            title: "Please Fill all the Feilds",
            status: "warning",
            duration: 5000,
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
    
        // console.log(email, password);
        // Navigate('/')
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
    
          const { data } = await axios.post(
            "/api/user/login",
            { email, password },
            config
          );
    
          // console.log(JSON.stringify(data));
          toast({
            title: "Logged in Successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          localStorage.setItem("userInfo", JSON.stringify(data));
          Navigate('/')
          window.location.reload(); 
      
          setLoading(false);
        } catch (error) {
       
          toast({
            title: "try again",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false)
        //  Navigate('/user/login')
            e.preventDefault();
        }
      };
 
 

  return (

    <SignUpForm
    btnText={"Login"}
    checkData={checkData}
    loading={loading}
     />

  )
}
