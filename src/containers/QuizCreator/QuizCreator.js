import React, {Component} from 'react';
import './QuizCreator.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import {createControl, validate, validateForm} from '../../form/formQuestion/formQuestion'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Select from '../../components/UI/Select/Select'

import {connect} from 'react-redux'
import {createAdQuestion, finishCreateQuiz} from './../../redux/Action/actionQuizCreator'

function createOption(number) { 
    return createControl({ 
        label: `Version ${number}`,
        errorMessage: 'The question cannot be empty',
        id: number
        }, {required: true})
}

function newForm() { 
    return {
           
        question: createControl({ 
            label: "Enter question",
            errorMessage: 'The question cannot be empty'
            }, {required: true}),

        answer1: createOption(1),
        answer2: createOption(2),
        answer3: createOption(3),
        answer4: createOption(4)
        }
}
class QuizCreator extends Component {

    state = {
        formControls: newForm(),
        isFormValid : false,
        rightAnswerId: 1
    }

    onSubmit = (event) => { 
        event.preventDefault()
    }

    onAddQuestion = (event) => { 
        event.preventDefault()
        
        const {question, answer1, answer2, answer3, answer4} = this.state.formControls

        const questionItem = { 
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                { text : answer1.value, id : answer1.id},
                { text : answer2.value, id : answer2.id},
                { text : answer3.value, id : answer3.id},
                { text : answer4.value, id : answer4.id},

            ]
        }

        this.props.createAdQuestion(questionItem)

        this.setState({
            formControls: newForm(),
            isFormValid : false,
            rightAnswerId: 1
        })
    }


    onCreateFinish = event => { 
        event.preventDefault()

            this.setState({ 
                formControls: newForm(),
                isFormValid : false, 
                rightAnswerId: 1
            })
        this.props.finishCreateQuiz()
    }

    onChange = (value, controlName)  => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]} 

        control.touched = true 
        control.value = value
        control.valid = validate(control.value, control.validation) 

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => { 
            const controls = this.state.formControls[controlName] 
            
            return (
                <Auxiliary key = {index + controlName}>
                    <Input 
                        label = {controls.label}
                        errorMessage = {controls.errorMessage}
                        value = {controls.value}
                        valid = {controls.valid}
                        shouldValidate={!!controls.validation}
                        touched={controls.touched}
                        onChange = {event => this.onChange(event.target.value, controlName)} 
                    />
                    { index === 0 ? <hr/> : null}
                </Auxiliary>
            )
        })
    }

    selectChange = event => {
        this.setState({
            rightAnswerId : +event.target.value
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
                            disabled = {this.props.quiz.length === 0}
                        >
                            Finish test creation
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        quiz: state.quizCreator.quiz
    }
}

function mapDispatchToProps(dispatch){
    return{

        createAdQuestion: (item) => dispatch(createAdQuestion(item)), 
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(QuizCreator)