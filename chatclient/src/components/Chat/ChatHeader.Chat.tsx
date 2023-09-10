import { Avatar, AvatarBadge } from '@chakra-ui/react';
import { useChat } from '../../contexts/ChatContext';
import Lottie, { Options } from 'react-lottie'
import animationdata from '../../assets/typinganimation.json'

export const ChatHeader = () => {
 
    const {currentchatuser,istyping,typinguser} = useChat()
     const defaultOptions: Options = {
       animationData: animationdata,
       autoplay: true,
       loop: true,
       rendererSettings: {
         preserveAspectRatio: "xMidYMid slice",
       },
     };

  return (
    <div>
      <nav className="flex justify-between rounded-xl px-3 m-3 bg-neutral-950">
        <div className="  h-24  gap-3 flex justify-center items-center">
          {/* <Button
            bg={"transparent"}
            size={"md"}
            onClick={() => setCurrentChatuser(undefined)}
          >
            <ArrowBackIcon />
          </Button> */}
          <Avatar
            size={"lg"}
            name={currentchatuser?.username}
            src={currentchatuser?.AvatarPic}
            key={currentchatuser?._id}
          >
            <AvatarBadge boxSize="1.5rem" bg={currentchatuser?.isLogin?"green.500":"red.500"} />
          </Avatar>
          <h2 className="text-2xl font-bold">{currentchatuser?.username}</h2>

          {istyping && currentchatuser?._id == typinguser ? (
            <><Lottie options={defaultOptions} height={50} width={150} /></>
          ) : (
            <></>
          )}
        </div>
      </nav>
    </div>
  );
}
