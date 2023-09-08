import { Router } from "express";
import { getAllUser, loginUser, logoutUser, registerUser, searchUser, setAvatarPic } from "../controllers/userController";
import { auth } from "../middlewares/auth.middlewares";

 

 export const authRouter = Router()

 authRouter.route("/login").post(loginUser)
 authRouter.route("/register").post(registerUser)
 authRouter.route("/").get(auth,searchUser)
 authRouter.route("/alluser/:id").get(getAllUser)
 authRouter.route("/setpic/:id").post(setAvatarPic)
 authRouter.route("/logout/:id").get(logoutUser)