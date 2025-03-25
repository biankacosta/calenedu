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
    <button type={type} onClick={onClick} className={className="rounded-lg border border-transparent px-[1.2em] py-[0.6em] text-base font-medium font-sans bg-primary cursor-pointer duration-150 hover:bg-[rgb(42, 0, 126)] focus:outline focus:outline-4 focus:outline-[auto] focus:outline-[webkit-focus-ring-color]"}>
      {children}
    </button>
  );
};

export default Button;