import React, { Component, Fragment } from "react";
import {
  enrollRequest,
  OTPVerifyAction,
  saveQA,
  verifyVoice,
  patchPollVoiceURl,
  initiateOtpVerification,
  goToPage,
  updateSuccessData,
  voiceVerificationAfterSuccess,
  getProfileInfo
} from "./restutil/restutil";
import Statusbar from "./component/Statusbar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import RegVoice from "./component/RegVoice";
import RegisterQuestion from "./component/registerquestion";
import RegOTPEmailVerify from "./component/RegOTPEmailVerify";
import RegOTPSmsVerify from "./component/RegOTPSmsVerify";
import EditPhoneNumber from "./component/EditPhone";
import { ErrorInlineText } from "../common/ErrorInlineText";
import RegSuccess from "./component/RegSuccess";
import RegFailure from "./component/RegFailure";

import {
  OTP_EMAIL,
  OTP_SMS,
  TWO_FA_ENROLL,
  VOICE,
  SUCCESS_REGISTER,
  FAILURE_REGISTER,
  EDIT_PHONE
} from "./actionstype/types";
import { Field, reduxForm } from "redux-form";
import DSUFormTextField from "../../components/DSUFormTextField";
import DSUFormInputField from "../../components/DSUFormInputField";
import DSUFormPasswordField from "../../components/DSUFormPasswordField";

import {
  required,
  validate,
  validEmailAddress,
  emailMustMatch,
  passwordsMustMatch,
  checkPasswordConditions,
  validPhoneNumber,
  validCountryCode,
  minLength1,
  minLength8,
  maxLength40,
  maxLength50,
  validName,
  validUserName,
  validNoConsecutiveNos,
  validPassword
} from "./../common/Validation";
import DSUFormSelectField from "../../components/DSUFormSelectField";
import CheckBoxUtil from "../../components/CheckBoxUtil";
//import "../../css/tooltip.css";
import { SET_JSON_DATA } from "../../action/type";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smsEnabledCheckBox: null,
      forceSetupCheckBox: null,
      showErrorAtBottom: false,
      serviceCallSubmit: false,
      errorMessage: "Generic error",
      reloadFlag: true,
      registerField: [],
      forceStepUp: {
        type: "checkbox",
        name: "force_stepup",
        id: "forcestepup",
        label: this.props.jsonData.mainPage.textLabel.forceSetup,
        fieldStatus: this.props.appAttributes.showForceStepOptionField
          ? true
          : false
      },
      smsEnabled: {
        type: "checkbox",
        name: "isSmsEnabled",
        id: "isSmsEnabled",
        label: this.props.jsonData.mainPage.textLabel.isSmsEnabled
      },
      passwordVal: {
        displayVal: "none",
        //startWithLetter:false,
        uppercase: false,
        lowercase: false,
        specialchar: false,
        numeral: false,
        minchar: false,
        maxchar: true,
        valid: false,
        moreThanThreeSameLowerCaseCharacter:false,
        moreThanThreeSameUpperCaseCharacter:false,
        moreThanThreeSameNumber:false,
        moreThanThreeSameSpecialCharacter:false
      }
    };
  }

  componentDidMount() {
    if (this.state.reloadFlag) {
      if (this.props.queryData.email) {
        try {
          this.props.actions
            .getProfileInfo(atob(this.props.queryData.email))
            .then(res => {
              setTimeout(this.setState({ reloadFlag: false }), 100000);
            })
            .catch(error => {
              this.setState({ reloadFlag: false });
            });
        } catch (e) {
          this.setState({ reloadFlag: false });
        }
      } else {
        this.setState({ reloadFlag: false });
      }
    }

    let arr = [
      {
        id: "email",
        name: "email",
        label: this.props.jsonData.mainPage.textLabel.emailAddress,
        type: "text",
        fieldStatus: true,
        validation: [required, validEmailAddress, emailMustMatch]
      },
      {
        id: "emailConf",
        name: "emailConf",
        label: this.props.jsonData.mainPage.textLabel.reenterEmailAddress,
        validation: [required, emailMustMatch, validEmailAddress],
        type: "text",
        fieldStatus: this.props.appAttributes.showReenterUserNameField
          ? true
          : false
      },
      {
        id: "userName",
        name: "userName",
        label: this.props.jsonData.mainPage.textLabel.userName,
        validation: [
          required,
          minLength8,
          maxLength50,
          validUserName,
          validNoConsecutiveNos
        ],
        type: "text",
        fieldStatus: this.props.appAttributes.showUserNameField ? true : false
      },
      {
        id: "firstName",
        name: "firstName",
        label: this.props.jsonData.mainPage.textLabel.firstName,
        //parentDivClass : "dsu-col-lg-6 dsu-col-md-6",
        type: "text",
        fieldStatus:
          this.props.appConfig.showFirstNameField != undefined
            ? this.props.appConfig.showFirstNameField
            : true,
        validation: [required, minLength1, maxLength40, validName]
      },
      {
        id: "lastName",
        name: "lastName",
        label: this.props.jsonData.mainPage.textLabel.lastName,
        // parentDivClass : "dsu-col-lg-6 dsu-col-md-6",
        validation: [required, minLength1, maxLength40, validName],
        type: "text",
        fieldStatus:
          this.props.appConfig.showLastNameField != undefined
            ? this.props.appConfig.showLastNameField
            : true,
        validation: [required, minLength1, maxLength40, validName]
      },
      {
        id: "password",
        name: "password",
        label: this.props.jsonData.mainPage.textLabel.password,
        validation: [required, validPassword],
        type: "password",
        tooltip:this.props.passwordPolicies!=undefined?true:false
      },
      {
        id: "rePassword",
        name: "rePassword",
        label: this.props.jsonData.mainPage.textLabel.reenterPassword,
        validation: [required, passwordsMustMatch],
        type: "password"
      },
      {
        id: "countryCode",
        name: "countryCode",
        label: this.props.jsonData.mainPage.textLabel.countryCode,
        validation: [required, validCountryCode],
        type: "select",
        // options: this.props.appAttributes.countries.map((country, index) => {
        //   return country.name + "(" + country.code + ")";
        // })
        options: this.props.appAttributes.countries
      },
      {
        id: "phoneNumber",
        name: "phoneNumber",
        label: this.props.jsonData.mainPage.textLabel.phoneNumber,
        parentDivClass: "dsu-col-6",
        validation: [required, validPhoneNumber],
        type: "text"
      }
    ];

    this.setState({ registerField: arr });
  }
  validateUserInput = () => {
    const { data } = this.props;
    const { reEnteredPassword } = this.state;

    if (data.password !== reEnteredPassword) {
      this.setState({
        showErrorAtBottom: true,
        errorMessage: "Password should match"
      });
      return true;
    }
    if (data.phone_numbers[0].country_code === "") {
      this.setState({
        showErrorAtBottom: true,
        errorMessage: "Please Select the country code"
      });
      return true;
    }

    return false;
  };

  formSubmission = val => {
    var emailValue =
      this.props.queryData.email.length > 0
        ? atob(this.props.queryData.email)
        : val.email;
    let payload = {
      email: val.email.replace(' ',''),
      password: val.password.replace(' ',''),
      first_name: val.firstName,
      last_name: val.lastName,
      username: val.userName,
      force_stepup: val.force_stepup ? val.force_stepup : false,
      phone_numbers: [
        {
          is_primary: true,
          country_code: val.countryCode,
          is_sms_enabled: val.isSmsEnabled ? val.isSmsEnabled : false,
          number: val.phoneNumber
        }
      ]
    };

    if (payload.first_name == undefined) delete payload.first_name;
    if (payload.last_name == undefined) delete payload.last_name;
    this.setState({
      showErrorAtBottom: false,
      serviceCallSubmit: true
    });

    return this.props.actions
      .enrollRequest(payload)
      .then(success => {
        this.setState({
          showErrorAtBottom: false,
          serviceCallSubmit: false
        });
      })
      .catch(err => {
        this.setState({
          showErrorAtBottom: true,
          serviceCallSubmit: false,
          errorMessage: typeof err === "string" ? err : JSON.stringify(err)
        });
      });
  };

  hasError() {
    if (this.state.showErrorAtBottom === true) {
      return <ErrorInlineText errorMessage={this.state.errorMessage} />;
    }
  }
  registerContainer() {
    const {
      serviceCallSubmit,
      registerField,
      forceStepUp,
      smsEnabled
    } = this.state;

    const { pristine, submitting, handleSubmit, jsonData } = this.props;
    const { showUserNameField } = this.props.appAttributes;
    const hasError = this.hasError();
    if (!showUserNameField) {
      delete registerField[2];
    }

    let matchPattern = {};
    let tooltipmsg = {};
    if(this.props.passwordPolicies!=undefined)
    this.props.passwordPolicies.map(value => {
      matchPattern[value.rulename] = value.pattern;
      tooltipmsg[value.rulename] = value.rule;
    });
    return (
      <Fragment>
        <form onSubmit={handleSubmit(this.formSubmission)}>
          {registerField.map((field, index) => {
            if (field.id == "phoneNumber") {
              return (
                <div>
                  <Field
                    key={index}
                    component={DSUFormTextField}
                    parentDivClass={
                      field.parentDivClass
                        ? field.parentDivClass
                        : "dsu-col-lg-12 dsu-col-md-12"
                    }
                    type={field.type}
                    name={field.name}
                    label={field.label}
                    validate={field.validation}
                    autoFocus={field.autoFocus}
                  >
                    {" "}
                  </Field>
                  <CheckBoxUtil
                    key={smsEnabled.index}
                    name={smsEnabled.name}
                    label={smsEnabled.label}
                    alignClass={true}
                    initChecked={
                      this.props.initialValues != undefined
                        ? this.props.initialValues.isSmsEnabled
                        : false
                    }
                    oneTimeLoad={this.state.reloadFlag}
                  />
                </div>
              );
            } else if (
              (field.id === "email" || field.id === "emailConf") &&
              field.fieldStatus
            ) {
              return (
                <Field
                  key={index}
                  component={DSUFormTextField}
                  parentDivClass={
                    field.parentDivClass
                      ? field.parentDivClass
                      : "dsu-col-lg-12 dsu-col-md-12"
                  }
                  type={field.type}
                  name={field.name}
                  label={field.label}
                  validate={field.validation}
                  autoFocus={field.autoFocus}
                  disabled={
                    this.props.initialValues != undefined ? true : false
                  }
                >
                  {" "}
                </Field>
              );
            } else if (field.id === "userName" && field.fieldStatus) {
              return (
                <Field
                  key={index}
                  component={DSUFormTextField}
                  parentDivClass={
                    field.parentDivClass
                      ? field.parentDivClass
                      : "dsu-col-lg-12 dsu-col-md-12"
                  }
                  type={field.type}
                  name={field.name}
                  label={field.label}
                  validate={field.validation}
                  autoFocus={field.autoFocus}
                >
                  {" "}
                </Field>
              );
            } else if (field.id === "firstName" && field.fieldStatus) {
              return (
                <Field
                  key={index}
                  component={DSUFormTextField}
                  parentDivClass={
                    field.parentDivClass
                      ? field.parentDivClass
                      : "dsu-col-lg-12 dsu-col-md-12"
                  }
                  type={field.type}
                  name={field.name}
                  label={field.label}
                  validate={field.validation}
                  autoFocus={field.autoFocus}
                >
                  {" "}
                </Field>
              );
            } else if (field.id === "lastName" && field.fieldStatus) {
              return (
                <Field
                  key={index}
                  component={DSUFormTextField}
                  parentDivClass={
                    field.parentDivClass
                      ? field.parentDivClass
                      : "dsu-col-lg-12 dsu-col-md-12"
                  }
                  type={field.type}
                  name={field.name}
                  label={field.label}
                  validate={field.validation}
                  autoFocus={field.autoFocus}
                >
                  {" "}
                </Field>
              );
            } else if (field.type === "text" && field.fieldStatus) {
              return (
                <Field
                  key={index}
                  component={DSUFormTextField}
                  parentDivClass={
                    field.parentDivClass
                      ? field.parentDivClass
                      : "dsu-col-lg-12 dsu-col-md-12"
                  }
                  type={field.type}
                  name={field.name}
                  label={field.label}
                  validate={field.validation}
                  autoFocus={field.autoFocus}
                >
                  {" "}
                </Field>
              );
            }

            if (field.type === "select") {
              return (
                <Field
                  key={index}
                  component={DSUFormSelectField}
                  parentDivClass={
                    field.parentDivClass
                      ? field.parentDivClass
                      : "dsu-col-lg-12 dsu-col-md-12"
                  }
                  type={field.type}
                  name={field.name}
                  label={field.label}
                  validate={field.validation}
                  autoFocus={field.autoFocus}
                  items={field.options}
                >
                  {" "}
                </Field>
              );
            }

            if (field.type === "password") {
              if (field.name === "password" && field.tooltip) {
                return (
                  <Field
                    key={index}
                    component={DSUFormPasswordField}
                    parentDivClass={
                      field.parentDivClass
                        ? field.parentDivClass
                        : "dsu-col-lg-12 dsu-col-md-12"
                    }
                    type={field.type}
                    name={field.name}
                    label={field.label}
                    validate={field.validation}
                    autoFocus={field.autoFocus}
                    matchPattern={matchPattern}
                    tooltipmsg={tooltipmsg}
                  />
                );
              } else {
              return (
                <Field
                  key={index}
                  component={DSUFormTextField}
                  parentDivClass={
                    field.parentDivClass
                      ? field.parentDivClass
                      : "dsu-col-lg-12 dsu-col-md-12"
                  }
                  type={field.type}
                  name={field.name}
                  label={field.label}
                  validate={field.validation}
                  autoFocus={field.autoFocus}
                />
              );
            }
          }
          })}

          {forceStepUp.fieldStatus ? (
            <div className="dsu-row dsu-form-row">
              <CheckBoxUtil
                key={forceStepUp.index}
                name={forceStepUp.name}
                label={forceStepUp.label}
              />
            </div>
          ) : null}

          {hasError}

          <div className="dsu-row dsu-form-row">
            <div className="dsu-col-lg-12 dsu-col-md-12 text-center">
              <button
                className="dsu-bttn green"
                disabled={pristine || submitting || serviceCallSubmit}
              >
                {serviceCallSubmit
                  ? (this.props.jsonData.mainPage.buttonLabel.processing ? this.props.jsonData.mainPage.buttonLabel.processing : "Processing")
                  : this.props.jsonData.mainPage.buttonLabel.register}
              </button>
            </div>
          </div>
        </form>
      </Fragment>
    );
  }

  regOTPEmailVerify() {
    return <RegOTPEmailVerify {...this.props} />;
  }
  regOTPSmsVerify() {
    return <RegOTPSmsVerify {...this.props} />;
  }
  registerVoice() {
    return <RegVoice {...this.props} />;
  }
  registerQuestion() {
    return <RegisterQuestion {...this.props} />;
  }

  registerSuccess() {
    return <RegSuccess {...this.props} />;
  }
  registerFailure() {
    return <RegFailure {...this.props} />;
  }
  registerEditPhone() {
    return <EditPhoneNumber {...this.props} />;
  }

  render() {
    const {
      data: { page }
    } = this.props;

    let connectToBeRendered;
    if (page === OTP_EMAIL) {
      connectToBeRendered = this.regOTPEmailVerify();
    } else if (page == OTP_SMS) {
      connectToBeRendered = this.regOTPSmsVerify();
    } else if (page === TWO_FA_ENROLL) {
      connectToBeRendered = this.registerQuestion();
    } else if (page == VOICE) {
      connectToBeRendered = this.registerVoice();
    } else if (page == EDIT_PHONE) {
      connectToBeRendered = this.registerEditPhone();
    } else if (page == SUCCESS_REGISTER) {
      connectToBeRendered = this.registerSuccess();
    } else if (page == FAILURE_REGISTER) {
      connectToBeRendered = this.registerFailure();
    } else {
      connectToBeRendered = this.registerContainer();
    }

    return (
      <section>
        <Statusbar {...this.props} />
        {connectToBeRendered}
      </section>
    );
  }
}

Register = reduxForm({
  form: "DSURegisterForm",
  enableReinitialize: true,
  touchOnBlur: false,
  validate
})(Register);

const mapStateToProps = state => {
  const {
    storeDetails,
    storeDetails: { success },
    appData: { appAttributes },
    jsonStoreData: { registration, queryData, appConfig,passwordPolicies },
    storeDetails: { initialValues }
  } = state;
  return {
    data: storeDetails,
    jsonData: registration,
    success,
    appConfig,
    queryData,
    appAttributes,
    initialValues,
    passwordPolicies
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        enrollRequest,
        updateSuccessData,
        goToPage,
        OTPVerifyAction,
        saveQA,
        verifyVoice,
        initiateOtpVerification,
        voiceVerificationAfterSuccess,
        patchPollVoiceURl,
        getProfileInfo
      },
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

