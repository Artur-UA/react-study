import React from 'react';
import './Menu.css'



const Menu = (props) => {

    const classes = [
        'Menu',
        'fa'
    ]

    if(props.isOpen) {
        classes.push('fa-times')//добавим два класса
        classes.push('open')
    } else {
        classes.push('fa-bars')
    }

    return (
        <i 
            className={classes.join(' ')}
            onClick={props.onToggle}
        />
    )
}

export default Menu;