import React from "react";

import classes from "./reset-button.module.scss";

interface ResetButtonProps {
  label: string;
  onClick: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ label, onClick }) => {
  return (
    <button type="button" className={classes.button} onClick={onClick}>
      {label}
    </button>
  );
};

export default ResetButton;
