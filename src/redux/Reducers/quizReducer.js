import {FETCH_QUIZ_START, FETCH_QUIZ_FINISH, FETCH_QUIZ_ERROR, FETCH_QUIZ_TEST_ID_FINISH, 
    QUIZ_TEST_SET_STATE, QUIZ_TEST_SET_STATE_FINISH, QUIZ_TEST_SET_STATE_NEXT_QUESTION,
    QUIZ_TEST_SET_STATE_DEFAULT} from './../Action/actionTypes'

const initialState = {
    //state из quizList
    quizs: [], //создали, чтобы добавлять сюда данные с бэка
    loading: false,
    error: null,
    //state из quiz 
    result : {}, // {[id]} : success err  будем писать ключ(id) элемента и значение отвтеа 
    finish: false,
    activeQuestion : 0,
    answerState : null, //хранит инфу о клике польхзователя. или правильно или ложь   получает { [id ответа ] : "success" ? "err" }
    quiz: null //неопределен, чтобы загрузить данные с сервера
}

export default function quizReducer(state = initialState, action) {

    switch(action.type) {
        case FETCH_QUIZ_START: { //актив при загрузке dom 
            return {
                ...state, loading: true //возвращает начальный state и делаем loading true 
            }
        }
        case FETCH_QUIZ_FINISH: {
            return {
                ...state,//принимаем и передаем весь state
                loading: false, //отключает дизайн загрузки
                quizs: action.value
            }
        }
        case FETCH_QUIZ_ERROR: {
            return {
                ...state, //разворачиваем state
                loading: false, //убираем загрузчик
                error: action.error
            }
        }
        case FETCH_QUIZ_TEST_ID_FINISH: {
            return {
                ...state,//разворачиваем state
                loading: false, //отключает дизайн загрузки
                quiz: action.quiz
            }
        }
        case QUIZ_TEST_SET_STATE: {
            return{
                ...state,//разворачиваем state
                answerState:action.answerState,
                result: action.result
            }
        }
        case QUIZ_TEST_SET_STATE_FINISH: {
            return{
                ...state,//разворачиваем state
                finish: true
            }
        }
        case QUIZ_TEST_SET_STATE_NEXT_QUESTION: {
            return{
                ...state, //разворачиваем state
                activeQuestion : action.questionNumber,//action.questionNumber принимаем из actionsQuiz 
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
            return state // в любом случае но reducer должен вернуть state,  хоть обатно его неизмененным
    }
}

