import React from "react";
import "./contact.css";
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
export default function Contact() {
    const [email, setEmail] = React.useState();
    const [message, setMessage] = React.useState();
    const Navigate = useNavigate();
    const Toast = useToast();

    function buttonClicked () {
      Navigate('/')
      Toast({
        title: `message sent successfully`,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
    }
  return (
    <div>
      <form>
        <input
          value={email}
          onChange={e=> setEmail(e.target.value)}
          type="email"
         
          placeholder="email"
        />
        <textarea
          value={message}
          onChange={e=> setMessage(e.target.value)}
         
          placeholder="type a message..."
          rows="3"
        />
        <button onClick={buttonClicked}><SendIcon /></button>
      </form>
    </div>
  );
}

