import React, { useState, useContext, useEffect, useCallback, Fragment } from "react";
import { useParams, useHistory } from 'react-router-dom';
import ColoredInImage from "./images/coloredInImage";
import ColorPalette from '../components/colorPalette'
import UserContext from "../context/UserContext";
import axios from 'axios';
import swal from 'sweetalert';
import PopoverPicker from "../components/PopoverPicker";

// Sources:
// https://uxdesign.cc/5-steps-to-create-a-simple-digital-coloring-book-in-react-3d4f5b2af822
// MERN Stack Tutorial with Auth (8 part series):
// https://www.youtube.com/watch?v=4_ZiJGY5F38

export default function ColoringPage() {

    // object id of the user image (different for each copy of the same image)
    let { id } = useParams();
    const [userImage, setUserImage] = useState({});
    const [color, setColor] = useState('#C53151');
    const [fetched, setFetched] = useState(false);
    const history = useHistory();

    const { userData } = useContext(UserContext);

    useEffect(() => {
        // getting user image object from database using the object id
        const fetchItems = async () => {
            if (!fetched) {
                const response = await axios.get(
                    `http://localhost:5000/user_images/${id}`,
                    { headers: { "x-auth-token": userData.token } },
                );
                // set the user image 
                setUserImage(response.data)
                console.log(response.data)
                setFetched(true)
            }
        }
        fetchItems();
    })

    // function that sets color in array at a specific path
    const onFillColor = async (i) => {
        let newFillColors = userImage.fill_colors.slice(0)
        // assigns color to path
        newFillColors[i] = color
        // assigns updated array to userImage 
        userImage.fill_colors = newFillColors

        // sets userImage object
        setUserImage({
            ...userImage
        })

        console.log(userImage)
        // posts updated userImage object to database by using post route
        try {
            const response = await axios.post(
                `http://localhost:5000/user_images/${id}`,
                userImage,
                { headers: { "x-auth-token": userData.token } },
            );
            console.log(response);
        } catch (err) {
            console.log("Unable to save");
        }
    }

    // function that calls delete route to delete specific user image for a specific verified user
    const deleteImage = (id) => {
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
            .then(async (toDelete) => {
                if (toDelete) {
                    // uses delete route to delete a specific user image from a specific verified user
                    await axios.delete(
                        `http://localhost:5000/user_images/${id}`,
                        { headers: { "x-auth-token": userData.token } },
                    )
                        .then(history.push("/imageGallery"))
                }
            })
    }

    // function that updates public value in userImage object in order to showcase image or unpublish
    const showcaseImage = async (id) => {
        userImage.public = userImage.public === true ? userImage.public = false : userImage.public = true
        // set userImage object
        setUserImage({
            ...userImage
        })
        // post user image with updated value of public
        try {
            const response = await axios.post(
                `http://localhost:5000/user_images/add/${id}`,
                userImage,
                { headers: { "x-auth-token": userData.token } },
            );
            console.log(response);
        } catch (err) {
            console.log("Unable to save");
        }
    }

    // function that resets all colors in fill colors array to white so that image turns blank
    const resetColors = async (id) => {
        let newFillColors = ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white"]
        userImage.fill_colors = newFillColors
        // set user image object
        setUserImage({
            ...userImage
        })
        // post user image with new updated value of fill_colors array
        try {
            const response = await axios.post(
                `http://localhost:5000/user_images/${id}`,
                userImage,
                { headers: { "x-auth-token": userData.token } },
            );
            console.log(response);
        } catch (err) {
            console.log("Unable to save");
        }
    }

    return (
              <Fragment >
            <div id="cursor">
            <div class="row" id="coloring-card">
                <div class="col-md-9 mb-3 mb-md-0">
                {/* ColoredInImage component is passed userImage values and onFillColor function*/}
                    <ColoredInImage size="large" key={userImage._id} component={userImage.component} onFill={onFillColor} fillColors={userImage.fill_colors} />
                </div>
                
                <div class="col-md-3 mb-3 mb-md-0">
                {/* ColorPalette component is passed color and setColor */}
                    <ColorPalette currentColor={color} changeColor={setColor} />
                {/* PopoverPicker component is passed color and setColor */}
                    <PopoverPicker currentColor={color} changeColor={setColor} />
                </div>
            </div>
            {/* Buttons */}
            <div class="btn-group flex-wrap" id="coloring">
                <button class="delete" onClick={() => deleteImage(userImage._id)}>Delete</button>
                <button class="reset" onClick={() => resetColors(userImage._id)}>Reset</button>
                <button onClick={() => showcaseImage(userImage._id)} class={userImage.public ? "showcasing" : "unpublished"}>{userImage.public ? "Showcasing" : "Unpublished"}</button>
                <button class="done" onClick={() => { history.push("/userGallery") }}>Done</button>
            </div>
            </div>
        </Fragment>
    )
}