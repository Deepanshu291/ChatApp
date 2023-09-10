import { useEffect} from 'react'
import { useChat } from '../contexts/ChatContext'
import useAuth from '../contexts/Authcontext'
import { IChat } from '../utils/types';
// import { ArrowBackIcon } from '@chakra-ui/icons';
import { ChatHeader } from './Chat/ChatHeader.Chat';
import { ChatBox } from './Chat/ChatBox.Chat';
import { ChatInput } from './Chat/ChatInput.Chat';

export const ChatPage = () => {
    const {
      currentchatuser,
      getmsg,
      setchats,
      setisTyping,
      istyping,
      setTypinguser,
    } = useChat();
    const {socket}= useAuth()
    
    
   
    useEffect(()=>{
      getmsg()
    },[currentchatuser])

    useEffect(()=>{
        socket.current?.on(
          "typing",
          (userid:string)=> {
            setTypinguser(userid);
            setisTyping(true);
            // console.log("Typing..... " + userid + `  `+ currentchatuser?._id);
          }
        );
        socket.current?.on("stop typing", () =>{
          setisTyping(false)
        })
        // console.log(istyping);
        
    },[istyping])
  

    useEffect(() => {
      socket.current?.on('msg-recive',(msg:IChat)=>{
        if (currentchatuser?._id === msg.sender._id) {
          setchats((prev)=>[...prev!,msg])
          console.log(msg); 
        }
        console.log(msg.sender._id);
        
        // console.log("currchatsender " + currentchatuser?.isLogin);
        // console.log("typinguser " + typinguser);
        // console.log("curruser " + currentuser?._id);
      })
    }, [])

    console.log(currentchatuser?.isLogin);
    

    
    
  return (
    <div className=" w-[70%] h-full p-2  flex-grow-[9]  flex flex-col ">
      
      <ChatHeader />
      <ChatBox />
      <ChatInput />
    </div>
  );
}
