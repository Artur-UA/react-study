import React from 'react';
import './AqtiveQuiz.css'
import AnswersList from './AnswersList/AnswersList'

const ActiveQuiz = props => (
    <div className="QuizStyle">
            <p className="Question">
                <span>
                <strong>{props.answerNumber}</strong>&nbsp;
                {props.question}
                </span>
                <small>{props.answerNumber} for {props.quizLenght}</small>
            </p>


            <AnswersList 
            answers={props.answers}
            onAnswerClick={props.onAnswerClick}
            state={props.state}
            /> 
    </div>
)

export default ActiveQuiz;