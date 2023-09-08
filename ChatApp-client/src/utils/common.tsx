import axios from "axios";

import loader from "../assets/loader.gif";
import typinganimation from "../assets/typing.gif"
import chattyping from "../assets/chattyping.json";
import { Options } from "react-lottie";


// const url = "https://chat-app-server-ts.vercel.app";
// const url = "http://127.0.0.1:5000/";
const url = "https://chatone-server-ts.vercel.app/";

export const api = axios.create({
      baseURL: url,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    });


export const Loader = ()=>{
  return (
    <div className="main-container">
      <img src={loader} alt="loader" />
    </div>
  );
}

export const TypingLoader = () =>{
  return(
    <div className="h-11">
      <img src={typinganimation} alt="typing"  />
    </div>
  );
}

export  const chattypingOptions: Options = {
  animationData: chattyping,
  autoplay: true,
  loop: true,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};


