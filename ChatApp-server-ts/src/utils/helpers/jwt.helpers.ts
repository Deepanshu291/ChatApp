import {Jwt, JwtPayload, sign, verify} from "jsonwebtoken"
import { CustomError } from "./error.helpers"

var secrect = process.env.JWT_SECRECT || "deepanshu"

export const genrateToken = function(id:any){
    return  sign({id}, process.env.JWT_SECRECT!,{
        expiresIn:"30d"
    })
}

export const verifyToken= (token:any):Jwt & JwtPayload=>{
    console.log(token);
    
    try {
        const res =  verify(token, process.env.JWT_SECRECT!) as Jwt & JwtPayload || "null"
        console.log(res.header);
        return res
    } catch (error) {
        throw new CustomError({
            message:"Invalid token",
            status: 401
        })
    }
   
}