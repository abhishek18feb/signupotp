import React from 'react';
import { Route } from 'react-router-dom';
import EmailOtp from '../../components/Signup/EmailOtp/EmailOtp';
import EmailOtpPass from '../../components/Signup/EmailOtpPass/EmailOtp';

const SignupRoute = props => {
    return (
        <React.Fragment >
            <Route exact={true} path={`${props.match.path}/pass`} component={EmailOtpPass} />
            <Route exact={true} path={`${props.match.path}/`} component={EmailOtp} />
        </React.Fragment >
    )
}

export default SignupRoute;
