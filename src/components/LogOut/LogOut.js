import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import {LogOut} from './../../redux/Action/actionAuth'

class Logout extends Component {
    componentDidMount(){ //жизненный цикл, когда загрузится дерево.
        this.props.logOut()
    }
    render(){ // Redirect перемещает с этой странице на друггую. в нашем случае на главную. типо вылогинились мы 
        return <Redirect to= {'/'}/>
    }
} 

function mapDispatchToProps(dispatch) {
    return{ 
        logOut: () => dispatch(LogOut())
    }
}

export default connect(null, mapDispatchToProps)(Logout)