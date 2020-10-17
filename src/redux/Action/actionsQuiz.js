//import reduxThunk from 'redux-thunk'
import axios from './../../axios/axiosURL' 
import {FETCH_QUIZ_ERROR, FETCH_QUIZ_FINISH, FETCH_QUIZ_START, FETCH_QUIZ_TEST_ID_FINISH} from './actionTypes'


export function fetchQuizes() {//для папки quizList
    return async (dispatch) => {
        dispatch(fetchQuizStart()) //запускаем функцию лоадера 
        try { //для отловки ошибок try/catch используем
            const respon = await axios.get('quizes.json') //quizes название таблицы в базе данных || должно было быть полное имя домена но мы импортировали из axiosURL а не из оригинального axios и  там внесли изменения и написали базовый url 
            //console.log (respon.data)//выведем присланные данные в конслоь 

            const quizs = [] //создан для добавление сюда инфы с бэка 

            Object.keys(respon.data).forEach((key, index) => {//пройдемся по данным. вытащим все ключи. благодаря методу forEach переберем их 
                quizs.push({
                    id: key, //key криптографический ключ
                    name: `Test # ${index + 1}`
                })
            }) 
            dispatch(fetchQuizFinish(quizs)) // передадим туда все параметры  которые вытащили 
        }
        catch (error) { 
            dispatch(fetchQuizError(error)) // в случае ошибки вызовет функцию и туда передаст ошибку
        }
    }
}

export function fetchTestsById(quizID) { //для папки quiz.quiz
    return async(dispatch) => {        
        dispatch(fetchQuizStart()) //запускаем функцию лоадера(одинакова для нескольких странци. Просто включит загрузчик)
        try { //try стоит для отслеживания ошибок 
            const responses = await axios.get(`quizes/${quizID}.json`) //адресс подставит нужный 'https://react-test-project-12422.firebaseio.com/quizes/ и криптографический ключ 
            
            const quiz = responses.data //заполняем инфой с сервера
            //console.log('quiz id =', this.props.match.params.id ) //убелимся что открывает нужный список вопросов | покажет id 
        
            dispatch(fetchQuizTestIdFinish(quiz))//запустит функцию и передаст туда всю инфу с сервера 
        } 
        catch (e) {
            dispatch(fetchQuizError(e))
        } 
    }
}

export function quizAnswerClick(answerId){ //без async потому что работаем без сервера 
    return (dispatch, getState) => { // тут нужно работать со state/ и чтобы с ним работать, нужно вместе с dispatch применить getState(это функция благодаря которой можно получить нужный state)
        
        const state = getState().quiz // делаем копию state(а именно отдела quiz) можно написать другое имя переменной, и потом везде работаем с этой переменной и нужно писать ее имя. \\ тут перед state был this. но я везде постирал 
        
        if(state.answerState) { //чтобы при двойном нажатии на правильный ответ на засчитывало в правильный ответ и следующий вопрос 
            const key = Object.keys(state.answerState)[0] //вытаскиеваем из answerState благодаря оператору Object.keys нулевое значение[0] тоесть первое и единственное там
            if(state.answerState[key] === 'success') { //тоесть если key будет success. тоесть правильно ответили, то он вернет ничего. благодаря этому при двойном нажатии не произойдет запись положительная и на второй вопрос
                return //это ок так и нужно 
            }
        }

        const question = state.quiz[state.activeQuestion]//достаем вопрос из quiz, в [ ] указываем номер вопроса, this.state.activeQuestion соответствует номеру вопроса 

        const results = state.result  //сделаем переменную, туда поместим значение, поработаем с ним а потом только сделаем setState

        if (question.rightAnswerId === answerId) { //если правильный ответ будет нажат, то answerId будет равен rightAnswerId
            if(!results[question.id]) {  //если в резалт ансвер что-то лежит, то значит он уже отвечал ранее неправильно, в нашем случае наоборот
                results[question.id] = 'success' //если пусто, значит в объект переменной results запишем ключ(id) вопроса и значение success
            }

            /* изменили в соответствии с redax 
            this.setState({ //меняем answerState нсли правильно ответил чтобы стилизовать кнопку
                answerState : {[answerId] : 'success'},

                result : results  //в setstate запишем теперь ответ с переменной results
            })*/

            const timeout = window.setTimeout(() => {
                if (this.isFinishQuestion()) { //ответили на все вопросы то отключит.
                    console.log ("Finish")

                    /* изменили в соответствии с redax 
                    this.setState({
                        finish : true
                    })*/

                } else {//если еще остались вопросы, то переключит на следующий

                /* изменили в соответствии с redax 

                    this.setState({ //при нажатии меняем setState на +1 что в свою очередь меняет вопрос в rendere. 
                        activeQuestion : this.state.activeQuestion + 1,

                        answerState : null //на следующем вопросе убирет окрас 

                    })
                    */
                }
                window.clearTimeout(timeout)
            }, 700)

         
        } else {

            results[question.id] = 'err' //в объект с ключем(id) вопроса, значение запишем err. так как тут попадают только неправильные ответы 

            /* изменили в соответствии с redax 
            this.setState({ //меняем answerState нсли правильно ответил чтобы стилизовать
                answerState : {[answerId] : 'err'},

                result : results //в setstate запишем теперь ответ с переменной results
            })
            */
        }
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