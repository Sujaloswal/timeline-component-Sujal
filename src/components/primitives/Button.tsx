import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button
      {...rest}
      className="px-3 py-1.5 rounded-md bg-primary-500 text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
    >
      {children}
    </button>
  );
};

export default Button;

