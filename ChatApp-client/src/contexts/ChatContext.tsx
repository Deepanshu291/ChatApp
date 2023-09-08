import { createContext, useContext, useEffect,  useState } from "react";
import { Childrens, IChat, IChatContextProps, IUser } from "../utils/types";
import { api } from "../utils/common";
import useAuth from "./Authcontext";

const ChatContext = createContext<IChatContextProps | null>(null)


export const ChatProvider = ({children}:Childrens) => {
    
    const [chats, setchats] = useState<IChat[] | undefined>(undefined)
    const [istyping, setisTyping] = useState(false);
    const [currentchatuser, setCurrentChatuser] = useState<IUser | undefined>(undefined)
    const [typinguser, setTypinguser] = useState("");
    const {currentuser,socket} = useAuth()

    const baseurl = "/api/chat";
    // console.log("to user "+currentchatuser?._id);
    // console.log(chats);
    useEffect(() => {
      //  console.log(currentuser);
       
    }, [])
    
    
    
    const sendmsg =async ( msg:string) => {
      const currentuserid = localStorage.getItem("userid");
        await api.post(
          baseurl+"/addmsg",{
            fromUser:currentuserid as String,
            toUser:currentchatuser?._id as String,
            msg:msg
          }
        ).then(async (res) =>{
          if (res.status=200) {
             const data: IChat = {
               fromself: false,
               chat: msg,
               receiver: currentchatuser!,
               sender: currentuser!,
             };
             socket.current?.emit("sendmsg", data);
             socket.current?.emit("stop typing", currentuser?._id);
             setisTyping(false)
             const senderdata: IChat = {
               fromself: true,
               chat: msg,
               sender: currentuser!,
             };
             setchats((prev) => [...prev!, senderdata]);
            // getmsg()
          }
        })
    }

    const getmsg =async () => {
      
        // console.log("from user "+fromUser._id);
        const currentuserid = localStorage.getItem('userid')
         await api
          .post(
            baseurl + "/getmsg",
            {
              fromUser: currentuserid as string,
              toUser: currentchatuser?._id as string,
            }
          )
          .then(async (res) => {
           
            // console.log(res.status);
            
            if (res.status == 200 ) {
              // console.log(res.status); 
              // setchats(undefined);
              const chat:IChat[] = res.data
              // console.log(chats);
              
              if (Array.isArray(chat) && chat.length != 0) {
                // console.log(chat.length);             
                setchats(chat)
              }
            }
            // setchats([])

            
          }).catch(()=>{
            setchats(undefined)
          })
    }

    const handlechatuser =async (user:IUser) => {
        setCurrentChatuser(user)
        // await getmsg()
    }

    

    const context = {
      chats,
      currentchatuser,
      handlechatuser,
      sendmsg,
      getmsg,
      setchats,
      setCurrentChatuser,
      istyping,
      setisTyping,
      typinguser,
      setTypinguser
    };

  return (
    <ChatContext.Provider value={context}>
        {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => {

    const chatvalue = useContext(ChatContext)
    if (!chatvalue) {
        throw new Error("useChat used outside of provider");
    }

    return chatvalue

}

