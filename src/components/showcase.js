import React, { useState, useEffect, useContext, useRef } from "react";
import axios from 'axios';
import ShowcaseImageCard from '../components/showcaseImageCard';
import { useHistory } from "react-router-dom";
export default function UserGallery() {
    const [allImages, addAllImages] = useState([{}]);
    const history = useHistory();

// Sources:
// https://uxdesign.cc/5-steps-to-create-a-simple-digital-coloring-book-in-react-3d4f5b2af822
// MERN Stack Tutorial with Auth (8 part series):
// https://www.youtube.com/watch?v=4_ZiJGY5F38

    useEffect(() => {
        const fetchItems = async () => {
            // uses get route to get all of the user images for a specific user with a public value of true
            const response = await axios.get(
                "http://localhost:5000/user_images/"
            );
            addAllImages(response.data);
        }
        fetchItems();
    })

    return (
        <>
            <h1>Artworks Showcase</h1>
            <div class="image-gallery">
                {/* if there are no images to showcase, a message is displayed */}
                {allImages.length === 0 ?
                    <div class="btn-group" id="coloring">
                        <button class="color-me" onClick={() => history.push('/imageGallery')}>Start coloring now!</button>
                    </div>
                    :
                    <>
                        {/* ELse, loop through all of the showcase images and pass the image object is and the image into the ShowcaseImageCard component */}
                        {allImages.map((image, i) => {
                            return (
                                <ShowcaseImageCard size="small" id="my-image-card" key={image._id} userImage={image} />
                            )
                        })}
                    </>
                }
            </div>
        </>
    );
}