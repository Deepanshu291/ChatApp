import { createContext, useContext, useState } from "react";
import { Childrens, IApiContextProps,  } from "../utils/types";
import axios from "axios";
import { apikey } from "../env";



const ApiContext = createContext<IApiContextProps | null>(null)

export const APIProvider = ({children}:Childrens) => {

    const api = `https://api.multiavatar.com`;
    const [images, setImages] = useState([])

    const getImage =async () => {
      setImages([])
        const data:any =[]
    for (let index = 0; index < 5; index++) {
      
      const img = await axios.get(
        `${api}/${Math.round(Math.random() * 1000)}.png?apikey=${apikey}`,
        {
          withCredentials: false,
        }
      );
      
      const image:  string = img.request["responseURL"];
      const final = image.split('?')[0]
      
        // console.log(final);
        data.push(final)
        // setImages([...images,final])
    } 
    setImages(data)
        }
 const context ={
        getImage,
        images,
    }

  return (
    <ApiContext.Provider value={context} >
        {children}
    </ApiContext.Provider>
  )

}

export default function useAPI(){
    const contextvalue = useContext(ApiContext)
    
    if (!contextvalue) {
      throw new Error("useauth used outside of provider");
    }
    return contextvalue
} 
