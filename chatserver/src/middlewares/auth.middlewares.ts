import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { verifyToken } from "../utils/helpers/jwt.helpers";
import { UserModel } from "../models/user.models";
import { CustomError } from "../utils/helpers/error.helpers";
import jwt from "jsonwebtoken";



export const auth = expressAsyncHandler(async (
    req:Request,
    res:Response,) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.replace('Bearer', '')
            // console.log(token);
            const decoded = jwt.verify(token,"deepanshu")
            console.log(jwt.decode(token));
            
            
            // const decoded = verifyToken(token)
            
            // console.log("its works");
            
            // const user = await UserModel.findById({
            //     _id:decoded.id
            // })
            
        } catch (error) {
            throw new CustomError({
                message:"Not authorized, token failed",
                status:401
            })
        }
    }

    // if (!token) {
    //     throw new CustomError({
    //         message:"Not authorized, token Failed!"
    //     })
    // }
})