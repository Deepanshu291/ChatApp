import { useEffect, useRef } from 'react';
import { useChat } from '../../contexts/ChatContext';
import { Avatar,Text } from '@chakra-ui/react';

export const ChatBox = () => {

    const {chats} = useChat()
    const scrollRef = useRef<HTMLDivElement>(null);
   

    useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      //  console.log(chats);
    }, [chats]);

  return (
    <div className="h-full overflow-auto sidescroll flex flex-col" key={23}>
      {chats?.map((chat, index) => {
        // console.log("reciver "+ chat.receiver?._id);
        // console.log("sender "+chat.sender._id);
        
        
        
        
        
        return (
          <div ref={scrollRef}>
            <div
              className={`flex px-3 py-2 mb-3 gap-2  text-xl items-end ${
                chat.fromself ? "flex-row-reverse" : "justify-start"
              }`}
              key={index}
            >
              {(
                <>
                  <Avatar src={chat.sender.AvatarPic} />
                  <Text color={"white"}>{chat.chat}</Text>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
