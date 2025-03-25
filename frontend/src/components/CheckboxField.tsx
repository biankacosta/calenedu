import React from "react";

interface CheckboxFieldProps {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({ label, checked, onChange }) => {
  return (
    <div className="flex items-center mt-4">
      <input
        type="checkbox"
        id="checkbox-field"
        checked={checked}
        onChange={onChange}
        className="mr-2"
      />
      <label htmlFor="checkbox-field" className="text-sm text-gray-700">
        {label}
      </label>
    </div>
  );
};

export default CheckboxField;