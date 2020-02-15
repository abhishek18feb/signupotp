import {put, delay, call} from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from '../../axios';

export function* sendEmailBackendSaga(action){ 
	let url = '/sendsignupemail'
    //console.log(action.formData);
    yield put(actions.disableSignupOTPEmailSendButton())
	try{
		const response = yield axios({ 
			method:'post',
			url:url, 
			data: action.formData,
			//headers: {'Authorization': 'Berear '+action.adminToken}
		})
		//console.log(response); 
		yield put(actions.receiveEmailSuccess(response.data.data, response.data.message));
	}catch(error){
		//console.log(error.response);
		yield put(actions.receiveEmailFail(null, error.response.data.message));
	}
} 

export function* sendOtpBackendSaga(action){ 
	let url = '/sendotp'
    console.log(action.formData);
	try{
		const response = yield axios({ 
			method:'post',
			url:url, 
			data: action.formData,
			//headers: {'Authorization': 'Berear '+action.adminToken}
		})
		console.log(response); 
		yield put(actions.receiveEmailSuccess(response.data.data, response.data.message));
	}catch(error){
		console.log(error);
		yield put(actions.receiveEmailFail(null, error.response.data.message));
	}
} 
