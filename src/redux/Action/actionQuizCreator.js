import {QUIZ_CREATOR_QUESTION, QUIZ_CREATOR_RESET} from './../../redux/Action/actionTypes'
import axios from './../../axios/axiosURL' 

export function createAdQuestion(item) {
    return {
        type: QUIZ_CREATOR_QUESTION,
        item
    }
}

export function resetQuizCreation() {//чтобы очистилось поле, после отправки теста на сервер 
    return {
        type: QUIZ_CREATOR_RESET

    }
}

export function finishCreateQuiz() {
    return async (dispatch, getState) => { //getState нужен чтобы получить state 
        await axios.post('quizes.json', getState().quizCreator.quiz) //можно без переменной, сразу писать await || отправляем на сервер пост запрос, (где в конце обьязательно пишем json чтобы сервер обработал ее в этот формат).  который передаст в базу данных созданные тестовые вопросы 
        dispatch(resetQuizCreation())
    }
}