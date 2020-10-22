//функция которая объеденяет все reducers 
import {combineReducers} from 'redux'
import quizReducer from './quizReducer'
import quizCreatorReducer from './quizCreatorReducer'
import authReducer from './authReducer'

export default combineReducers({
    quiz: quizReducer,  
    quizCreator: quizCreatorReducer,
    auth: authReducer
})