import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom' //чтобы было несколько страниц
import {createStore, compose, applyMiddleware} from 'redux' //для создания store // для Redux devTools // импортим для  middleware
import {Provider} from 'react-redux' // чтобы работали вместе react-redux
import rootReducer from './redux/Reducers/rootReducer.js' //импортим все reducers 
import thunk from 'redux-thunk'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const store = createStore(
    rootReducer, 
    composeEnhancers(applyMiddleware(thunk)))

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root')
);
