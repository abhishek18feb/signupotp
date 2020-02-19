import React, { useState } from "react";
import classNames from "classnames";

const DSUFormPasswordField = ({
  name,
  input,
  label,
  type,
  minLength,
  maxLength,
  disabled,
  id,
  value,
  autoFocus,
  onKeyPress,
  parentDivClass,
  className,
  matchPattern,
  tooltipmsg,
}) => {
  // const inputClasses = classNames(
  //   "dsu-fl-input",
  //   { "dsu-fl-valid": input.value && !invalid },
  //   { "dsu-fl-invalid": touched && invalid },
  //   className
  // );
  // const errMsgClasses = classNames(
  //   { "dsu-fl-error-msg": error },
  //   { "dsu-fl-error-show": invalid },
  //   { "dsu-has-error-text": error && touched }
  // );

  // const errored = () => {
  //   if (touched && error) {
  //     return "dsu-has-error";
  //   }
  // };

  const [passwordVal, setPasswordValidation] = useState({
    displayVal: "none",
    //startWithLetter:false,
    uppercase: false,
    lowercase: false,
    specialChar: false,
    numeral: false,
    minchar: false,
    maxchar: true,
    valid: false
  });

  const [password, setPassword] = useState("");
  const hideValidationBox = () => {
    setPasswordValidation(passwordVal => {
      return { ...passwordVal, displayVal: "none" };
    });
  }
  const checkPasswordHandler = event => {
    setPassword(event.target.value);
    let pass = event.target.value;
    setPasswordValidation(passwordVal => {
      return { ...passwordVal, displayVal: "block" };
    });
    var lowerCaseLetters = new RegExp(matchPattern.lowercase);
    setPasswordValidation(passwordVal => {
      return { ...passwordVal, lowercase: pass.match(lowerCaseLetters) };
    });

    //Validate capital letters
    var upperCaseLetters = new RegExp(matchPattern.uppercase);
    setPasswordValidation(passwordVal => {
      return { ...passwordVal, uppercase: pass.match(upperCaseLetters) };
    });

    //Validate a number
    var numbers = new RegExp(matchPattern.numeral);
    setPasswordValidation(passwordVal => {
      return { ...passwordVal, numeral: pass.match(numbers) };
    });

    // Validate minimum length
    var regex = new RegExp(matchPattern.minchar);
    setPasswordValidation(passwordVal => {
      return { ...passwordVal, minchar: pass.length >= 8 };
    });

    // Validate maximum length
    var regex = new RegExp(matchPattern.maxchar);
    setPasswordValidation(passwordVal => {
      return { ...passwordVal, maxchar: pass.length < 50 };
    });

    //Validate Special Character
    var regex = new RegExp(matchPattern.specialchar);
    setPasswordValidation(passwordVal => {
      return { ...passwordVal, specialchar: pass.match(regex) };
    });
  };

  return (
    <div className="dsu-row dsu-form-row">
      <div className={parentDivClass}>
        <div
          className={`dsu-input-item fc-toggled dsu-col-lg-12 dsu-col-md-12`}
        >
          <label htmlFor={name}>{label}</label>
          <input
            {...input}
            type={type}
            //className={inputClasses}
            aria-label={label}
            id={id}
            autoFocus={autoFocus ? autoFocus : undefined}
            aria-required={true}
            minLength={minLength}
            maxLength={maxLength}
            disabled={disabled}
            onChange={event => checkPasswordHandler(event)}
            onMouseLeave={event => hideValidationBox(event)}
            value={password}
          />
          {/* {touched &&
            ((error && <div className={errMsgClasses}>{error}</div>) ||
              (warning && <div>{warning}</div>))} */}
          <div
            id="message"
            className="arrow_box"
            style={{ display: passwordVal.displayVal, width: "57%" }}
          >
            <h6>Password must contain the following:</h6>

            {/* <p id="startWith" className={passwordVal.startWithLetter?"valid":"invalid"}>start with letter</p> */}
            <p
              id="letter"
              className={passwordVal.lowercase ? "valid" : "invalid"}
            >
              {tooltipmsg.lowercase}
            </p>
            <p
              id="capital"
              className={passwordVal.uppercase ? "valid" : "invalid"}
            >
              {tooltipmsg.uppercase}
            </p>
            <p
              id="number"
              className={passwordVal.numeral ? "valid" : "invalid"}
            >
              {tooltipmsg.numeral}
            </p>
            <p
              id="length"
              className={passwordVal.minchar ? "valid" : "invalid"}
            >
              {tooltipmsg.minchar}
            </p>
            <p
              id="length"
              className={passwordVal.maxchar ? "valid" : "invalid"}
            >
              {tooltipmsg.maxchar}
            </p>
            <p
              id="specialchar"
              className={passwordVal.specialchar ? "valid" : "invalid"}
            >
              {tooltipmsg.specialchar}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSUFormPasswordField;
