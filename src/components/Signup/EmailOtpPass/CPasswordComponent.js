import React, {Component, PureComponent} from 'react';
import DSUInputField from '../../common/DSUInputField';
import DSUButton from '../../common/DSUButton';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';
//import FormValidator from '../../../utils/FormValidator';
import DSUFormPasswordField from '../../common/DSUFormPasswordField';

class CPasswordComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emailOrphone: "",
            otp: "",
            otpdisabled:true,
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
        if (/[_A-Za-z0-9\-]+(\.[_A-Za-z0-9\-]+)*@([A-Za-z0-9\-])+(\.[A-Za-z0-9\-]+)*((\.[A-Za-z0-9]{2,})|(\.[A-Za-z0-9]{2,}\.[A-Za-z0-9]{2,}))/.test(this.state.emailOrphone) || this.state.emailOrphone.match(/^\d{10}$/))
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
         this.props.SendOtpBackend({otp:this.state.otp})
        //console.log(this.state.otp)
    }
    handleChangeOtp = otpdig =>{
        // console.log(otpdig)
        // var updatedOtp = this.state.otp+otpdig
        // console.log(updatedOtp)
        var numbers = /^[0-9]+$/;
        if(otpdig.match(numbers)){
            this.setState((prevState) => {
                return {otp: otpdig};
            });
            if(otpdig.length==6){
                this.setState((prevState)=>{
                    return {otpdisabled:false}
                });
            }else{
                this.setState((prevState)=>{
                    return {otpdisabled:true}
                });
            }
        }
        this.forceUpdate()
    }
    render(){
     return(
         <React.Fragment>
                    <div className="row">
                        <div className="col-md-3 col-sm-3"></div>
                        <h4 className="col-md-6 col-sm-6" style={{color:"#0062cc",marginTop:"2%"}}>Sign up!</h4>
                        <div className="col-md-3 has-success col-sm-3">                           
                            <img className="img-fluid pull-right" style={{marginTop:"5%"}} src="./aig-logo-blue.png"/>
                        </div>
                      
                        <div className=" col-md-12 col-sm-12">
                            <span>Provide Requested details below.</span>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className=" col-md-12 col-sm-12">
                            <label className="control-label col-md-12"  style={{paddingLeft: "0px"}}>Enter Password</label>
                            <DSUInputField  type = "text" className = "form-control col-md-10" 
                                style={{display: "inline",marginRight:"3px"}}  
                                name ="newpassword"  />
                            <label className="control-label  col-md-12" style={{paddingLeft: "0px"}}>Retype password</label>
                            <br />
                            <div className="form-inline">
                            <DSUFormPasswordField  type = "password" className = "form-control col-md-10" style={{display: "inline",marginRight:"3px"}}
                                name ="password"/>
                                <DSUButton className="btn btn-default col-md-1" 
                                    disabled={this.state.otpdisabled}
                                    type="button"
                                    handleSubmit={this.submitOtp} 
                                    ><i className="fa fa-external-link" aria-hidden="true"></i>
                                </DSUButton>
                            </div>
                        </div>
                    </div>
                    <div className=" col-md-12 col-sm-12" style={{fontSize: "80%"}}>
                        1. Choose a Password.
                        <br/>2. Retype of password and save your application
                        <hr />
                    </div>
                    <div className=" col-md-12 col-sm-12" style={{fontSize: "80%"}}>
                        For your password to meet the minimum complexity criteria, ensure that it's a minimum of 8 characters in length 
                        with a combination of Upper Case Alphabet,Lower Case Alphabet, Numeric and Special Character
                        <hr />
                    </div>
         </React.Fragment>
     )   
    }
}
const mapStateToProps = state =>{
    return {
        receiveOtpResponseMsg: state.signupotp.receiveOtpResponseMsg,
        receiveEmailResponseMsg: state.signupotp.receiveEmailResponseMsg,
        sendDisable: state.signupotp.sendDisable,
        otpDisable: state.signupotp.otpDisable
    }
}
const mapDispatchToProps = dispatch=>{
    return{
        SendEmailBackend :(RequestData)=>dispatch(actions.sendEmailBackend(RequestData)),
        SendOtpBackend :(RequestData)=>dispatch(actions.sendOtpBackend(RequestData))
    }
}


export default connect(mapStateToProps, mapDispatchToProps) (CPasswordComponent)
