import React, { useState, useEffect, useContext, useRef } from "react";
import UserContext from "../context/UserContext";
import { useHistory } from "react-router-dom";
import axios from 'axios';
//import ImageCard from '../components/imageCard';
import UserImageCard from '../components/userImageCard';
// import { all } from "../../backend/routes/image";

// Sources:
// https://uxdesign.cc/5-steps-to-create-a-simple-digital-coloring-book-in-react-3d4f5b2af822
// MERN Stack Tutorial with Auth (8 part series):
// https://www.youtube.com/watch?v=4_ZiJGY5F38


export default function UserGallery() {
    const [allImages, addImage] = useState([{}]);
    const { userData } = useContext(UserContext);
    const history = useHistory();

    // Uses get route to fetch all of the user images for a specific logged in user
    useEffect(() => {
        const fetchItems = async () => {
            const response = await axios.get(
                "http://localhost:5000/user_images/all",
                { headers: { "x-auth-token": userData.token } },
            );
            addImage(response.data);
        }
        fetchItems();
    })

    return (
        <>
            {/* If a user is logged in, the user's name is displayed */}
            {userData.user !== undefined ?
                <>
                    <h1>{userData.user.username}'s Gallery</h1>
                    <div class="image-gallery">
                        {/* If there are no user images for that specific logged in user, a message is displayed */}
                        {allImages.length === 0 ?
                            <div class="btn-group" id="coloring">
                                <button class="color-me" onClick={() => history.push('/imageGallery')}>Start coloring now!</button>
                            </div>
                            :
                            <>
                            {/* Loop through all user images for that specific logged in user and the image is passed into the UserImageCard component */}
                                {allImages.map((image, i) => {
                                    return (
                                        <UserImageCard size="small" userImage={image} />
                                    )
                                })}
                            </>
                        }
                    </div>
                </>
                : "loading"}

        </>
    );
}
