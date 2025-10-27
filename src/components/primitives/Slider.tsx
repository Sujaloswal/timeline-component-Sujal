import React from "react";

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export const Slider: React.FC<SliderProps> = ({ value, onChange, min = 0, max = 100 }) => {
  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
      style={{
        background: `linear-gradient(to right, #0ea5e9 0%, #0ea5e9 ${((value - min) / (max - min)) * 100}%, #e4e4e7 ${((value - min) / (max - min)) * 100}%, #e4e4e7 100%)`
      }}
      aria-label="Progress slider"
    />
  );
};

export default Slider;
