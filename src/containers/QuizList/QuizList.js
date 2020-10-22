import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import './QuizList.css'
import Loader from './../../components/UI/Loader/Loader'
import {connect} from 'react-redux'
import {fetchQuizes} from './../../redux/Action/actionsQuiz'

class QuizList extends Component {

    
    renderQuiz() {
        return this.props.quizes.map((info) => {
            return(
                <li
                    key={info.id} 
                >
                    <NavLink to={'/quiz/' + info.id}>
                        {info.name}
                    </NavLink>
                </li> 
            )
        })
    }


    componentDidMount() { 
        this.props.fetchQuizs() 
    }

    render() {
        return (
            <div className='QuizList'>
                <div>
                <h1>Test List</h1> 

                {
                    this.props.loading && this.props.loading.length !== 0
                    ? <Loader /> 
                    :   <ul>
                            {this.renderQuiz()}
                        </ul>
                }  
                    
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        quizes: state.quiz.quizs,  
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizs: () => dispatch(fetchQuizes()) 
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(QuizList)