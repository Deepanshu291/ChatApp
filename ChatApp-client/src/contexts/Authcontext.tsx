import { createContext, useContext,  useRef, useState } from "react";
import { Childrens, IAuthContextProps, IUser,  } from "../utils/types";
import {   useNavigate } from "react-router-dom";
import { Theme, ToastPosition, toast } from "react-toastify";
import { api } from "../utils/common";
import { AxiosResponse } from "axios";
import { Socket,} from "socket.io-client";


const AuthContext = createContext<IAuthContextProps | null>(null)


export const AuthProvider = ({children}:Childrens) => {
  const [loading, setloading] = useState(true);
  const [users, setUsers] = useState<IUser[]>([]);
  const [currentuser, setCurrentuser] = useState<IUser | undefined>(undefined)
  // console.log(currentuser);
  
  const socket = useRef<Socket>();
  const navigate = useNavigate()
  const baseurl = "/api/auth";
  

  
  
  
  


  const registeruser = async (username:string ,email:string,password:string)=>{
    setloading(true)
         await api.post(baseurl+'/register',{
            username:username,
            email:email,
            password:password
         }).then(async (res) => {
                if (res.status == 201) {
                    console.log(res.data)
                    navigate("/login",{replace:true})
                    setloading(false)
                    // <Navigate to={'/login'} replace={true} />
                }
         })
  }

  const loginuser = async (
    email: string,
    password: string
  ) => {
    setloading(true)
    await api
      .post(baseurl+"/login", {
        email: email,
        password: password,
      })
      .then(async (res) => {
        if (res.status == 200) {
          await localStorage.setItem('access-token',res.data['token']);
          await localStorage.setItem('userid',res.data['_id'])
          await localStorage.setItem('currentuser',JSON.stringify(res.data))
          setCurrentuser(res.data)
          // console.log(res.data);
          if (!res.data["isAvatar"]) {
            console.log("its true");
            navigate('/setpic',{replace:true})
          }else{
            navigate('/',{replace:true})
          }
          setloading(false)
        //   <Navigate to={"/"} replace={true} />
        }
      });
  };

  const setAvatar =async (pic:string) => {
    const userid = localStorage.getItem('userid')
    console.log(userid);
    setloading(true)
    if (!userid) {
      toast.error('Session Expries')
      navigate("/",{replace:true})
    }
    await api.post(baseurl+"/setpic/"+userid,{
      image:pic
    }).then(async (res:AxiosResponse<any,any>) => {
      if (res.status  == 200) {
          await localStorage.setItem("currentuser", JSON.stringify(res.data.user));
          setCurrentuser(res.data.user)
          navigate('/',{replace:true})
          setloading(false)
      }
    }) 
  }

   const allUser = async () => {
    setloading(true)
     const userid = localStorage.getItem("userid");
    //  console.log(userid);

     if (!userid) {
       toast.error("Session Expries");
       navigate("/", { replace: true });
     }
     await api
       .get(baseurl + "/alluser/" + userid, )
       .then(async (res: AxiosResponse<any, any>) => {
         if (res.status == 200) {
          setUsers(res.data)
           navigate("/", { replace: true });
           setloading(false)
         }
       });
   };

  const logout =async () => {
    await api.get(baseurl +"/logout/"+ currentuser?._id)
    localStorage.removeItem('access-token')
    localStorage.clear()
    location.reload()
  }



 

  const handleValidation = (value:IUser)=>{
     const toastOptions = {
       position: "bottom-right" as ToastPosition,
       autoClose: 8000,
       pauseOnHover: true,
       draggable: true,
       theme: "dark" as Theme,
     };
        const {username, email, password} = value

        if (username!.length < 3) {
          toast.error(
            "Username should be greater than 3 characters.",
            toastOptions
          );
          return false;
        } else if (password!.length < 8) {
          toast.error(
            "Password should be equal or greater than 8 characters.",
            toastOptions
          );
          return false;
        } else if (email === "") {
          toast.error("Email is required.", toastOptions);
          return false;
        }

        return true
  }

  const currentuserdata = localStorage.getItem("currentuser");
  if (currentuserdata !== null) {
    // console.log("its call");
    if (currentuser == null) {
      setCurrentuser(JSON.parse(currentuserdata))
    }
    
    // setCurrentuser!(JSON.parse(currentuserdata));
  }

   const token = localStorage.getItem("access-token");

  const context ={
    users,
    currentuser,
    registeruser,
    token,
    loginuser,
    logout,
    setAvatar,
    handleValidation,
    allUser,
    loading,
    socket
  }
  
    return (
    <AuthContext.Provider value={context}>
        {children}
    </AuthContext.Provider>
  )
}

export default function useAuth(){
    const authContextvalue = useContext(AuthContext)

    if (!authContextvalue) {
        throw new Error('useauth used outside of provider')
    }

    return authContextvalue
}