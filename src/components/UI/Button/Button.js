import React from 'react';
import './Button.css'

const Button =  (props) => {
    const btnClass = [
        props.type,
        'Button'
        
    ]
    
    return (
        <button
            onClick={props.onClick}
            className={btnClass.join(" ")}
            disabled={props.disabled}
        >
            {props.children} 
        </button>
    )
}

export default Button;