import  { useEffect, useState } from 'react'
import useAuth from '../../contexts/Authcontext';
import { useChat } from '../../contexts/ChatContext';
import { IUser } from '../../utils/types';
import Lottie from 'react-lottie';
import { chattypingOptions } from '../../utils/common';
import { Avatar, AvatarBadge} from '@chakra-ui/react';

export const SideBar = () => {
   const { allUser, users, currentuser } = useAuth();
   const {handlechatuser,istyping,typinguser} = useChat()
   const [cindex, setCindex] = useState<number | undefined>(undefined)

   const changestate =(index:number, user:IUser) => {
      setCindex(index)
      handlechatuser(user)
   }
   

   useEffect(() => {
     allUser();
   }, []);
  return (
        <div className="contact-container  pt-3">
          <div className="contacts" key="">
            {users.map((user, index) => {
              return (
                <div
                  className={`contact ${index == cindex ? "selected" : ""}`}
                  key={user?._id}
                  onClick={() => changestate(index, user)}
                >
                  {/* <div className="avatar">
                    <img src={user.AvatarPic} alt="avatar" />
                   
                  </div>
                   */}
                  <Avatar
                    size={"md"}
                    name={user?.username}
                    src={user?.AvatarPic}
                    key={user?._id}
                  >
                    <AvatarBadge
                      
                      boxSize="1.2rem"
                      bg={user?.isLogin ? "green.500" : "red.500"}
                    />
                  </Avatar>
                  <div className="username">
                    <h3>{user.username}</h3>
                  </div>

                  {istyping && user._id == typinguser ? (
                    <Lottie
                      options={chattypingOptions}
                      direction={0}
                      height={50}
                      width={150}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
            
          </div>
          <div className="current-user">
            <div className="avatar">
              <img src={currentuser!.AvatarPic} alt="avatar" />
            </div>
          </div>
        </div>
  );
}
