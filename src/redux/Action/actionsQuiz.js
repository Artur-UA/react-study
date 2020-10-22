//import reduxThunk from 'redux-thunk'
import axios from './../../axios/axiosURL' 
import {FETCH_QUIZ_ERROR, FETCH_QUIZ_FINISH, FETCH_QUIZ_START, FETCH_QUIZ_TEST_ID_FINISH, 
    QUIZ_TEST_SET_STATE, QUIZ_TEST_SET_STATE_FINISH, QUIZ_TEST_SET_STATE_NEXT_QUESTION,
    QUIZ_TEST_SET_STATE_DEFAULT} from './actionTypes'

function isFinishQuestion(state) { 
    return state.activeQuestion + 1 === state.quiz.length 
}

export function retryQuiz (){ 
    return{
        type: QUIZ_TEST_SET_STATE_DEFAULT,
        
    }
   
}

export function fetchQuizes() {
    return async (dispatch) => {
        dispatch(fetchQuizStart()) 
        try { 
            const respon = await axios.get('quizes.json') 

            const quizs = [] 

            Object.keys(respon.data).forEach((key, index) => {
                quizs.push({
                    id: key,
                    name: `Test # ${index + 1}`
                })
            }) 
            dispatch(fetchQuizFinish(quizs))
        }
        catch (error) { 
            dispatch(fetchQuizError(error)) 
        }
    }
}

export function fetchTestsById(quizID) { 
    return async(dispatch) => {        
        dispatch(fetchQuizStart()) 
        try { 
            const responses = await axios.get(`quizes/${quizID}.json`)  
            
            const quiz = responses.data 
        
            dispatch(fetchQuizTestIdFinish(quiz))
        } 
        catch (e) {
            dispatch(fetchQuizError(e))
        } 
    }
}

export function quizAnswerClick(answerId){
    return (dispatch, getState) => { 
        
        const state = getState().quiz  
        
        if(state.answerState) { 
            const key = Object.keys(state.answerState)[0] 
            if(state.answerState[key] === 'success') { 
                return 
            }
        }

        const question = state.quiz[state.activeQuestion] 

        const results = state.result  

        if (question.rightAnswerId === answerId) { 
            if(!results[question.id]) {  
                results[question.id] = 'success' 
            }
            
            dispatch(quizSetState({[answerId] : 'success'}, results))
            
            const timeout = window.setTimeout(() => {
                if (isFinishQuestion(state)) { 
                    //console.log ("Finish")

                    dispatch(quizSetStateFinish())
                

                } else {

                dispatch(quizTestSetStateNextQuestion(state.activeQuestion + 1))
                
                }
                window.clearTimeout(timeout)
            }, 700)

         
        } else {

            results[question.id] = 'err'  


            dispatch(quizSetState({[answerId] : 'err'}, results)) 
            
        }
    }
}

export function quizTestSetStateNextQuestion(questionNumber) {
    return{
        type: QUIZ_TEST_SET_STATE_NEXT_QUESTION,
        questionNumber
    }
}

export function quizSetState(answerState, result) {
    return {
        type: QUIZ_TEST_SET_STATE,
        answerState, 
        result
    }
}

export function quizSetStateFinish() {
    return{
        type:QUIZ_TEST_SET_STATE_FINISH
    }
}
export function fetchQuizStart(){
    return{
        type: FETCH_QUIZ_START
    }
}

export function fetchQuizFinish(quizs){
    return{
        type: FETCH_QUIZ_FINISH,
        value: quizs
    }
}

export function fetchQuizError(error) {
    return{
        type: FETCH_QUIZ_ERROR,
        value: error
    }
}

export function fetchQuizTestIdFinish(quiz) {
    return{
        type: FETCH_QUIZ_TEST_ID_FINISH,
        quiz: quiz
    }
}