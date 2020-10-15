import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import './QuizList.css'
import axios from './../../axios/axiosURL'
import Loader from './../../components/UI/Loader/Loader'
import {connect} from 'react-redux'

class QuizList extends Component {

    /*state = { //благодаря redux вынесли отсюда state b преобразовали его в props 
        quizes: [], //создали, чтобы добавлять сюда данные с бэка
        loading: true
    }*/
    
    renderQuiz() {
        return this.props.quizes.map((info) => {//инфа идет с бэка в функции componentDidMount добавляется в state и потом сюда добавляется
            return(
                <li
                    key={info.id} //key будет криптографический ключ
                >
                    <NavLink to={'/quiz/' + info.id}>
                        {info.name}
                    </NavLink>
                </li> //info это то что будет в state(тоесть то что придет с бєка)
            )
        })
    }

/*    componentDidMount() { //для примера как писать
        axios.get('https://react-test-project-12422.firebaseio.com/quiz.json') //отправляем на сервер гет запрос, (где в конце обьязательно пишем json чтобы сервер обработал ее в этот формат).
        .then(response => { //обратно получаем ответ и выводим его в консоль 
            console.log(response)
        })
    }*/


    async componentDidMount() {//componentDidMount запускается когда уже зарендилось дерево. это нужно когда грузим с бэка 
        try { //для отловки ошибок try/catch используем
            const respon = await axios.get('quizes.json') //quizes название таблицы в базе данных || должно было быть полное имя домена(как написано выше метод). но мы импортировали из axiosURL а не из оригинального axios/ b там внесли изменения и написали базовый url 
            console.log (respon.data)//выведем присланные данные в конслоь 

            const quiz = [] //создан для добавление сюда инфы с бэка 

            Object.keys(respon.data).forEach((key, index) => {//пройдемся по данным. вытащим все ключи. благодаря методу forEach переберем их 
                quiz.push({
                    id: key, //key криптографический ключ
                    name: `Test # ${index + 1}`
                })
            }) 
            this.setState({
                quizes: quiz,
                loading: false
            })
        }
        catch (event) {
            console.log(event)
        }
    }


    render() {
        return (
            <div className='QuizList'>
                <div>
                <h1>Test List</h1> 

                {
                    this.props.loading 
                    ? <Loader />
                    :   <ul>
                            {this.renderQuiz()}
                        </ul>
                }  
                    
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        quizes: state.quizReducer.quiz, // quizes как оно будет называтся  \ state.quiz название которое получит из файла quizReducer 
        loading: state.quizReducer.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizs: () => dispatch (fetchQuizes()) //указываем что нужно загрузить с сервера
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(QuizList)