import React, {Component} from 'react';
import './QuizCreator.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import {createControl, validate, validateForm} from '../../form/formQuestion/formQuestion'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Select from '../../components/UI/Select/Select'

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
        formControls: newForm(),
        isFormValid : false, //для проверки сосотояния формы 
        rightAnswerId: 1
    }

    onSubmit = (event) => { //чтобы не отправляло 
        event.preventDefault()
    }

    onAddQuestion = (event) => {
        event.preventDefault()

        const quiz = this.state.quiz.concat() //вернет копию массива 
        const index = quiz.length + 1
        
        const {question, answer1, answer2, answer3, answer4} = this.state.formControls //вытаскиваем для удобства их

        const questionItem = { //создаем вопрос
            question: question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                { text : answer1.value, id : answer1.id},
                { text : answer2.value, id : answer2.id},
                { text : answer3.value, id : answer3.id},
                { text : answer4.value, id : answer4.id},

            ]
        }
        quiz.push(questionItem) //пушим его в quiz 
        this.setState({
            quiz, //добавляем это в quiz/  А после этого чистим все, чтобы дальше можно было создавать вопросы. для етого просто добавляем чистый state 
            formControls: newForm(),
            isFormValid : false, //для проверки сосотояния формы 
            rightAnswerId: 1
        })
    }

    onCreateFinish = (event) => { //функция для кнопки окончание создавания теста 
        event.preventDefault()
        console.log('It\'s a good idea to learn React.')
        console.log(this.state.quiz)
    }

    onChange = (value, controlName)  => {
        const formControls = {...this.state.formControls} //получаем копию данного state 
        const control = {...formControls[controlName]} //абсолютно независимый обэект того инпута (password или email ) на котором действие onChange происходит
        
        control.touched = true //если мы попали в эту функцию, значит уже чтото изменилось
        control.value = value
        control.valid = validate(control.value, control.validation) //если поддерживает все условия, то true   \/ передаем value и условия валидации в функцию

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
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

    selectChange = event => {
        this.setState({
            rightAnswerId : +event.target.value//благодаря + приводим к  числу 
        })
    }

    render() {

        const select = <Select
            label="Choose the correct answer"
            value={this.state.rightAnswerId}
            onChange={this.selectChange}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4},
            ]}
        />

        return (
            <div className='QuizCreator'>
                <div>
                    <h1>Create test</h1>
                    <form onSubmit={this.onSubmit}>

                        { this.renderInputs() }
                        
                        { select }

                        <Button
                            type='primary'
                            onClick={this.onAddQuestion}
                            disabled = {!this.state.isFormValid}
                        >
                            Add question
                        </Button>

                        <Button
                            type='success'
                            onClick={this.onCreateFinish}
                            disabled = {this.state.quiz.length === 0}
                        >
                            Finish test creation
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}