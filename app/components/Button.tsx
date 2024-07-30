"use client";
import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string | undefined;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative text-center cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full
    ${
      outline
        ? "border hover:bg-slate-50 border-black bg-transparent text-black"
        : "bg-rose-500 text-white border-rose-500"
    }
    ${small ? "py-1 font-light" : "font-semibold py-3"}
    `}
    >
      {Icon && <Icon size={20} className="absolute left-4" />}
      {disabled ? 'Loading...' : label}
    </button>
  );
};

export default Button;
