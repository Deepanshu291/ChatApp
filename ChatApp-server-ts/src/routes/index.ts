import {Router} from 'express'
import { authRouter } from './auth.routes'
import { chatRouter } from './chat.routes'

export const router = Router()


router.use("/auth",authRouter)
router.use("/chat", chatRouter)
// router.route("/").get()