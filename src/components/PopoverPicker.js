import React, { useCallback, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import "react-colorful/dist/index.css";
import { Popover} from 'reactstrap';

// Sources:
// https://react-bootstrap.github.io/components/overlays/
// https://reactstrap.github.io/components/popovers/
// https://medium.com/@tariqul.islam.rony/color-picker-by-react-js-and-react-color-775aab6bd7e9
// https://medium.com/@spenceraford/react-custom-color-picker-with-react-color-64a6855b6bba
// https://codesandbox.io/s/react-hooks-color-picker-6n8z0
// https://www.pluralsight.com/guides/how-to-use-react-bootstrap's-popover
// https://www.npmjs.com/package/react-colorful

export default function PopoverPicker(props) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);

  return (
    // when clicked,the popoverOpen is set to true and the color picker opens 
    <div className="color-palette2">
      <div
        className="picker"
        style={{ backgroundColor: props.currentColor }}
        id="Popover1"
        onClick={() => toggle(true)}
      />

      {popoverOpen && (
        // Popover modal is created with nested color picker
        <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
          {/* The color and setColor function are passed in */}
          <HexColorPicker color={props.currentColor} onChange={props.changeColor} />
        </Popover>
      )}
    </div>
  );
};
