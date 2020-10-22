import React from 'react';
import './FinishQuiz.css'
import Button from '../UI/Button/Button'
import {Link} from 'react-router-dom'

const FinishQuiz = props => {
    const answerTrue = Object.keys(props.result).reduce( (total, key) => { 
        if (props.result[key] === 'success') {
            total++  
        }
        return total 
    }, 0)

    return (
        <div className='FinishQuiz'>
            <ul>
                {props.quiz.map( (quizItem, index) => { 
                    const ikon = [ 
                        'fa',
                        props.result[quizItem.id] === 'err' ? `fa-times err1` : `fa-check succes1`, 
                    ]

                    return(
                        <li key={index}>
                            <strong>{index + 1}</strong>.&nbsp;
                                {quizItem.question} 
                            <i className={ikon.join(' ') }/> 
                        </li>
                    )
                })
                }
             </ul>
             
            <p>Правильных ответов {answerTrue} из {props.quiz.length}</p>

            <div> 
                <Button onClick={props.onRetry} type="primary">Повторить</Button>
                <Link to='/'>
                    <Button type="success">Перейти в список тестов</Button>
                </Link>
            </div>
        </div>
    )
}

export default FinishQuiz;




