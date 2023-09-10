import  { ChangeEvent, FormEvent, useState } from 'react'
import { useChat } from '../../contexts/ChatContext';
import { Button } from '@chakra-ui/react';
import { BiSend } from 'react-icons/bi';
import useAuth from '../../contexts/Authcontext';
import Lottie from 'react-lottie';
import { chattypingOptions } from '../../utils/common';

export const ChatInput = () => {
    const {sendmsg,istyping,currentchatuser,typinguser} =useChat()
    const {socket,currentuser} = useAuth()
    const [msg, setMsg] = useState("");
    const sendchat = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (msg.length > 0) {
        // handletyping()
        sendmsg(msg);
        setMsg("");
        socket.current?.emit("stop typing", currentuser?._id);
        
      }
    };

    const handletyping = (e:ChangeEvent<HTMLInputElement>)=>{
      // e.preventDefault()

      setMsg(e.target.value)
       if (!istyping) {
        //  setisTyping(true);
         socket.current?.emit("typing",{userid:currentchatuser?._id ,senderid:currentuser?._id})
       
        
         setTimeout(() => {
          socket.current?.emit("stop typing", currentchatuser?._id)
        }, 5000);
       }

      if (e.target.value.length == 0) {
        console.log("Its empty");
         socket.current?.emit("stop typing", currentchatuser?._id);
       }

      
          console.log("Typing...");
       
    }

   

    
  return (
    <>
      {istyping && currentchatuser?._id == typinguser ? (
        <Lottie
          options={chattypingOptions}
          direction={0}
          height={50}
          width={150}
        />
      ) : (
        <></>
      )}
      <form
        action=""
        className="flex flex-row px-0 py-0 gap-2 rounded-full items-center"
        onSubmit={(e) => sendchat(e)}
      >
        <input
          className="border-none hover:border-none focus:border-none"
          type="text"
          placeholder="type your message"
          value={msg}
          onChange={(e) => handletyping(e)}
        />
        <Button
          type="submit"
          rounded={"3xl"}
          px={10}
          bg={"whiteAlpha.400"}
          h={"full"}
          overflow={"hidden"}
        >
          <BiSend />
        </Button>
      </form>
    </>
  );
}
