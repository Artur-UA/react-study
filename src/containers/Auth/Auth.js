import React, {Component} from 'react';
import './Auth.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
//import axios from 'axios'
import {connect} from 'react-redux'
import authReducer from './../../redux/Action/actionAuth'

function validateEmail(email) {  
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class Auth extends Component {

    state = {
        isFormVal: false, 
        formControls: {
            email: {
                value: '', 
                type: 'email',
                label: 'Email',
                errorMessage: 'Enter correct email', 
                valid: false, 
                touched: false, 
                validation: {
                    required: true, 
                    email: true
                }
            },
            password: {
                value: '', 
                type: 'password',
                label: 'Password',
                errorMessage: 'Enter correct password', 
                valid: false, 
                touched: false, 
                validation: {
                    required: true, 
                    minLength: 6
                }
            }
        }
    }

    logIn = () => { 

        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        )

    }


    registration = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        )
    }



    onSubmit = (event) => { 
        event.preventDefault()
    }

    validateControl(value, validation) {
        if(!validation){ 
            return true
        }

        let isValid = true 

        if (validation.required) { 
            isValid = value.trim() !== '' && isValid 
        }

        if (validation.email) { 
            isValid = validateEmail(value) && isValid 
        }

        if (validation.minLength) { 
            isValid = value.length >= validation.minLength && isValid; 
        }


        return isValid;
    }

    onChange = (event, controlName) => {

        const formControls = {...this.state.formControls} 
        const control = {...formControls[controlName]} 
        
        control.value = event.target.value; 
        control.touched = true; 
        
        control.valid = this.validateControl(control.value, control.validation); 
        
        formControls[controlName] = control; 
        
        let isFormVal = true;

        Object.keys(formControls).forEach(name => {
            isFormVal = formControls[name].valid && isFormVal
        }) 

        this.setState({
            formControls, isFormVal
        })

    }

    renderInputs() { //
        const inputs = Object.keys(this.state.formControls).map((controlName, index) => { 
            const controls = this.state.formControls[controlName] 
            return (
                <Input
                    key = {controlName + index} 
                    type = {controls.type}  
                    value = {controls.value}
                    label = {controls.label}
                    valid = {controls.valid}
                    touched = {controls.touched}
                    shouldValidate = {!!controls.validation}  
                    errorMessage = {controls.errorMessage}
                    onChange = {event => this.onChange(event, controlName)} 
                />
            )
        })
        return inputs
    }

    render() {
        return (
            <div className="Auth">
                <div>
                    <h1>Authorization</h1>
                    <form onSubmit={this.onSubmit} className='AuthForm'>
                        
                        {this.renderInputs()} 
                        
                        <Button 
                        type='success' 
                        onClick={this.logIn}
                        disabled={!this.state.isFormVal}
                        >
                            Check
                        </Button>

                        <Button 
                        type='primary' 
                        onClick={this.registration}
                        disabled={!this.state.isFormVal}
                        >
                            Registration
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}


function mapDispatchToProps(dispatch){
    return{
        auth: (email, password, isLogin) => dispatch (authReducer(email, password, isLogin))
    }
}
export default connect (null, mapDispatchToProps)(Auth)