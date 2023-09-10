import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { ChatModel } from "../models/message.models";
import { CustomError } from "../utils/helpers/error.helpers";
import { IUser } from "../../@types/user.model";
import { UserModel } from "../models/user.models";
import { IMessage } from "../../@types/message.model";


export const getMessage = expressAsyncHandler(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {fromUser , toUser } = req.body
        
       await ChatModel.find({
        $and:[
            {users:{$elemMatch:{$eq:fromUser}}},
            {users:{$elemMatch:{$eq:toUser}}},
        ]
           
        })
        .sort({updatedAt: 1})
        .select("-users -_id")
        .populate("sender","-password")
        .then(async (rslt)=>{
            // console.log(rslt);
            if (rslt.length == 0) {
                console.log("its empty");
                throw new CustomError({
                    message:"no conversion happened",
                    status: 204
                })
            }

             const prochat = rslt.map(function(chat){
                const id = chat.sender.id.toString()
                const data = {
                fromself: id === fromUser,
                chat:chat.message, 
                sender:chat.sender
                 }
                return  data
            })
            res.json(prochat)
        })
        
        

        // // const chat = await prochat
        // console.log(prochat);
        
        // res.json(prochat)
    } catch (error:any) {
        // throw new CustomError({
        //     message: error.message,
        //     status:402
        // })
        next(error)
    }
})

export const addMessage = expressAsyncHandler(async (req:Request, res:Response) => {
    try {
        const {fromUser , toUser, msg} = req.body
    const data:IMessage = {
        message:msg,
        users:[fromUser, toUser],
        sender: fromUser
        // sender: UserModel.find(fromUser)
    }
    const chat = await ChatModel.create(data)
    res.json({
        msg:"Chat add successfully",
        chat:chat
    }) 

    } catch (error:any) {
        console.log("Failed to add chat to database ");
        throw new CustomError({
            message: error.message,
            status:402
        })        
    }

   
    
})