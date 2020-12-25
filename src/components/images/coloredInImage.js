import React, {useState, useEffect} from "react";
import Stitch from "../images/stitch.js";
import Ariel from "../images/ariel.js";
import R2D2 from "../images/r2d2.js";
import Cheshire from "../images/cheshireCat.js";
import Yoda from "../images/yoda.js";
import Minnie from "../images/minnie";
import Olaf from "../images/olaf";
import Mandala from "../images/mandala";
import Pooh from "../images/pooh.js";
import Alien from "./alien.js";
import Belle from "./belle.js";
import Alice from "./alice.js";
import Dumbo from "./dumbo.js";

export default function ColoredInImage(props) {
    const[image, setImage] = useState({});

    // sets image to user image passed in as props
    useEffect(() => {
        setImage(props)
        console.log(image)
    }, [props])

return(
        <>
        {/* Conditional that checks component of user image and passes user image props in corresponding svg component */}
            {image.component === "stitch" ? <Stitch size={image.size} onFill={image.onFill} fillColors={image.fillColors} /> :
            image.component === "ariel" ? <Ariel size={image.size} onFill={image.onFill} fillColors={image.fillColors} /> :
            image.component === "r2d2" ? <R2D2 size={image.size} onFill={image.onFill} fillColors={image.fillColors} /> :
            image.component === "cheshire" ? <Cheshire size={image.size} onFill={image.onFill} fillColors={image.fillColors} /> :
            image.component === "yoda" ? <Yoda onFill={image.onFill} fillColors={image.fillColors} /> :
            image.component === "minnie" ? <Minnie size={image.size} onFill={image.onFill} fillColors={image.fillColors} /> :
            image.component === "olaf" ? <Olaf size={props.size} onFill={image.onFill} fillColors={image.fillColors} /> :
            image.component === "mandala" ? <Mandala size={image.size} onFill={image.onFill} fillColors={image.fillColors} /> :
            image.component === "pooh" ? <Pooh size={props.size} onFill={image.onFill} fillColors={image.fillColors} /> :
            image.component === "belle" ? <Belle size={props.size} onFill={image.onFill} fillColors={image.fillColors} /> :
            image.component === "alien" ? <Alien size={props.size} onFill={image.onFill} fillColors={image.fillColors} /> :
            image.component === "alice" ? <Alice size={props.size} onFill={image.onFill} fillColors={image.fillColors} /> :
            image.component === "dumbo" ? <Dumbo size={props.size} onFill={image.onFill} fillColors={image.fillColors} /> :
            <>Not Available</> }       
        </>
    )
}
