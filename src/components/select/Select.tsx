'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';

interface SelectProps {
  name: string;
  options: { value: string; label: string }[];
  label?: string;
}

const Select: React.FC<SelectProps> = ({ name, options, label }) => {
  const { register } = useFormContext();

  return (
    <div>
      {label && < label htmlFor={name}>{label}</label >}
      <select id={name} {...register(name)}>
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
