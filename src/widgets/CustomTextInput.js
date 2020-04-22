import React, { Component } from "react";
import PropTypes from "prop-types";

export default class CustomTextInput extends Component {
  render() {
    const {
      name,
      type,
      placeholder,
      onChange,
      className,
      value,
      error,
      children,
      label
    } = this.props;

    return (
      <React.Fragment>
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          className={className}
          style={error && { border: "solid 1px red" }}
        />
      </React.Fragment>
    );
  }
}

CustomTextInput.defaultProps = {
  type: "text",
  className: ""
};

CustomTextInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "number", "password"]),
  className: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired
};
