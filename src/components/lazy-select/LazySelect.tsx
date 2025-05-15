"use client";

import React, { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

import classes from "./lazy-select.module.scss";

type option = { value: string; label: string };

interface LazySelectProps {
  name: string;
  fetch: () => Promise<option[]>;
  label?: string;
}

const LazySelect: React.FC<LazySelectProps> = ({ name, fetch, label }) => {
  const { register } = useFormContext();
  const loaded = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<option[]>([]);

  const handleFocus = async () => {
    if (loaded.current || isLoading) return;
    setIsLoading(true);
    setOptions(await fetch());
    setIsLoading(false);
    loaded.current = true;
  };

  return (
    <div className={classes.container}>
      {label && (
        <label htmlFor={name} className={classes.label}>
          {label}
        </label>
      )}
      <select
        id={name}
        className={`${classes.select} ${loaded.current || isLoading ? classes.loaded : ""}`}
        onFocus={handleFocus}
        {...register(name)}
      >
        {isLoading ? (
          <option>Loading</option>
        ) : loaded.current ? (
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
        ) : null}
      </select>
    </div>
  );
};

export default LazySelect;
