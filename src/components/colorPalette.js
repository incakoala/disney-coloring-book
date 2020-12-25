import React from "react";
// import { PopoverPicker } from "../components/PopoverPicker";

// Sources:
// https://uxdesign.cc/5-steps-to-create-a-simple-digital-coloring-book-in-react-3d4f5b2af822
// MERN Stack Tutorial with Auth (8 part series):
// https://www.youtube.com/watch?v=4_ZiJGY5F38

export default function ColorPalette(props) {

    const colors = ['#C53151', '#FF355E', '#FF00CC', '#FF6037', '#FFAE42', '#FFFF66', '#93DFB8', '#66FF66', '#319177', '#00CCCC', '#59baff', '#00468C', '#652DC1', '#FFCBA4', '#C8C8CD', '#4a1200', '#ffffff', '#000000']

    return (
        <div className="color-palette">
            {colors.map(color => {
                // looping through all of the colors and highlights a color in palette if selected 
                const activeClass = props.currentColor === color ?
                    'color-swatch-active' :
                    '';
                return (
                    // color is changed 
                    <div onClick={() => { props.changeColor(color) }}>
                        <div className={`color-swatch ${activeClass}`} style={{ backgroundColor: color }}></div>
                    </div>
                )
            })}
         
        </div>
    )
}
