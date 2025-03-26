import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: string;
  className?: string;
  disabled?: boolean;
  variant?: "primary" | "outline" | "warning";
}

//Componente de botão
const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  className = "",
  variant = "primary", 
  children,
  disabled,
}) => {
  const baseClasses = "middle none center rounded-lg px-6 py-2 font-medium transition-colors";
  const variantClasses = {
    primary: "bg-primary hover:bg-[rgb(28,0,85)] text-white",
    outline: "text-[rgb(105,64,185)] border border-[rgb(105,64,185)] hover:bg-[rgb(105,64,185)] hover:text-white",
    warning: "bg-red-500 hover:bg-red-700 text-white",
  };

  const disabledClasses = "opacity-50 cursor-not-allowed";
  const enabledClasses = "cursor-pointer active:opacity-[0.85]";

  return (
    <button
      type={type}
      onClick={onClick}
      className={
        `${baseClasses} ${variantClasses[variant]} ${disabled ? disabledClasses : enabledClasses} ${className}`
      }
    >
      {children}
    </button>
  );
};

export default Button;
