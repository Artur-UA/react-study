import React from 'react';
import './Input.css'

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched  
}

const Input = (props) => {

    const inputType = props.type || 'text';
    const htmlFor = `${props.type}-${Math.random()}` 
    const className = ['Input']
    
    if(isInvalid(props)) { 
        className.push('problem')
    }
    return (
        <div className={className.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input 
                type={inputType}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
            />

            {
                isInvalid(props) ? <span>{props.errorMessage || 'Please enter data'}</span> : null 
            }
            
        </div>
    ) 
}

export default Input;