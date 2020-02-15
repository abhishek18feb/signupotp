import React, { Component, Fragment } from "react";

const DSUButton = props => {
  const {
    parentDivClassName,
    buttonClassName,
    label,
    labelProcessing,
    serviceCallSubmit,
    type,
    handleSubmit,
    disabled,
    ...rest
  } = props;

  return (
    <React.Fragment>
          <button
              type={type}
              className={buttonClassName}
              disabled={serviceCallSubmit}
              {...rest}
              onClick = {handleSubmit}
              disabled={disabled}
            >
              {props.children}
          </button>
    </React.Fragment>
  )
}

export default DSUButton;


// class DSUButton extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   static defaultProps = {
//     type: "submit",
//     serviceCallSubmit: false,
//     buttonClassName: "btn btn-default col-md-1",
//     labelProcessing: "Submitting....",
//     //parentDivClassName : "dsu-bttns-container dsu-text-center",
//     label :"Submit"
//   };

//   render() {
//     const {
//       parentDivClassName,
//       buttonClassName,
//       label,
//       labelProcessing,
//       serviceCallSubmit,
//       type,
//       ...rest
//     } = this.props;
//     return (
//             <button
//               type={type}
//               className={buttonClassName}
//               disabled={serviceCallSubmit}
//               {   ...rest}
//             >
//             </button>
//     );
//   }
// }

// export default DSUButton;

