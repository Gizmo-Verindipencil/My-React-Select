import React from "react";

import classes from "./reset-button.module.scss";

interface ResetButtonProps {
  onClick: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onClick }) => {
  return (
    <button type="button" className={classes.button} onClick={onClick}>
      RESET
    </button>
  );
};

export default ResetButton;
