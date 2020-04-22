import React from "react";
import styles from "../widgets/button.scss";

const CustomButton = ({ children, type, onClick }) => {
  return (
    <button className="details-button" onClick={onClick}>
      {children}
    </button>
  );
};
export default CustomButton;
