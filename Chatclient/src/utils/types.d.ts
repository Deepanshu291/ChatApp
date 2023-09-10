import  React,{ ReactNode, RefObject } from "react"
import { Socket } from "socket.io-client"

export interface IUser {
    _id?:string
    username?:string
    email?:string
    password?:string
    IsAvater?:string
    isLogin?:boolean
    AvatarPic?:string
    createdAt?: string
    updatedAt?: string
    __v?: number
}

export interface IChat{
    fromself:boolean
    chat:string
    sender:IUser
    receiver?:IUser
}

export interface IAuthContextProps{
    users:IUser[] 
    currentuser?:IUser 
    token:string | null
    loginuser?:(email:string,password:string)=>void 
    registeruser?:(username:string, email:string, password:string) =>void
    logout?:()=>void 
    handleValidation?:(value:IUser)=> boolean
    setAvatar?:(pic:string)=>void
    allUser:()=>void
    loading:boolean
    socket:React.MutableRefObject<Socket<DefaultEventsMap, DefaultEventsMap> | undefined>
    // searchUser:(search:string)=>void
}

export interface IApiContextProps{
    getImage:()=>Promise<void>
    images:string[]
   
}



export interface IChatContextProps{
    chats:IChat[] | undefined
    currentchatuser:IUser | undefined
    istyping:boolean
    typinguser:string
    handlechatuser:(user:IUser)=>void
    sendmsg:(msg:string)=> void
    getmsg:()=>void
    setchats: React.Dispatch<React.SetStateAction<IChat[] | undefined>>
    setCurrentChatuser: React.Dispatch<React.SetStateAction<IUser | undefined>>
    setisTyping:React.Dispatch<React.SetStateAction<boolean>>
    setTypinguser:React.Dispatch<React.SetStateAction<string>>
}

export type Childrens={
    children: ReactNode
}


