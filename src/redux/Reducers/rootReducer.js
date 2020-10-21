//функция которая объеденяет все reducers 
import {combineReducers} from 'redux'
import quizReducer from './quizReducer'
import quizCreatorReducer from './quizCreatorReducer'
import authReducer from './authReducer'

export default combineReducers({
    quiz: quizReducer, //1-ое которое передаст(как props в файл) \\ 2-ое название это которое получил 
    quizCreator: quizCreatorReducer,
    auth: authReducer
})