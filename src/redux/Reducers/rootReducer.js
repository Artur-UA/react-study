//функция которая объеденяет все reducers 
import {combineReducers} from 'redux'
import quizReducer from './quizReducer'

export default combineReducers({
    quiz: quizReducer //1-ое которое передаст(как props в файл) \\ 2-ое название это которое получил 
})