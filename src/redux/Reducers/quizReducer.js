import {FETCH_QUIZ_START, FETCH_QUIZ_FINISH, FETCH_QUIZ_ERROR, FETCH_QUIZ_TEST_ID_FINISH} from './../Action/actionTypes'

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
                ...state, 
                loading: false, //убираем загрузчик
                error: action.error
            }
        }
        case FETCH_QUIZ_TEST_ID_FINISH: {
            return {
                ...state,
                loading: false, //отключает дизайн загрузки
                quiz: action.quiz
            }
        }
        default:
            return state // в любом случае но reducer должен вернуть state,  хоть обатно его неизмененным
    }
}

