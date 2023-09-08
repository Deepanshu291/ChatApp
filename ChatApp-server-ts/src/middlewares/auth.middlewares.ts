import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { verifyToken } from "../utils/helpers/jwt.helpers";
import { UserModel } from "../models/user.models";
import { CustomError } from "../utils/helpers/error.helpers";
import { verify } from "jsonwebtoken";



export const auth = expressAsyncHandler(async (
    req:Request,
    _:Response,) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.replace('Bearer', '')
            // console.log(token);
            
            const decoded = verifyToken(token)
            
            console.log(decoded);
            
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