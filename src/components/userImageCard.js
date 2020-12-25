import React, { useState, useEffect, useContext, useRef } from "react";
import { useHistory } from "react-router-dom";

import UserContext from "../context/UserContext";
import axios from 'axios';
import swal from 'sweetalert';
import ColoredInImage from "./images/coloredInImage";
export default function UserImageCard(props) {
    const [image, setImage] = useState({});
    const { userData } = useContext(UserContext);
    const history = useHistory();
    // Sources:
    // https://medium.com/@beaucarnes/learn-the-mern-stack-by-building-an-exercise-tracker-mern-tutorial-59c13c1237a1
    // https://uxdesign.cc/5-steps-to-create-a-simple-digital-coloring-book-in-react-3d4f5b2af822
    // MERN Stack Tutorial with Auth (8 part series):
    // https://www.youtube.com/watch?v=4_ZiJGY5F38

    // image is set to userImage object passed in as props
    useEffect(() => {
        setImage(props.userImage)
    }, [props])

    // downloadImage function sends user to imageDownload page with user image object id 
    const downloadImage = () => {
        history.push(`/imageDownload/${image._id}`)
    }

    // function that calls delete route to delete specific user image for a specific verified user
    const deleteImage = async (id) => {
        if (!userData.token) {
            history.push("/")
            return
        }
        // message to confirm user image deletion
        swal({
            title: "Delete image?",
            text: "This cannot be reversed.",
            buttons: true
        })
        // uses delete route to delete a specific user image from a specific verified user
            .then(async (toDelete) => {
                if (toDelete) {
                    await axios.delete(
                        `http://localhost:5000/user_images/${id}`,
                        { headers: { "x-auth-token": userData.token } },
                    );
                }
            });
    }

    // function takes user to the coloring page for that user image (referenced by user image object id)
    const editImage = () => {
        history.push(`/coloringpage/${image._id}`)
    }

    // function that updates public value in userImage object in order to showcase image or unpublish
    const showcaseImage = async (id) => {
        image.public = image.public === true ? image.public = false : image.public = true
        // set userImage object
        setImage({
            ...image
        })
        // post user image with updated value of public
        try {
            const response = await axios.post(
                `http://localhost:5000/user_images/add/${id}`,
                image,
                { headers: { "x-auth-token": userData.token } },
            );
            console.log(response);
        } catch (err) {
            console.log("Unable to save");
        }
    }

    return (
        <div className="image-card">
            {image.component !== undefined ?
                <>
                {/* ColoredInImage component is passed userImage values and onFillColor function*/}
                    <ColoredInImage component={image.component} size={props.size} onFill={() => { }} fillColors={image.fill_colors} />
                    {/* Buttons */}
                    <div class="btn-group flex-wrap" id="user">
                        <button class="download" onClick={() => downloadImage()}>Download</button>
                        <button class="delete" onClick={() => deleteImage(image._id)}>Delete</button>
                        <button class="color-me" onClick={() => editImage()}>Edit</button>
                        <button onClick={() => showcaseImage(image._id)} class={image.public ? "showcasing" : "unpublished"}>{image.public ? "Showcasing" : "Unpublished"}</button>
                    </div>
                </>
                : <>Loading</>
            }
        </div>
    )
}