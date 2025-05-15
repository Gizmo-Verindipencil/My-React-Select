"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

import classes from "./table-overlay-incremental-search-select.module.scss";

interface TableOverlayIncrementalSearchSelectProps {
  name: string;
  options: { value: string; labels: string[] }[];
  label?: string;
}

const TableOverlayIncrementalSearchSelect: React.FC<
  TableOverlayIncrementalSearchSelectProps
> = ({ name, options, label }) => {
  const { register, setValue, watch } = useFormContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredOptions(options);
      return;
    }
    setFilteredOptions(
      options.filter((option) =>
        option.labels.some((label) =>
          label.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      ),
    );
  }, [searchTerm, options]);

  const reflectValueToSearchTerm = useCallback(
    (incoming: string) => {
      const destinations = options.filter((x) => x.value === incoming);
      const destination = destinations.length > 0 ? destinations[0] : null;
      if (destination) {
        setSearchTerm(destination.labels[0]);
        setValue(name, destination.value);
      } else {
        setValue(name, null);
      }
    },
    [options, name, setValue],
  );

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    reflectValueToSearchTerm(e.target.value);
  };

  const value = watch(name);
  useEffect(() => {
    reflectValueToSearchTerm(value);
  }, [value, options]);

  const handleOptionClick = (option: { value: string; labels: string[] }) => {
    setSearchTerm(option.labels[0]);
    setValue(name, option.value);
    setIsOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(name, "");
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
          <table className={classes.list}>
            <tbody>
              {filteredOptions.length > 0
                ? filteredOptions.map((option) => (
                    <tr
                      key={option.value}
                      className={classes.option}
                      onClick={() => handleOptionClick(option)}
                    >
                      {option.labels.map((label, index) => (
                        <td key={index} className={classes.cell}>
                          {label}
                        </td>
                      ))}
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TableOverlayIncrementalSearchSelect;
