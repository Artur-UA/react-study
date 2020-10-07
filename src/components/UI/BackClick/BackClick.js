import React from "react";
import './BackClick.css'

const BackClick = (props) => {

    return(
        <div
            className="BackClick"
            onClick={props.onClick}
        >

        </div>
    )
}

export default BackClick;