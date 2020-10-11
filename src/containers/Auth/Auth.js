import React, {Component} from 'react';
import './Auth.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import axios from 'axios'

function validateEmail(email) {  //обычная функция для проверли емайл. всята в гугл по запросу (email javascript regex)
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default class Auth extends Component {

    state = {
        isFormVal: false, 
        formControls: {//объект в котором опишем параметри, которые отправим потом в компонент input 
            email: {
                value: '', //значение изначально пустое
                type: 'email',//тип инпута
                label: 'Email',//Лейбл
                errorMessage: 'Enter correct email', //сообщение ошибки
                valid: false, //состояние валидации данного контроля. тоесть включает ошибку в случае false 
                touched: false, //но чтобы она сразу не включала ошибку, так как некрасиво. поэтому если touched false, то не бдует гореть ошибка, но как только будет попытка отправить пустое, touched сразу изменися на true и тогда будет ошибка 
                validation: {//указываем тут правило, по которому будем валидировать контрол
                    required: true, //требование чтобы обьязательно ввели этот контрол 
                    email: true// что должен быть email 
                }
            },
            password: {
                value: '', //значение изначально пустое
                type: 'password',//тип инпута
                label: 'Password',//Лейбл
                errorMessage: 'Enter correct password', //сообщение ошибки
                valid: false, //состояние валидации данного контроля. тоесть включает ошибку в случае false 
                touched: false, //но чтобы она сразу не включала ошибку, так как некрасиво. поэтому если touched false, то не бдует гореть ошибка, но как только будет попытка отправить пустое, touched сразу изменися на true и тогда будет ошибка 
                validation: {//указываем тут правило, по которому будем валидировать контрол
                    required: true, //требование чтобы обьязательно ввели этот контрол 
                    minLength: 6// минимум должен ввести 6 символов 
                }
            }
        }
    }

    logIn = async () => { //функция входа

        const authData = { //объект который передаем
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }

        try {//куда передаем, находим это на сайте firebase  || во второй части передаем что именно отправим
        
            const responseAuth = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCPdBP_o_9fuMwHDSVygCzo_6GH7x6CeAA', authData)
            
            console.log(responseAuth.data)
        }
        catch (e) {
            console.log(e)
        }
    }

    registration = async () => { //функция регистрации

        const authData = { //объект который передаем
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }

        try {//куда передаем, находим это на сайте firebase  || во второй части передаем что именно отправим
        
            const responseAuth = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCPdBP_o_9fuMwHDSVygCzo_6GH7x6CeAA', authData)
            
            console.log(responseAuth.data)
        }
        catch (e) {
            console.log(e)
        }
    }

    onSubmit = (event) => { //чтобы не отправляло 
        event.preventDefault()
    }

    validateControl(value, validation) {
        if(!validation){ //если не передан объект параметров к валидации, значит валидировать не нужно 
            return true
        }

        let isValid = true // создали новую переменнную которую впоследствии вернем 

        if (validation.required) { //если в условиях валидации есть required то будет проверка 
            isValid = value.trim() !== '' && isValid// value строка и мы уберем все пробелы (value.trim) b если она не будет равна пустой строке то будет тру \ если до этого не была переменная изменена на другое значение && isValid если уже где-то было false? то значение не поменяется 
        }

        if (validation.email) { //если в условиях валидации есть email то будет проверка 
            isValid = validateEmail(value) && isValid //проверим через функцию из интернета (аерху этого js файла) и она вернет ил тру или фолс 
        }

        if (validation.minLength) { //если в условиях валидации есть minLength то будет проверка 
            isValid = value.length >= validation.minLength && isValid; //если длина боьше или равна числу указаному в условии и isValid true, то все ок
        }


        return isValid;
    }

    onChange = (event, controlName) => {

        const formControls = {...this.state.formControls} //получаем копию данного state 
        const control = {...formControls[controlName]} //абсолютно независимый обэект того инпута (password или email ) на котором действие onChange происходит
        
        control.value = event.target.value; //что будет записано в валюе передастся сюда 
        control.touched = true; //если мы попали в эту функцию, значит уже чтото изменилось
        
        control.valid = this.validateControl(control.value, control.validation);//если поддерживает все условия, то true   \/ передаем value и условия валидации в функцию
        
        formControls[controlName] = control; //меняем в стате оригинальные значения на полученые от пользователя 
        
        let isFormVal = true;

        Object.keys(formControls).forEach(name => {//пройдем по все объектам formControls и получим в качестве значений ключи данного объекта тоесть email и password и благодаря forEach пройдем все его name 
            isFormVal = formControls[name].valid && isFormVal//перебирем все значения formControls (password или email) у каждого есть значение valid  
        }) // isFormVal блокирует кнопки

        this.setState({
            formControls, isFormVal//после того как переписал берем и изменяем стате
        })

    }

    renderInputs() { //функция которая отвечает за рендер инпутов 
        const inputs = Object.keys(this.state.formControls).map((controlName, index) => { //благодаря Object.keys берем массив со всеми ключами в стете форм контрол, а благодаря map их перебираем \\ в controlName у нас будет находится строка, либо email или password
            const controls = this.state.formControls[controlName] //сделано для удобства(сократить написания кода), в ней у нас будет находится строка, либо email или password по названию ключа 
            return (
                <Input
                    key = {controlName + index} //чтобы были разные, получится по типу (email 0)
                    type = {controls.type}  //email or password
                    value = {controls.value}
                    label = {controls.label}
                    valid = {controls.valid}
                    touched = {controls.touched}
                    shouldValidate = {!!controls.validation} //нужно ли валидировать(проверка что внутри) прописываем это в state - validation | тоесть если там пусто, то будет false, а есл чтото написано будет true 
                    errorMessage = {controls.errorMessage}
                    onChange = {event => this.onChange(event, controlName)} //сейчас без этой функции невозможно ничего внтри инпута написать. делаем коллбек функцию, которая будет отслеживать где мы клацнули и имя \ не изменяется, потому что мы не меняем state  
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