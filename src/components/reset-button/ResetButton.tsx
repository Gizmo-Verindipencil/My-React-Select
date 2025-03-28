import React from "react";
import { useFormContext } from "react-hook-form";

import classes from "./reset-button.module.scss";

const ResetButton: React.FC = () => {
  const { reset } = useFormContext();

  return (
    <button type="button" className={classes.button} onClick={() => reset()}>
      RESET
    </button>
  );
};

export default ResetButton;
