import {AUTH_SUCCESS, AUTH_LOGOUT} from './actionTypes'

import axios from 'axios'

export default function authReducer(email, password, isLogin){
    return async (dispatch) => {  // асинхронный dispatch(потому что будем делать запрос к серверу)
    const authData = { //объект который передаем
            email,
            password,
            returnSecureToken: true
        }
    
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCPdBP_o_9fuMwHDSVygCzo_6GH7x6CeAA' //для регистрации 

    if(isLogin) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCPdBP_o_9fuMwHDSVygCzo_6GH7x6CeAA' //если уже зарегались 
    }
    
    const responseAuth = await axios.post(url, authData)//запрос по некоторому url(или вход или регистрация) с нужными параметрами 
    
    console.log(responseAuth.data)//приходят параметры. нас интересуют idToken(позволяет держать сессию), localId (для определения пользователя), expiresIn(определяет  когда будет заканчиватся сессия)

    const data = responseAuth.data // для удобства 
    //для поддержки сессии в react приложениях нужно idToken который мы получили от сервера положить в localleStorage
    
    const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000 )//время до которого  сессия будет активна(определяем время сейчас( в момент реестрации) к нему добавляем время из данных которые пришли(в нашем случчае 3600 что равняется одному часу))

    localStorage.setItem('token', data.idToken)
    localStorage.setItem('userId', data.localId)
    localStorage.setItem('time', expirationDate) //данные которые пойдут в local storage

    dispatch(authSuccess(data.idToken)) //запуск функции на проверку токена
    dispatch(autoLogOut(data.expiresIn))//запуск функции на проверку времени
    }
}

export function authSuccess(token){  // token это data.idToken
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export function autoLogOut(time) { //time это data.expiresIn
    return dispatch => {  // запускаем функцию setTimeout 
        setTimeout(() => { 
            dispatch(LogOut()) //которая через время которое заложено в time ((3600 секунд) умножаем на 1000 потому что тут милисекунды)  запустит функцию LogOut 
        }, time * 1000)
    }
}

export function autoLogin(){
    
}

export function LogOut() {

    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('time') //данные которые пойдут в local storage

    return{
        type: AUTH_LOGOUT
    }
}