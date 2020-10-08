import React, {Component} from 'react';
import './QuizCreator.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import {createControl} from '../../form/formQuestion/formQuestion'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'

function createOption(number) { //для создания вариантов в тестах нужно. чтобы не дублировать код 
    return createControl({ //вопрос    //первым идет  набор конфигурация 
        label: `Version ${number}`,
        errorMessage: 'The question cannot be empty',
        id: number
        }, {required: true})
}

function newForm() { //функция нужна для создания вопросов. дело в том, чтобы при добавлении нового вопроса. нам нужно будет чистить setState. вот эта функция это делает 
    return {//объект в котором опишем параметри, которые отправим потом в компонент input 
           
        question: createControl({ //вопрос    //первым идет  набор конфигурация 
            label: "Enter question",
            errorMessage: 'The question cannot be empty'
            }, {required: true}),//вторым идет набор валидация в этой функции

        answer1: createOption(1),//функция создает вопросы. цифра соответствует номеру вопроса 
        answer2: createOption(2),
        answer3: createOption(3),
        answer4: createOption(4)
        }
}
export default class QuizCreator extends Component {

    state = {
        quiz: [],//тест который мы будем создавать, может состоять из нескольких вопросовю поэтому мы создаем массив куда  положем их объект
        formControls: newForm()
    }

    onSubmit = (event) => { //чтобы не отправляло 
        event.preventDefault()
    }

    onAddQuestion = () => {

    }

    onCreateFinish = () => {

    }

    onChange = (controlName, index) => {

    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => { //благодаря Object.keys берем массив со всеми ключами в стете форм контрол, а благодаря map их перебираем \\ в controlName у нас будет находится строка, либо question либо answers 1...4
            const controls = this.state.formControls[controlName] //сделано для удобства(сократить написания кода), в ней у нас будет находится строка, какая то из `Version ${number}`
            
            return (
                <Auxiliary key = {index + controlName}>
                    <Input 
                        label = {controls.label}
                        errorMessage = {controls.errorMessage}
                        value = {controls.value}
                        valid = {controls.valid}
                        shouldValidate={!!controls.validation}
                        touched={controls.touched}
                        onChange = {event => this.onChange(event.target.value, controlName)} //сейчас без этой функции невозможно ничего внтри инпута написать. делаем коллбек функцию, которая будет отслеживать где мы клацнули и имя \ не изменяется, потому что мы не меняем state  
                    />
                    { index === 0 ? <hr/> : null}
                </Auxiliary>
            )//{ index == 0 ? <hr/> : null} если индекс равен 0, то будет черта. иначе null
        })
    }

    render() {
        return (
            <div className='QuizCreator'>
                <div>
                    <h1>Create test</h1>
                    <form onSubmit={this.onSubmit}>

                        { this.renderInputs() }
                        
                        <select></select>

                        <Button
                            type='primary'
                            onClick={this.onAddQuestion}
                        >
                            Add question
                        </Button>

                        <Button
                            type='success'
                            onClick={this.onCreateFinish}
                        >
                            Finish test creation
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}