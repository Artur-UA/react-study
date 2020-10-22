import {QUIZ_CREATOR_QUESTION, QUIZ_CREATOR_RESET} from './../../redux/Action/actionTypes'
import axios from './../../axios/axiosURL' 

export function createAdQuestion(item) {
    return {
        type: QUIZ_CREATOR_QUESTION,
        item
    }
}

export function resetQuizCreation() {
    return {
        type: QUIZ_CREATOR_RESET

    }
}

export function finishCreateQuiz() {
    return async (dispatch, getState) => { 
        await axios.post('quizes.json', getState().quizCreator.quiz)  
        dispatch(resetQuizCreation())
    }
}