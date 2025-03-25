import React from "react";

interface CheckboxFieldProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  checked,
  onChange,
}) => {
  return (
    <label className="flex items-center cursor-pointer">
      <div className={`relative w-8 h-8 border-2 rounded-md ${checked ? 'border-purple-600 bg-purple-600' : 'border-gray-300'}`}>
        {checked && (
          <svg 
            className="absolute self-baseline inset-0 w-full h-full text-white p-0.5" 
            fill="none" 
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="absolute opacity-0 w-full h-full cursor-pointer"
        />
      </div>
      <span className="text-base text-gray-700"></span>
    </label>
  );
};

export default CheckboxField;
