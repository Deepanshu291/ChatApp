import express,{ Express, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from 'morgan';
import bodyParser from 'body-parser'
import cors, { CorsOptions } from 'cors'
import { errorHandler, notFound } from "./middlewares/error.middlewares";
import { router } from "./routes/index";
import { connectDB } from "./utils/database";
import http from 'http'
import {Server, Socket} from 'socket.io';
import { IUserModal } from "../@types/user.model";
import session from 'express-session'
import swaggerui from 'swagger-ui-express'
import { SwaggerSpecs } from "./utils/swaggerdoc";
import YAML from 'yamljs'


dotenv.config();
const app:Express = express();
connectDB()
const httpserver =  http.createServer(app)
const corsOptions:CorsOptions ={
   origin:'', 
   credentials:true,   
}


const swaggerDoc = YAML.load("swagger.yml")

app.use(express.json())
   .use(morgan("dev"))
   .use(bodyParser.json())
   .use(bodyParser.urlencoded({extended:true}))
   .use(session({
      secret:"yoursecret",
      saveUninitialized:true,
      resave:true,
   }))
   
app.use(cors(corsOptions))

app.use("/api",router)

app.use("/",swaggerui.serve, swaggerui.setup(swaggerDoc))
   
// app.get("/", (req: Request, res: Response) => {
//    req.session.save((e)=> {})
//   res.send("Server working build by TypeScript 🔥");
// });

app.use(notFound)
   .use(errorHandler)




const port =process.env.PORT || 5000;

httpserver.listen(port, () => console.log(`Server running on port ${port} 🔥`));
;


const io = new Server(httpserver,{
   cors:{
      origin:"*",
   }
})


//Socket connection

io.on('connection',(socket:Socket)=>{
   console.log('connected to socket.io....');
   
   socket.on('setup',(userId:string)=>{
      // console.log( "current user id"+userId);
      socket.join(userId)
      socket.emit("connected",userId)
      // console.log(socket.id);
      
   });

   socket.on('sendmsg',(data:{fromself:boolean,chat:string,receiver:IUserModal,sender:IUserModal })=>{
      // console.log(data.chat, data.receiver.username);
      // console.log(data.sender._id);
      socket.join(data.receiver._id)
      // console.log('its click');
      
      if (data.receiver._id) {
         // console.log(data.chat);
         socket.to(data.receiver._id).emit('msg-recive',data)
      }
   })

   socket.on('typing',(data :{userid:string,senderid:string})=> {
      socket.join(data.userid)
      // console.log("typing... "+data.userid);
      socket.in(data.userid).emit('typing',data.senderid)
   });
   socket.on('stop typing',(userid)=>socket.in(userid).emit('stop typing'))

   socket.off('setup',(userid:string)=>{
      console.log('User Disconnected');
      socket.leave(userid)
   })
});

export default app