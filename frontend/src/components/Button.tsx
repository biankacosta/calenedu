import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: string;
  className?: string;
  disabled?: boolean;
  variant?: "primary" | "outline" | "warning";
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  className = "",
  variant = "primary", 
  children,
  disabled,
}) => {
  const baseClasses = "middle none center m-2 rounded-lg px-6 py-2 font-medium cursor-pointer transition-colors active:opacity-[0.85]";
  const variantClasses = {
    primary: "bg-primary hover:bg-purple-700 text-white",
    outline: "text-[rgb(105,64,185)] border border-[rgb(105,64,185)] hover:bg-[rgb(105,64,185)] hover:text-white",
    warning: "bg-red-500 hover:bg-pink-600 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={
        `${baseClasses} ${variantClasses[variant]} ${className}`
      }
    >
      {children}
    </button>
  );
};

export default Button;
