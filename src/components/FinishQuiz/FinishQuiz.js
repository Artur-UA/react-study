import React from 'react';
import './FinishQuiz.css'
import Button from '../UI/Button/Button'
import {Link} from 'react-router-dom'

const FinishQuiz = props => {
    const answerTrue = Object.keys(props.result).reduce( (total, key) => { //Object.keys превратит объект в массив ключей, а reduce посчитает сколько тут нужных нам будет
        if (props.result[key] === 'success') {//переберет все ключи, и где найдет правильное то его приплюсует к нулю. 
            total++  //увеличит на 1
        }
        return total //передадим адльше сумму правильных ответов. 
    }, 0)

    return (
        <div className='FinishQuiz'>
            <ul>
                {props.quiz.map( (quizItem, index) => { //пройдем по всем вопросам и вытащим их/ quizItem.question вытаскивет конкретно вопрос 
                    const ikon = [ //массив с иконками
                        'fa',
                        props.result[quizItem.id] === 'err' ? `fa-times err1` : `fa-check succes1`, //если id err то добавит один клас, а если нет то другой | err1/succes1 красит в нужный цвет
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




