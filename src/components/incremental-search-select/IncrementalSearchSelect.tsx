"use client";

import React, { useState, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

import classes from "./incremental-search-select.module.scss";

interface IncrementalSearchSelectProps {
  name: string;
  options: { value: string; label: string }[];
  label?: string;
}

const IncrementalSearchSelect: React.FC<IncrementalSearchSelectProps> = ({
  name,
  options,
  label,
}) => {
  const { register, setValue } = useFormContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredOptions(options);
      return;
    }
    setFilteredOptions(
      options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [searchTerm, options]);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const destinations = options.filter((x) => x.value === e.target.value);
    const destination = destinations.length > 0 ? destinations[0] : null;
    if (destination) {
      setSearchTerm(destination.label);
      setValue(name, destination.value);
      setSelectedValue(destination.value);
    }
  };

  const handleOptionClick = (option: { value: string; label: string }) => {
    setSearchTerm(option.label);
    setValue(name, option.value);
    setSelectedValue(option.value);
    setIsOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchFocus = () => {
    setIsOpen(true);
  };

  const handleSearchBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      if (!selectRef.current?.contains(e.relatedTarget)) {
        setIsOpen(false);
      }
    }, 100);
  };

  return (
    <div className={classes.container} ref={selectRef}>
      {label && (
        <label htmlFor={name} className={classes.label}>
          {label}
        </label>
      )}
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <input
          type="text"
          id={name}
          className={classes.select}
          value={searchTerm}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
          onChange={handleSearchChange}
          autoComplete="off"
        />
        <input
          type="text"
          hidden
          {...register(name, {
            onChange: handleValueChange,
          })}
        />
        {isOpen && (
          <ul className={classes.list}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  className={classes.option}
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                </li>
              ))
            ) : (
              <li className={`${classes.option} ${classes.disabled}`}>
                No options
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default IncrementalSearchSelect;
