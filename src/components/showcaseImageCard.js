import React, { useState, useEffect } from "react";
import ColoredInImage from "./images/coloredInImage";
export default function ShowcaseImageCard(props) {
  const [image, setImage] = useState({});

// Sources:
// https://uxdesign.cc/5-steps-to-create-a-simple-digital-coloring-book-in-react-3d4f5b2af822
// MERN Stack Tutorial with Auth (8 part series):
// https://www.youtube.com/watch?v=4_ZiJGY5F38


  // image is set to userImage object passed in as props
  useEffect(() => {
    setImage(props.userImage)
  }, [props])

  return (
    <div className="image-card">
      {/* If the component is not undefined, pass the component, size, and fill_colors array into the ColoredInImage component */}
      {image.component !== undefined ?
        <ColoredInImage component={image.component} size={props.size} onFill={() => { }} fillColors={image.fill_colors} />
        : <>Loading</>
      }
    </div>
  )
}