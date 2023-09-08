import { match } from "assert"
import mongoose, { Document } from "mongoose"


export interface IUser  {
    username?:string
    email?:string
    password:string
    isAvatar?:boolean
    AvatarPic?:string
    isLogin?:boolean
} 

export interface IUserModal extends IUser, Document{
    matchPassword(password:string):Promise<boolean>
}

