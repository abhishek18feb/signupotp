import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose,combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { BrowserRouter as Router } from 'react-router-dom'
import { watchSignUpOtp } from './store/sagas';
import signUpOtpReducer from './store/reducers/signupotp';

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = process.env.NODE_ENV==='development'?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:null || compose;
//const composeEnhancers = compose;
const rootReducers = combineReducers({
	signupotp:signUpOtpReducer
});

const store = createStore( 
			rootReducers,
			composeEnhancers(applyMiddleware(sagaMiddleware))
		);

sagaMiddleware.run(watchSignUpOtp);

ReactDOM.render(<Provider store={store}>
                    <BrowserRouter>
                        <Router>
                            <App />
                        </Router>
                    </BrowserRouter>
                </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
