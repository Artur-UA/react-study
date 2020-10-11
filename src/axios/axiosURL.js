import axios from 'axios' //сделали для того, чтобы не прописывать везде полный URL адресс 

export default axios.create({
    baseURL: 'https://react-test-project-12422.firebaseio.com/' //встроенный метод 
})