import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from 'react-router-dom';
import ColoredInImage from "./images/coloredInImage";
import UserContext from "../context/UserContext";
import axios from 'axios';
import { saveSvgAsPng } from 'save-svg-as-png';
import swal from 'sweetalert';

// Sources:
// https://uxdesign.cc/5-steps-to-create-a-simple-digital-coloring-book-in-react-3d4f5b2af822
// MERN Stack Tutorial with Auth (8 part series):
// https://www.youtube.com/watch?v=4_ZiJGY5F38

export default function ImageDownload(props) {
  let { id } = useParams();
  const [userImage, setUserImage] = useState({});
  const { userData } = useContext(UserContext);
  const [fetched, setFetched] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // function uses get route to get a specific user image for a user
    const fetchItems = async () => {
      if (!fetched) {
        const response = await axios.get(
          `http://localhost:5000/user_images/${id}`,
          { headers: { "x-auth-token": userData.token } },
        );
        setUserImage(response.data)
        setFetched(true)
      }
    }
    fetchItems();
  })

  // function that downloads image as png
  const saveImage = () => {
    swal({
      title: "Download image as PNG?",
      buttons: true
    })
      .then((toDownload) => {
        if (toDownload) {
          saveSvgAsPng(document.getElementById("Layer_1"), `${userImage.component}.png`);
        }
        history.push("/userGallery")
      });
  }

  return (
    <>
      <ColoredInImage size="large" key={userImage._id} component={userImage.component} fillColors={userImage.fill_colors} />
      {/* saveImage function is called */}
      {saveImage()}
    </>
  )
}