import React, {Component, PureComponent} from 'react';
import SignupView from '../../../views/signup/Signup';
import DSUInputField from '../../common/DSUInputField';
import DSUButton from '../../common/DSUButton';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';
import OtpInput from 'react-otp-input';

//import FormValidator from '../../../utils/FormValidator';

class EmailOtp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emailOrphone: "",
            otp: "",
            validation: {
                validEmailOrPhone:"",
                validOtp:""
            }
        };
    }
  


    handleChange = event => {
        console.log(event.target.value)
        let email = event.target.value
        this.setState(prevState => {
                        return {emailOrphone:email}
                    })
        // const re = /^[0-9\b]+$/;
        // const value = event.target.value;
        // if (value === '' || re.test(value)) {
        //     console.log(event.target.name)
        //    this.setState({value})
        // }
    };
    submitEmailOrPhone = () =>{
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.emailOrphone) || this.state.emailOrphone.match(/^\d{10}$/))
        {
            let newValidationState = {...this.state.validation, validEmailOrPhone:""}
            this.setState((prevState) => {
                return {validation: newValidationState};
            });
            this.props.SendEmailBackend({emailOrPhone:this.state.emailOrphone})
        }else{
            let newValidationState = {...this.state.validation, validEmailOrPhone:"Please enter valid email or phone"}
            this.setState((prevState) => {
                return {validation: newValidationState};
            });
            console.log('Not a valid phone or email')
            console.log(this.state)
        }
        //this.forceUpdate()
    }

    submitOtp = () =>{
        console.log(this.state.otp)
    }
    handleChangeOtp = otpdig =>{
        // console.log(otpdig)
        // var updatedOtp = this.state.otp+otpdig
        // console.log(updatedOtp)
        this.setState((prevState) => {
            return {otp: otpdig};
        });
        this.forceUpdate()
    }
    render(){
     return(
         <React.Fragment>
             <SignupView>
                    <div className="row">
                        <div className="col-md-3 col-sm-3"></div>
                        <h4 className="col-md-6 col-sm-6" style={{color:"#0062cc",marginTop:"2%"}}>Sign up!</h4>
                        <div className="col-md-3 has-success col-sm-3">                           
                            <img className="img-fluid pull-right" style={{marginTop:"5%"}} src="./AIG_logo.png"/>
                        </div>
                      
                        <div className=" col-md-12 col-sm-12">
                            <span>Provide your email or mobile phone </span>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className=" col-md-12 col-sm-12">
                            <label className="control-label col-md-12"  style={{paddingLeft: "0px"}}>Email or Phone</label>
                            <DSUInputField  type = "text" className = "form-control col-md-10" 
                                style={{display: "inline",marginRight:"3px"}}  
                                name ="emailOrphone" value={this.state.emailOrphone} handleChange={this.handleChange} />
                            <DSUButton className="btn btn-default col-md-1" type="button" handleSubmit={this.submitEmailOrPhone} 
                            disabled={this.props.sendDisable}><i className="fa fa-paper-plane-o" aria-hidden="true"></i></DSUButton>
                            {this.props.receiveEmailResponseMsg}
                            <span className="error">{this.state.validation.validEmailOrPhone}</span>
                            <br/>
                            <label className="control-label  col-md-12" style={{paddingLeft: "0px"}}>One Time Passcode</label>
                            <br />
                            {/* <DSUInputField type="text" name="number" className="form-control"  style={{width: "13%", display: "inline"}}/>
                            <DSUInputField type="text" title="Only digits" className="form-control"  style={{width: "13%",display: "inline",paddingLeft:"10px",marginLeft:"1px"}} />
                            <DSUInputField type="text" title="Only digits" className="form-control"  style={{width: "13%",display: "inline",marginLeft:"1px"}} />
                            <DSUInputField type="text" title="Only digits" className="form-control"  style={{width: "13%",display: "inline",marginLeft:"1px"}} />
                            <DSUInputField type="text" title="Only digits" className="form-control"  style={{width: "13%",display: "inline",marginLeft:"1px"}} />
                            <DSUInputField type="text" title="Only digits" className="form-control"  style={{width: "13%",display: "inline",marginLeft:"1px",marginRight:"3px"}} /> */}
                            <div className="form-inline">
                                <div className="form-group">
                                    <OtpInput
                                        onChange={otp => {this.handleChangeOtp(otp)}}
                                        numInputs={6}
                                        separator={<span>-</span>}
                                        //isInputNum={true}
                                        value={this.state.otp}
                                        inputStyle="form-control otpinput"
                                        
                                    />
                                </div>
                                <DSUButton className="btn btn-default col-md-1" 
                                    disabled={this.props.otpDisable}
                                    type="button"
                                    handleSubmit={this.submitOtp} 
                                    ><i className="fa fa-external-link" aria-hidden="true"></i>
                                </DSUButton>
                            </div>
                            
                            
                            
                            
                        </div>

                    </div>
                    <div className=" col-md-12 col-sm-12" style={{textAlign: "left",fontSize: "95%"}}>
                        <br/> Already have a account! Simply <a href="/login"><u>Sign in</u></a>
                        <hr />
                    </div>
                    <div className=" col-md-12 col-sm-12" style={{fontSize: "80%"}}>
                        1. Enter your SMS enabled phone or Email address that you can access now for one time passcode.
                        <br/>2. Save your application by entering the received code
                        <hr />
                    </div>
                    <div className=" col-md-12 col-sm-12" style={{fontSize: "80%"}}>
                        Your details are used oly for login and identification purpose. if you provide a phone number, ensure that you are able to receive text message. <u>Operator change may apply</u>
                        <hr />
                    </div>
             </SignupView>
         </React.Fragment>
     )   
    }
}
const mapStateToProps = state =>{
    return {
        receiveEmailOtpResponse: state.signupotp.receiveEmailOtpResponse,
        receiveEmailResponseMsg: state.signupotp.receiveEmailResponseMsg,
        sendDisable: state.signupotp.sendDisable,
        otpDisable: state.signupotp.otpDisable
    }
}
const mapDispatchToProps = dispatch=>{
    return{
        SendEmailBackend :(RequestData)=>dispatch(actions.sendEmailBackend(RequestData))
    }
}


export default connect(mapStateToProps, mapDispatchToProps) (EmailOtp)
