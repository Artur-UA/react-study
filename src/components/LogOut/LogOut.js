import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import {LogOut} from './../../redux/Action/actionAuth'

class Logout extends Component {
    componentDidMount(){ 
        this.props.logOut()
    }
    render(){ 
        return <Redirect to= {'/'}/>
    }
} 

function mapDispatchToProps(dispatch) {
    return{ 
        logOut: () => dispatch(LogOut())
    }
}

export default connect(null, mapDispatchToProps)(Logout)