import { Header  } from "../components/Header";
import { useChat } from "../contexts/ChatContext";
import { Welcome } from "../components/Features/Welcome";
import { ChatPage } from "../components/ChatPage";
import { useEffect} from "react";
import { io } from "socket.io-client";
import useAuth from "../contexts/Authcontext";
import { SideBar } from "../components/Features/SideBar";



function HomePage() {

  const {currentchatuser,} = useChat()
  const {currentuser,socket} = useAuth()
  // const socket = useRef<Socket>()


  // console.log(currentuser?._id);
    useEffect(() => {
      if (currentuser) {
        socket.current = io("http://127.0.0.1:5000");
      const SocIO = socket.current;
      SocIO.emit("setup", currentuser?._id);
      
    }
    }, [currentuser]);

    useEffect(() => {
      socket.current?.on('connected',(id:any)=>{
        console.log(currentchatuser?._id+'is connected to '+id); 
        
      })
    })

    useEffect(()=>{
      console.log(currentchatuser);
      
    },[currentchatuser])
    
  
  return (
    <>
      <Header />
      <div className="main-container">
        <div className="chat-container">
          <SideBar />
          {currentchatuser === undefined? <Welcome /> : <ChatPage />}
        </div>
      </div>
    </>
  );
}

export default HomePage
