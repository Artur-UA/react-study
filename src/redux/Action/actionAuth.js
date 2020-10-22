import {AUTH_SUCCESS, AUTH_LOGOUT} from './actionTypes'

import axios from 'axios'

export default function authReducer(email, password, isLogin){
    return async (dispatch) => {  
    const authData = { 
            email,
            password,
            returnSecureToken: true
        }
    
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCPdBP_o_9fuMwHDSVygCzo_6GH7x6CeAA'

    if(isLogin) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCPdBP_o_9fuMwHDSVygCzo_6GH7x6CeAA' 
    }
    
    const responseAuth = await axios.post(url, authData)
    
    //console.log(responseAuth.data)

    const data = responseAuth.data 
    
    const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000 ) 

    localStorage.setItem('token', data.idToken)
    localStorage.setItem('userId', data.localId)
    localStorage.setItem('time', expirationDate) 

    dispatch(authSuccess(data.idToken)) 
    dispatch(autoLogOut(data.expiresIn))
    }
}

export function authSuccess(token){  
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export function autoLogOut(time) { 
    return dispatch => {  
        setTimeout(() => { 
            dispatch(LogOut())  
        }, time * 1000)
    }
}

export function autoLogin(){ 
    return dispatch => {
        const token = localStorage.getItem('token') 
        if (!token){
            dispatch(LogOut())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            
            if (expirationDate <= new Date()) { 
                dispatch(LogOut())
            } else { 
                dispatch(authSuccess(token)) 
                dispatch(autoLogOut((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}

export function LogOut() {

    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('time') 

    return{
        type: AUTH_LOGOUT
    }
}