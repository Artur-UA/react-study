import React, {Component} from 'react';
import './Drawer.css'
import BackClick from '../../UI/BackClick/BackClick'
import {NavLink} from 'react-router-dom'


export default class Drawer extends Component {

    activeClick = () => {
        this.props.isClose()  
    }

    renderLinks(links) { 
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

        if(!this.props.isOpen) {
            drawerClass.push(['close'])
        }  

        const links = [
            {to: '/', label: 'List question',exact: true},
            
        ]

        if(this.props.isAuthenticated) { 
            links.push({to: '/quiz-creator', label: 'Create test',exact: false})
            links.push({to: '/logout', label: 'LogOut', exact: false})
        } else{ 
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
            </> 
        )
    }
} 