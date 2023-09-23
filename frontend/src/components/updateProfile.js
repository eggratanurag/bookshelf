import React, { useState } from "react";
import SignUpForm from "./signUpForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserState } from "../context/userProvider";
import { useToast } from "@chakra-ui/react";
export default function UpdateProfile() {
  const [loading, setLoading] = useState(false);

  const { user, setUser } = UserState();
  const Navigate = useNavigate();
  const Toast = useToast();
  const hello = "hello moto";
  const prePicture = user && user.pic;
  // console.log(prePicture);
  async function collectData(pic, state, address, mob, e) {
    // console.log("calling collect data in updateProi=file");
    // console.log("pic",pic)
    // console.log("state",state)
    // console.log("address",address)
    // console.log("mob",mob)
    
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/api/user/updateUser/${user._id}`,
        { pic, state, address, mob},
        config
      );
      // console.log(data);
      Toast({
        title: "updated profile",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });

      Navigate("/");
      window.location.reload();
    } catch (error) {
       console.log(error)
    }
    setLoading(false);
  }
  return (
    <SignUpForm
      mode={"update"}
      updateData={collectData}
      loading={loading}
      prePicture={prePicture}
    />
  );
}