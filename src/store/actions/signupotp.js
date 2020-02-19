import * as actionTypes from './actionTypes';

export const sendEmailBackend = (formData) =>{
	//console.log(formData)
	return {
		type: actionTypes.SENT_EMAIL_BACKEND,
		formData: formData,
	}
}

export const disableSignupOTPEmailSendButton = () =>{
	return {
		type:actionTypes.DISABLE_SIGNUP_OTP_SEND
	}
}
export const receiveEmailSuccess = (receiveEmailResponse, receiveEmailResponseMsg) =>{
	return {
		type: actionTypes.RECEIVE_EMAIL_SUCCESS,
		receiveEmailResponse: receiveEmailResponse,
		receiveEmailResponseMsg: receiveEmailResponseMsg
	}
}

export const receiveEmailFail  = (receiveEmailResponse, receiveEmailResponseMsg) =>{
	return {
		type: actionTypes.RECEIVE_EMAIL_FAIL,
		receiveEmailResponse: receiveEmailResponse,
		receiveEmailResponseMsg: receiveEmailResponseMsg
	}
}

export const sendOtpBackend = (formData) => {
	return {
		type:actionTypes.SENT_OTP_BACKEND,
		formData: formData,
	}
}

