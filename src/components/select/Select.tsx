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

  /**
   * FIXME:
   * Select と同じ name が設定された LazyIncrementalSearchSelect が同じページにある場合
   * Select の初回選択は機能しない。選択したアイテムは反映されず、value も初期値のまま不変
   * この操作を一度行った後の選択は反映される。バグではあるが、同 name を複数のコントロール
   * に割り当てるケースがないと思われる為、一旦このバグは放置する
   */

  return (
    <div className={classes.container}>
      {label && (
        <label htmlFor={name} className={classes.label}>
          {label}
        </label>
      )}
      <select className={classes.select} {...register(name)}>
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
