import React from 'react';

interface ButtonProps {
  onClick: () => void;
  label: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, label, className }) => {
  return (
    <button onClick={onClick} className={className="btn btn-primary"}>
      {label}
    </button>
  );
};

export default Button;