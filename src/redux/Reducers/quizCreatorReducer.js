import {QUIZ_CREATOR_QUESTION, QUIZ_CREATOR_RESET} from './../Action/actionTypes'

const initialState = {
    quiz: []
}

export default function quizCreatorReducer(state = initialState, action){
    switch(action.type) {
        case QUIZ_CREATOR_QUESTION: {
            return {
                ...state,
                quiz: [...state.quiz, action.item] //чтобы не мутировал state, вставляем вместо него развернутый state, а также инфу которую мы передаем action.item
            }
        }
        case QUIZ_CREATOR_RESET: {//после отправки очистит поля 
            return {
                ...state, 
                quiz: []
            }
        }
        default: 
            return state
    }
}

