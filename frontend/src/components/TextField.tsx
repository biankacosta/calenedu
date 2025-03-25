import React from "react";

interface TextFieldProps {
  type: "text" | "email" | "password" | "number";
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const TextField: React.FC<TextFieldProps> = ({type, label, value, onChange, placeholder }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 p-2 border border-gray-300 rounded w-full"
      />
    </div>
  );
};

export default TextField;