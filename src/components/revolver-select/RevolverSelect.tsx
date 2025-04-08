"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  initialValue?: string;
};

const RevolverSelect: React.FC<Props> = ({ options, initialValue }) => {
  const [selected, setSelected] = useState<string>(
    initialValue ?? options[0]?.value,
  );
  const [focused, setFocused] = useState(false);

  const radius = 80; // px
  const centerX = 100;
  const centerY = 100;

  const selectedOption = options.find((o) => o.value === selected);

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  return (
    <div
      className="relative w-48 h-48"
      onMouseEnter={handleFocus}
      onMouseLeave={handleBlur}
    >
      {/* 中央の選択済み表示 */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="bg-white border border-gray-400 px-4 py-2 rounded-full shadow">
          {selectedOption?.label}
        </div>
      </div>

      {/* 回転アイテム */}
      <AnimatePresence>
        {focused &&
          options.map((option, index) => {
            const angle = (index / options.length) * 2 * Math.PI;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.button
                key={option.value}
                className="absolute px-3 py-1 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600"
                style={{
                  left: centerX + x,
                  top: centerY + y,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => setSelected(option.value)}
              >
                {option.label}
              </motion.button>
            );
          })}
      </AnimatePresence>
    </div>
  );
};

export default RevolverSelect;
