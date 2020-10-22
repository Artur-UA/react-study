import {FETCH_QUIZ_START, FETCH_QUIZ_FINISH, FETCH_QUIZ_ERROR, FETCH_QUIZ_TEST_ID_FINISH, 
    QUIZ_TEST_SET_STATE, QUIZ_TEST_SET_STATE_FINISH, QUIZ_TEST_SET_STATE_NEXT_QUESTION,
    QUIZ_TEST_SET_STATE_DEFAULT} from './../Action/actionTypes'

const initialState = {
    
    quizs: [], 
    loading: false,
    error: null,
    result : {}, 
    finish: false,
    activeQuestion : 0,
    answerState : null, 
    quiz: null 
}

export default function quizReducer(state = initialState, action) {

    switch(action.type) {
        case FETCH_QUIZ_START: { 
            return {
                ...state, loading: true 
            }
        }
        case FETCH_QUIZ_FINISH: {
            return {
                ...state,
                loading: false, 
                quizs: action.value
            }
        }
        case FETCH_QUIZ_ERROR: {
            return {
                ...state, 
                loading: false, 
                error: action.error
            }
        }
        case FETCH_QUIZ_TEST_ID_FINISH: {
            return {
                ...state,
                loading: false, 
                quiz: action.quiz
            }
        }
        case QUIZ_TEST_SET_STATE: {
            return{
                ...state,
                answerState:action.answerState,
                result: action.result
            }
        }
        case QUIZ_TEST_SET_STATE_FINISH: {
            return{
                ...state,
                finish: true
            }
        }
        case QUIZ_TEST_SET_STATE_NEXT_QUESTION: {
            return{
                ...state, 
                activeQuestion : action.questionNumber,
                answerState : null
            }
        }
        case QUIZ_TEST_SET_STATE_DEFAULT: {
            return{
                ...state,
                result : {}, 
                finish: false,
                activeQuestion : 0,
                answerState : null
            }
        }
        default:
            return state 
    }
}

