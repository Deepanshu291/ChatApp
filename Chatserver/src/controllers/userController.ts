import expressAsyncHandler  from "express-async-handler" ; 
import { UserModel } from "../models/user.models";
import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/helpers/error.helpers";
import { genrateToken } from "../utils/helpers/jwt.helpers";
import { IUser, IUserModal } from "../../@types/user.model";


export const registerUser = expressAsyncHandler(async (req:Request<IUser>,res:Response,next:NextFunction)=>{
    const {username,email,password}:IUser = req.body

    if (!username || !email || !password) {
        res.status(400)
        throw new CustomError({message:"Please Enter all the field",status:401 })
    }
    const userExits = await UserModel.findOne({email})

    if(userExits){
        throw new CustomError({
            message:"User already Exits",
            status:400
        })
    }

    const user = await UserModel.create({
        username,email,password
    })

    if (user) {
        res.status(201).json({
            username:user.username,
            email:user.email,
            AvatarPic:user.AvatarPic,
            isAvatar:user.isAvatar,
            token: genrateToken(user._id)
        })
    }else{
        throw new CustomError({
            message:"Failed to Create to User",
            status:400
        })
    }
})  

export const loginUser = expressAsyncHandler(
    async(
    req:Request<IUser>,
    res:Response,
    next:NextFunction)=>{
        const {email, password}:IUser = req.body
        
        const user:IUserModal | null = await UserModel.findOneAndUpdate({email},{
            isLogin:true
        })
       
        if (user && (await user.matchPassword(password!))) {
            res.json({
                _id:user._id,
                username:user.username,
                email:user.email,
                AvatarPic:user.AvatarPic,
                isLogin:user.isLogin,
                isAvatar:user.isAvatar,
                token:genrateToken(user._id)
            })
        }else{
            throw new CustomError({
                message:"Invalid Email or Password"
            })
        }
})

export const logoutUser = expressAsyncHandler(async (req:Request,res:Response,next:NextFunction) => {
    try {
        const id = req.params.id
        console.log(req.params.id);
        
        // if(!req.params.id){
            const user = await UserModel.findByIdAndUpdate(id,{isLogin:false}).select("-password")
            res.json(user)
        // }
    } catch (error) {
        next(error)
    }
    
})

export const searchUser = expressAsyncHandler(async (req:Request, res:Response,next:NextFunction) => {
    
 
    const  keyword = req.query.search?{
        $or:[
            {username:{$regex: req.query.search, $options:"i"}},
            {email:{$regex: req.query.search, $options:"i"}},
        ]
    }:{}
    
    const users = await UserModel.find(keyword) 

    res.send(users)
    // next()
})

export const getAllUser = expressAsyncHandler(async (req:Request, res:Response,next:NextFunction) => {
    // console.log(req.params);

    const  keyword:string = req.params.id
    
    const users = await UserModel.find({
        _id:{
            $ne:keyword
        }
    }).select("-password") 

    res.json(users)
    // next()
})

export const setAvatarPic = expressAsyncHandler(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const id = req.params.id
    const img:string = req.body.image
    const updateobj = {
        isAvatar:true,
        AvatarPic:img
    } 
    const user:IUser = await UserModel.findByIdAndUpdate(id,updateobj,{
        new:true,
    }).select('-password') as IUser
    console.log(user);
    res.json({
        isSet:user!.isAvatar,
        image:user!.AvatarPic,
        user:user,
    }) 
    } catch (error) {
        next(error)
    }

})

// export const logoutUser = expressAsyncHandler(async (req:Request, res:Response,next:NextFunction) => {
   

    
// })