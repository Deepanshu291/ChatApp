import { Router } from "express";
import { addMessage, getMessage } from "../controllers/chatController";



export const chatRouter = Router()


chatRouter.route("/addmsg").post(addMessage)
chatRouter.route("/getmsg").post(getMessage)