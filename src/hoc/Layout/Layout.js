import React from "react";
import classes from './Layout.css'
import Menu from '../../components/Navigation/Menu/Menu'
import Drawer from '../../components/Navigation/Drawer/Drawer'

export default class Layout extends React.Component {

    state = {
        isMenu: false
    }
    
    closeMenu = () => {
        this.setState ({
            isMenu : false
        })
    }

    onMenu = () => {
        this.setState ({
            isMenu : !this.state.isMenu
        })
    }

    render () {
        return (
            <div className={classes.Layout}>
                <Drawer
                    isOpen={this.state.isMenu}
                    isClose={this.closeMenu}
                />
                <Menu 
                    onToggle={this.onMenu}
                    isOpen={this.state.isMenu}
                />

                <main>
                    {this.props.children} 
                </main>
            </div>
        )
    }
}