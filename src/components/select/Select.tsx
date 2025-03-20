"use client";

import React from "react";
import { useFormContext } from "react-hook-form";

import classes from "./select.module.scss";

interface SelectProps {
  name: string;
  options: { value: string; label: string }[];
  label?: string;
}

const Select: React.FC<SelectProps> = ({ name, options, label }) => {
  const { register } = useFormContext();

  return (
    <div className={classes.container}>
      {label && (
        <label htmlFor={name} className={classes.label}>
          {label}
        </label>
      )}
      <select id={name} className={classes.select} {...register(name)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
