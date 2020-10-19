export function createAdQuestion(item) {
    event.preventDefault()

        const quiz = this.state.quiz.concat() //вернет копию массива 
        const index = quiz.length + 1
        
        const {question, answer1, answer2, answer3, answer4} = this.state.formControls //вытаскиваем для удобства их

        const questionItem = { //создаем вопрос
            question: question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                { text : answer1.value, id : answer1.id},
                { text : answer2.value, id : answer2.id},
                { text : answer3.value, id : answer3.id},
                { text : answer4.value, id : answer4.id},

            ]
        }
        quiz.push(questionItem) //пушим его в quiz 
        this.setState({
            quiz, //добавляем это в quiz/  А после этого чистим все, чтобы дальше можно было создавать вопросы. для етого просто добавляем чистый state 
            formControls: newForm(),
            isFormValid : false, //для проверки сосотояния формы 
            rightAnswerId: 1
        })
}


export function finishCreateQuiz() {
    event.preventDefault()

    try {
        const respon = await axios.post('https://react-test-project-12422.firebaseio.com/quizes.json', this.state.quiz) //можно без переменной, сразу писать await || отправляем на сервер пост запрос, (где в конце обьязательно пишем json чтобы сервер обработал ее в этот формат).  который передаст в базу данных созданные тестовые вопросы 
        console.log (respon.data) //покажем что отправило на сервер 

        this.setState({ //после успешной отправки остается активной клавиша. чтобы это убрать, обнуляем setState к дефолту
            quiz: [],//тест который мы будем создавать, может состоять из нескольких вопросовю поэтому мы создаем массив куда  положем их объект
            formControls: newForm(),
            isFormValid : false, //для проверки сосотояния формы 
            rightAnswerId: 1
        })
    }
    catch (event) {
        console.log(event)//если не ок покажет ошибку 
    }
}