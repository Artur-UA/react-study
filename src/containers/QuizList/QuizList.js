import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import './QuizList.css'

export default class QuizList extends Component {
    
    renderQuiz() {
        return [1, 2, 3].map((info, index) => {//в теории тут будет инфа с бекенда
            return(
                <li
                    key={index}
                >
                    <NavLink to={'/quiz/' + info}>
                        Test {info}
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        return (
            <div className='QuizList'>
                <div>
                <h1>Test List</h1>   
                    <ul>
                        {this.renderQuiz()}
                    </ul>
                </div>
            </div>
        )
    }
}