import {Jwt, JwtPayload, sign, verify} from "jsonwebtoken"
import { CustomError } from "./error.helpers"

var secrect = process.env.JWT_SECRECT || "deepanshu"

export const genrateToken = function(data:any){
    console.log(secrect);
    
    return  sign({data}, process.env.JWT_SECRECT!,{
        expiresIn:"30d"
    })
}

export const verifyToken= (token:any)=>{
    // console.log(token);
    
    try {
        const res =  verify(token, process.env.JWT_SECRECT!) 
        console.log(res);
        return res
    } catch (error) {
        throw new CustomError({
            message:"Invalid token",
            status: 401
        })
    }
   
}