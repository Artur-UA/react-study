const initialState = {
    quizes: [], //создали, чтобы добавлять сюда данные с бэка
    loading: true
}

export default function quizReducer(state = initialState, action) {

    switch(action.type) {
        default:
            return state // в любом случае но reducer должен вернуть state,  хоть обатно его неизмененным
    }
}