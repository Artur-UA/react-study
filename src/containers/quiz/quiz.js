import React, {Component} from 'react';
import './quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/AqtiveQuiz'
import FinishQuiz from '../../components/FinishQuiz/FinishQuiz'
import Loader from './../../components/UI/Loader/Loader'
import {connect} from 'react-redux'
import {fetchTestsById, quizAnswerClick, retryQuiz} from './../../redux/Action/actionsQuiz'


class Quiz extends Component {
    

    componentDidMount() { 
        this.props.fetchTestsById(this.props.match.params.id) 
    }

    componentWillUnmount(){ 
        this.props.retryQuiz()
    }
    render () {
        
       
        return (
            <div className='Quizs'>
                <div className='QuizWrapper'>
                <h1>Test</h1>


                {
                    this.props.loading || !this.props.quiz

                    ? <Loader />

                    : 
                    
                        this.props.finish 
                        
                        ?   <FinishQuiz
                                result = {this.props.result}
                                quiz = {this.props.quiz} 
                                onRetry = {this.props.retryQuiz}
                            /> 
                            
                        : 
                        <ActiveQuiz
                            question={this.props.quiz[this.props.activeQuestion].question}
                            answers={this.props.quiz[this.props.activeQuestion].answers} 
                            
                            onAnswerClick={this.props.quizAnswerClick}
                            quizLenght={this.props.quiz.length}
                            answerNumber={this.props.activeQuestion + 1}
                            state={this.props.answerState}
                        />
                }
                </div>
            </div>
        )
    } 
}

function mapStateToProps(state) {
    return{
        result: state.quiz.result, 
        finish: state.quiz.finish,
        activeQuestion : state.quiz.activeQuestion,
        answerState : state.quiz.answerState, 
        quiz: state.quiz.quiz, 
        loading: state.quiz.loading 
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchTestsById: id => dispatch(fetchTestsById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)