import React, {Component} from 'react';
import './Drawer.css'
import BackClick from '../../UI/BackClick/BackClick'
import {NavLink} from 'react-router-dom'

/* переехал в render
const links= [
        {to: '/', label: 'List question',exact: true},
        {to: '/auth', label: 'Authorization',exact: false},
        {to: '/quiz-creator', label: 'Create test',exact: false},
        {to: '/logout', label: 'LogOut', exact: false}
    ]*/

export default class Drawer extends Component {

    activeClick = () => {
        this.props.isClose()  //при вызове закрывает боковое меню 
    }

    renderLinks(links) { /*в рендере ее нужно обязательно вызвать*/
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

        const links = [
            {to: '/', label: 'List question',exact: true},
            
        ]

        if(this.props.isAuthenticated) { // если зареган, то будет открыта графа создания тестов и вылогинивания
            links.push({to: '/quiz-creator', label: 'Create test',exact: false})
            links.push({to: '/logout', label: 'LogOut', exact: false})
        } else{ //если не зареган, то будет поле регистарии 
            links.push({to: '/auth', label: 'Authorization',exact: false})
        }

        return(
            <>
                <nav 
                    className={drawerClass.join(' ')}
                >
                    <ul>
                        {this.renderLinks(links)} 
                    </ul>    
                </nav>
                {this.props.isOpen ? <BackClick onClick={this.props.isClose} /> : null}
            </> //this.props.isOpen  отвечает за затемение 
        )
    }
} 