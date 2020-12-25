import React, { useContext} from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from 'axios';

// Sources:
// https://uxdesign.cc/5-steps-to-create-a-simple-digital-coloring-book-in-react-3d4f5b2af822
// MERN Stack Tutorial with Auth (8 part series):
// https://www.youtube.com/watch?v=4_ZiJGY5F38

export default function ImageCard(props) {

    const {userData} = useContext(UserContext);
    let image = props.image
    const history = useHistory();

    const colorImage = async () => {
        // if a verified user is not logged in, the user is taken to the home page
        if(!userData.token){
            history.push("/")
            return
        }  
        let newImage = {imageId : image.id};
        console.log(newImage);
        
        // the image is added as a user image for that verified logged in user
        const response = await axios.post(
            "http://localhost:5000/user_images/add", 
            newImage,
            {headers: {"x-auth-token": userData.token}},
          );
          console.log(response);
      } 

    return(
         <div className="image-card">
                <button onClick={colorImage}>Color Me!</button>
        </div>
    )
    

}