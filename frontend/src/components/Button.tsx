import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, className, children }) => {
  return (
    <button onClick={onClick} className={className="btn btn-primary"}>
      {children}
    </button>
  );
};

export default Button;