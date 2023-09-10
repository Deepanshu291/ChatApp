import { NextFunction, Request, Response } from "express"
import { CustomError } from "../utils/helpers/error.helpers"

export const notFound = (req:Request,res:Response,next:NextFunction)=>{
    // const err = new Error(`NOT FOUND ${req.originalUrl}`,)
    // res.status(404)
    const err =  new CustomError({
        message:`NOT FOUND ${req.originalUrl}`,
        status:404
    })
    next(err)
}

export const errorHandler = (err:Error, req:Request,res:Response,next:NextFunction)=>{
    const statusCode = res.statusCode ==200?500:res.statusCode
    res.status(statusCode).json({
        message:err.message,
        stack:process.env.NODE_ENV === "production"?null: err.stack,
        statusCode:statusCode
    })
}