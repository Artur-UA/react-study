import React from 'react';
import './AnswersList.css'
import AnswerQuestion from './AnswerQuestion/AnswerQuestion'

const AnswersList = props => (
    <ul className="AnswersList">
        {props.answers.map((answers, index) => {
            return (
                <AnswerQuestion
                    key={index}
                    answers={answers}
                    onAnswerClick={props.onAnswerClick}
                    state={props.state ? props.state[answers.id] : null} 
                />
            )
        })}
    </ul>

)

export default AnswersList;