import React from 'react';
import './AnswerQuestion.css'

const AnswerQuestion = (props) => {
    
    const classes = ['AnswerQuestion']

    if (props.state) { //данное состояние будет характерно дишь для этого item 
        classes.push([props.state])
    }
    
    return (
        <li 
        className={classes.join(' ')}
        onClick={() => props.onAnswerClick(props.answers.id)}
        >
            {props.answers.text}
        </li>
    )
}

export default AnswerQuestion;