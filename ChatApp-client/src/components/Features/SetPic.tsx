import { useEffect, useState } from "react";
import useAuth from "../../contexts/Authcontext";
import { Loader } from "../../utils/common";
import useAPI from "../../contexts/APiContext";


export const SetPic = () => {


  const [selectedAvatar, setSelectedAvatar] = useState(0);

  const {setAvatar} = useAuth()
  const {getImage, images} = useAPI()

  

  const setProfilePic =async () => {
    
      setAvatar!(images[selectedAvatar])
  }


  useEffect(() => {
    // generateImg()
    getImage()
  },[])

  console.log(images.length);
  
  
  

  return (
    <>
      {images.length ==0? (
        <Loader/>
      ) : (
        <div className="main-container">
          <div className="title-container">
            {/* <h1 id="htag">AVAtar</h1> */}
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {images.map((img, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={img}
                    alt="avatar"
                    key={img}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
            
          </div>
          <div className="flexbox  ">
            <button className="submit-btn " onClick={setProfilePic}>
            Set as Profile Picture
          </button>

          <button className="submit-btn text-xl capitalize   "onClick={getImage}>
              <i className="ri-refresh-line" ></i> Loadmore more Avatars
            </button>
          </div>
          
        </div>
      )}
    </>
  );
}
