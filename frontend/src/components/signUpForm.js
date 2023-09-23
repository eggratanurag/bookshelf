import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import womanLogginIn from "./images/woman-loggin-in.png";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { UserState } from "../context/userProvider";
import { useToast } from "@chakra-ui/react";

import GoogleIcon from '@mui/icons-material/Google';


export default function Signup({ collectData, loading, btnText, checkData,mode,updateData,handleCallbackResponse }) {
  const [show, setShow] = useState(false);
  const [picLoading, setPicLoading] = useState(false);
  const Toast = useToast();
  const handleClick = () => setShow(!show);
  const {user, setUser} = UserState();
  const [pic, setPic] = useState(user && user.pic);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState(user &&  user.state);
  const [address, setAddress] = useState(user &&  user.address);
  const [mob, setMob] = useState(user &&  user.mob);
  const Navigate = useNavigate();
  
  // const clientId = process.env.CLIENT_ID
  
  function imageUpload (image) {
    setPicLoading(true);
    if(image === undefined) {
      Toast({
        title: 'Please select an image',
        position: "bottom",
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      setPicLoading(false)
      return;
    }
    // console.log(image);
  
    if(image.type === 'image/jpeg' || image.type === 'image/png') {
      setPicLoading(true)
      const data = new FormData();
      data.append("file", image)
      data.append("upload_preset", "bookshelf")
      data.append("cloud_name", "dj6x7fggp");
      fetch("https://api.cloudinary.com/v1_1/dj6x7fggp/image/upload",{
      method: "post",
      body: data,
    })
    .then((res)=> res.json())
    .then(data=> {
      setPic(data.url.toString())
      // console.log(data.url.toString());
      setPicLoading(false)
    })
    .catch(err=> {
      Toast({
        title: "try again",
        description: 'cannot upload image try an image of lesser resolution',
        position: "bottom",
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      setPicLoading(false);
    })
    } else {
      Toast({
        title: 'Please select an jpeg or png format image',
        position: "bottom",
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      setPicLoading(false);
      return;
    }
  }


  return (
    <div className="loginPageDiv">
          
      <div className="mainDivForLogin">
        <div className="divForLoginImage">
          {mode==="update" &&  <img src={pic} alt="" />}
          {mode!=="update" && <img src={womanLogginIn} alt="" />}
        </div>
        <div className="divForLoginForm">
            {(btnText === "Sign Up") && (
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  value={name}
                  type="text"
                  placeholder="Enter Your name"
                  className="inputOutline"
                  
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
            )}
            
            {mode==="update" && 
            <>
            
              <FormControl isRequired>
              <FormLabel>Picture</FormLabel>
              <Input
               
                p={1.5}
                type="file"
                placeholder="select a profile picture"
                className="inputOutline"
                accept="image/*"
                onChange={(e) => imageUpload(e.target.files[0])}
              />
              
            </FormControl>
              <FormControl isRequired>
              <FormLabel>State</FormLabel>
              <Input
                value={state}
                type="text"
                placeholder="Enter Your State"
                className="inputOutline"
                onChange={(e) => setState(e.target.value)}
              />
              
            </FormControl>
              <FormControl isRequired>
              <FormLabel>Address</FormLabel>
              <Input
                value={address}
                type="text"
                placeholder="Enter Your address"
                className="inputOutline"
                onChange={(e) => setAddress(e.target.value)}
              />
              
            </FormControl>
           
            <FormControl isRequired>
              <FormLabel>Contact No.</FormLabel>
              <Input
                value={mob}
                type="text"
                placeholder="Enter Your Contact Number"
                className="inputOutline"
                onChange={(e) => setMob(e.target.value)}
              />
              
            </FormControl>

            <Button
              className="nButton"
              width="100%"
              style={{ marginTop: 15 }}
              type="submit"
              onClick={(e) => updateData(pic, state, address, mob, e)}
              isLoading={picLoading}
            >
              Update Profile
            </Button>

            </>
            
            }
           
            {(btnText ==="Login" || btnText ==="Sign Up") &&
            <>
            <FormControl isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input
                value={email}
                type="email"
                placeholder="Enter Your Email Address"
                className="inputOutline"
                onChange={(e) => setEmail(e.target.value)}
              />
              
            </FormControl>
              <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  className="inputOutline"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              className="nButton"
              width="100%"
              style={{ marginTop: 15 }}
              type="submit"
              onClick={(e) => btnText === "Sign Up" ? collectData(name, email, password, mob, state, address, e): checkData(email, password, e)}
              isLoading={loading}
            >
              {btnText}
            </Button>
              {btnText==="Login" && 
              
              <Button onClick={()=> Navigate('/user/signup')} className='login__registerButton'>or register to us</Button>
             
              }
              </>
              }
           
        </div>
      </div>
      
    </div>
  );
}