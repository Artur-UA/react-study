import {QUIZ_CREATOR_QUESTION, QUIZ_CREATOR_RESET} from './../Action/actionTypes'

const initialState = {
    quiz: []
}

export default function quizCreatorReducer(state = initialState, action){
    switch(action.type) {
        case QUIZ_CREATOR_QUESTION: {
            return {
                ...state,
                quiz: [...state.quiz, action.item]
            }
        }
        case QUIZ_CREATOR_RESET: {
            return {
                ...state, 
                quiz: []
            }
        }
        default: 
            return state
    }
}

