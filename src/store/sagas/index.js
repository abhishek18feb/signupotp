import { takeEvery, all, takeLatest, take } from 'redux-saga/effects'
import * as actionTypes from '../actions/actionTypes';
import {sendEmailBackendSaga} from './signupotp';

export function* watchSignUpOtp(){
	yield all([
		takeEvery(actionTypes.SENT_EMAIL_BACKEND, sendEmailBackendSaga),
	])
}

