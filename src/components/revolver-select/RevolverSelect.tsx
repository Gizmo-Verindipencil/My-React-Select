"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import classes from "./revolver-select.module.scss";

interface RevolverSelectProps {
  name: string;
  options: { value: string; label: string }[];
  label?: string;
}

const RevolverSelect: React.FC<RevolverSelectProps> = ({
  name,
  options,
  label,
}) => {
  const { register, setValue, watch } = useFormContext();
  const selected = watch(name) ?? options[0]?.value;
  const [focused, setFocused] = useState(false);

  const selectedOption = options.find((o) => o.value === selected);
  const [width, height] = [450, 40];

  return (
    <div
      className={classes.container}
      onMouseEnter={() => setFocused(true)}
      onMouseLeave={() => setFocused(false)}
    >
      {label && (
        <label htmlFor={name} className={classes.label}>
          {label}
        </label>
      )}

      {/* フォームに値を渡す hidden input */}
      <input type="hidden" {...register(name)} value={selected} />

      {/* 中央の選択中表示 */}
      <div
        className={classes.select}
        style={{
          width: width,
          height: height,
          position: "relative",
          borderRadius: "7px",
          textAlign: "center",
          lineHeight: "200px",
        }}
      >
        <span className={classes.selected}>{selectedOption?.label}</span>

        {/* 回転式オプション表示 */}
        <AnimatePresence>
          {focused &&
            options.map((option, index) => {
              if (option.value === selected) return null;

              const angle = (index / options.length) * 2 * Math.PI;
              const radius = 80;
              const centerX = width / 2;
              const centerY = height / 2;

              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.button
                  key={option.value}
                  className={classes.option}
                  style={{
                    position: "absolute",
                    left: centerX + x,
                    top: centerY + y,
                    transform: "translate(-50%, -50%)",
                    zIndex: 5,
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onClick={() => setValue(name, option.value)}
                >
                  {option.label}
                </motion.button>
              );
            })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RevolverSelect;
