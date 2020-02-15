import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../utils/Utility';

const initialState={
	receiveEmailResponse:null,
	receiveEmailResponseMsg:null,
    error:null,
    sendDisable:false,
    otpDisable:true
}

const receiveEmailSuccess = (state,action) =>{
	//console.log('receiveEmailSuccess', action)
	return updateObject(state, {
			receiveEmailResponse: action.receiveEmailResponse,
			receiveEmailResponseMsg:action.receiveEmailResponseMsg, 
			error:null,
			sendDisable:false,
    		otpDisable:false		
		});
}; 

const receiveEmailFail = (state, action)=>{
	//console.log('receiveEmailFail', action)
	return updateObject(state, {
		receiveEmailResponse: action.receiveEmailResponse,
		receiveEmailResponseMsg:action.receiveEmailResponseMsg,
		error:null,
		sendDisable:false,
    	otpDisable:true
	});
};

const disableSignupOTPEmailSendButton = (state, action) => {
	return updateObject(state, {
		sendDisable:true
	});
};

const reducer = (state=initialState, action)=>{
	switch (action.type){
		case actionTypes.RECEIVE_EMAIL_SUCCESS: return receiveEmailSuccess(state, action)
		case actionTypes.RECEIVE_EMAIL_FAIL: return receiveEmailFail(state, action)
		case actionTypes.DISABLE_SIGNUP_OTP_SEND: return disableSignupOTPEmailSendButton(state, action)
		default: return state 
	}
}

export default reducer;
