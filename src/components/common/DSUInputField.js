import React from "react";
import classNames from "classnames";

const DSUInputField = ({
  input,
  id,
  name,
  style,
  className,
  type,
  title,
  handleChange
}) => {
  

  return (
          <input
            {...input}
            type={type}
            name = {name}
            className={className}
            style={style}
            title={title}
            onChange = {event=>{handleChange(event)}}
          />
  );
};

export default DSUInputField;

