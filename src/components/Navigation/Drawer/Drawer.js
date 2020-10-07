import React, {Component} from 'react';
import './Drawer.css'
import BackClick from '../../UI/BackClick/BackClick'
import {NavLink} from 'react-router-dom'

const links= [
        {to: '/', label: 'List question',exact: true},
        {to: '/auth', label: 'Authorization',exact: false},
        {to: '/quiz-creator', label: 'Create test',exact: false}
    ]

export default class Drawer extends Component {

    activeClick = () => {
        this.props.isClose()  //при вызове закрывает боковое меню 
    }

    renderLinks() { /*в рендере ее нужно обязательно вызвать*/
        return links.map((linkss, index) => { 
            return(
                <li key={index}>
                    <NavLink 
                        to={linkss.to}
                        exact={linkss.exact}
                        onClick={this.activeClick}
                    >
                        {linkss.label}
                    </NavLink>
                </li>
            )
        })
    }

    render() {

        const drawerClass=['Drawer']

        if(!this.props.isOpen) {//если закрыто
            drawerClass.push(['close'])
        }  

        return(
            <>
                <nav 
                    className={drawerClass.join(' ')}
                >
                    <ul>
                        {this.renderLinks()} 
                    </ul>    
                </nav>
                {this.props.isOpen ? <BackClick onClick={this.props.isClose} /> : null}
            </> //this.props.isOpen  отвечает за затемение 
        )
    }
} 