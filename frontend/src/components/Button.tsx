import React from 'react';

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: string;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ type = "button", onClick, className, children, disabled }) => {
  return (
    <button type={type} onClick={onClick} className={className="btn btn-primary"}>
      {children}
    </button>
  );
};

export default Button;