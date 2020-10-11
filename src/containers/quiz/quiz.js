import React, {Component} from 'react';
import './quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/AqtiveQuiz'
import FinishQuiz from '../../components/FinishQuiz/FinishQuiz'
import axios from '../../axios/axiosURL'
import Loader from './../../components/UI/Loader/Loader'


export default class Quiz extends Component {
    state = {
        result : {}, // {[id]} : success err  будем писать ключ(id) элемента и значение отвтеа 
        finish: false,
        activeQuestion : 0,
        answerState : null, //хранит инфу о клике польхзователя. или правильно или ложь   получает { [id ответа ] : "success" ? "err" }
        loading: true,
        quiz: []
        /*старое наполнение массива. было заглушкой ранее
        [//массив, потому что в нем список всех вопросов
            {//каждый вопрос будет объектом
                question: "What color is the sky?",
                rightAnswerId: 2,
                id : 1,
                answers:[
                 {text: 'Red', id: 1},
                 {text: 'Blue', id: 2},
                 {text: 'Yellow', id: 3},
                 {text: 'Black', id: 4}
             ]   
            },
                {//каждый вопрос будет объектом
                    question: "What color is the ground?",
                    rightAnswerId: 4,
                    id : 2,
                    answers:[
                    {text: 'Red', id: 1},
                    {text: 'Blue', id: 2},
                    {text: 'Yellow', id: 3},
                    {text: 'Black', id: 4}
                ]   
                }
            ]*/
    }

    
    onAnswerClick = (answerId) => {

        if(this.state.answerState) { //чтобы при двойном нажатии на правильный ответ на засчитывало в правильный ответ и следующий вопрос 
            const key = Object.keys(this.state.answerState)[0] //вытаскиеваем из answerState благодаря оператору Object.keys нулевое значение[0] тоесть первое и единственное там
            if(this.state.answerState[key] === 'success') { //тоесть если key будет success. тоесть правильно ответили, то он вернет ничего. благодаря этому при двойном нажатии не произойдет запись положительная и на второй вопрос
                return //это ок так и нужно 
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]//достаем вопрос из quiz, в [ ] указываем номер вопроса, this.state.activeQuestion соответствует номеру вопроса 


        const results = this.state.result  //сделаем переменную, туда поместим значение, поработаем с ним а потом только сделаем setState


        if (question.rightAnswerId === answerId) { //если правильный ответ будет нажат, то answerId будет равен rightAnswerId
            if(!results[question.id]) {  //если в резалт ансвер что-то лежит, то значит он уже отвечал ранее неправильно, в нашем случае наоборот
                results[question.id] = 'success' //если пусто, значит в объект переменной results запишем ключ(id) вопроса и значение success
            }

            this.setState({ //меняем answerState нсли правильно ответил чтобы стилизовать кнопку
                answerState : {[answerId] : 'success'},

                result : results  //в setstate запишем теперь ответ с переменной results
            })

            const timeout = window.setTimeout(() => {
                if (this.isFinishQuestion()) { //ответили на все вопросы то отключит.
                    console.log ("Finish")

                    this.setState({
                        finish : true
                    })

                } else {//если еще остались вопросы, то переключит на следующий

                    this.setState({ //при нажатии меняем setState на +1 что в свою очередь меняет вопрос в rendere. 
                        activeQuestion : this.state.activeQuestion + 1,

                        answerState : null //на следующем вопросе убирет окрас 
                        

                    })
                }
                window.clearTimeout(timeout)
            }, 700)

         
        } else {

            results[question.id] = 'err' //в объект с ключем(id) вопроса, значение запишем err. так как тут попадают только неправильные ответы 

            this.setState({ //меняем answerState нсли правильно ответил чтобы стилизовать
                answerState : {[answerId] : 'err'},

                result : results //в setstate запишем теперь ответ с переменной results
            })
        }
    }

    retryIt = () => { //просто ставим стейт в дефолт
        this.setState({
            result : {}, 
            finish: false,
            activeQuestion : 0,
            answerState : null
        })
    }

    isFinishQuestion() {
        return this.state.activeQuestion + 1 === this.state.quiz.length //если вопрос будет равен всем вопросам, тоесть послдений то будет тру. и в свою очередь запустит if 
    }

    async componentDidMount(){ //загружает после прорисовки дом тесты с сенрвера 

        try { //try стоит для отслеживания ошибок 
            const responses = await axios.get(`quizes/${this.props.match.params.id}.json`) //адресс подставит нужный 'https://react-test-project-12422.firebaseio.com/quizes/ и криптографический ключ 

            this.setState({
                quiz: responses.data,
                loading: false
            })

            //console.log('quiz id =', this.props.match.params.id ) //убелимся что открывает нужный список вопросов | покажет id 
        } 
        catch (e) {
            console.log(e)
        } 
        
    
    }

    render () {
        return (
            <div className='Quizs'>
                <div className='QuizWrapper'>
                <h1>Test</h1>

                {
                    this.state.loading //если loading true тоесть не загрузулись данные покажет Loader  если false то загрузит данные с сервера и отрисует их 

                    ? <Loader />

                    :  //если loading false то будет еще выбор 
                    
                        this.state.finish //грубо говоря как оператор if. тоесть если да, то сделает это 
                        
                        ?   <FinishQuiz
                                result = {this.state.result}
                                quiz = {this.state.quiz} // для того чтобы получили доступ в FinishQuiz к списку вопросов 
                                onRetry = {this.retryIt}
                            /> //если окончил
                            
                        : //если не окончил
                        <ActiveQuiz
                        question={this.state.quiz[this.state.activeQuestion].question}
                        answers={this.state.quiz[this.state.activeQuestion].answers} //[0] потому что массив/answers потому что вопрос
                        onAnswerClick={this.onAnswerClick}
                        quizLenght={this.state.quiz.length}
                        answerNumber={this.state.activeQuestion + 1}
                        state={this.state.answerState}
                        />
                }
                {
                    
                }
                </div>
            </div>
        )
    } 
}