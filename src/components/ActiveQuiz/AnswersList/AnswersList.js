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
                    state={props.state ? props.state[answers.id] : null} //props.state - проверка есть ли чтото в state //props.state[answers.id] достает все что там есть и идем дальше  
                />
            )
        })}
    </ul>

)

export default AnswersList;