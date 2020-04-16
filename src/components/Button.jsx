import React from "react";

import "./Button.css";

export default (props) => {
  return (
    <button
      onClick={props.click && props.click}
      className={`
            button
            ${props.operation ? "button--operation" : ""}
            ${props.double ? "button--double" : ""}
            ${props.triple ? "button--triple" : ""}
        `}
    >
      {props.label}
    </button>
  );
};
