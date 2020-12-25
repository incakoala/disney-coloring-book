import React, { useState, useEffect, useContext, useRef } from "react";
import UserContext from "../context/UserContext";
import { useHistory } from "react-router-dom";
import axios from 'axios';

// Sources:
// https://uxdesign.cc/5-steps-to-create-a-simple-digital-coloring-book-in-react-3d4f5b2af822
// MERN Stack Tutorial with Auth (8 part series):
// https://www.youtube.com/watch?v=4_ZiJGY5F38

export default function ImageGallery() {
    const [allImages, addImage] = useState([{}]);
    const { userData } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        // Uses get route to fetch all images frorm the database
        const fetchItems = async () => {
            const response = await axios.get(
                "http://localhost:5000/image/all",
            );
            addImage(response.data);
            console.log(allImages);
        }
        fetchItems();
    })

    const colorImage = async (image) => {
        // if user is not logged in the user is taken to the sign in page
        if (!userData.token) {
            history.push("/signIn")
            return
        }

        // if a verified user is logged in, create a new user image object with the object id of the image as the image id of the user image
        let newImage = { imageId: image._id, component: image.component };

        // post the new user image to the database
        const response = await axios.post(
            "http://localhost:5000/user_images/add",
            newImage,
            { headers: { "x-auth-token": userData.token } },
        );
        console.log(response.data._id)
        // user is taken to coloring page with the object 
        history.push(`/coloringpage/${response.data._id}`)
    }

    return (
        <>
            <h1>Choose an image to color!</h1>
            <div class="image-gallery">
                {/* Loops through all of the images in the database and displays all of them with a title */}
                {allImages.map((image, i) => {
                    return (
                        <>
                            <div class="image-card" id="gallery" onClick={() => colorImage(image)}>
                                <h4>{image.title}</h4>
                                {image.component !== undefined ?
                                    <>
                                        <img alt="disney" className="new-image" src={image.svg_url} />
                                       
                                    </>
                                    : <>Loading</>}
                            </div>
                        </>
                    )
                }
                )
                }
            </div>
        </>
    )
}
