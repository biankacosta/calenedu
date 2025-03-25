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
      <label className="block text-base font-medium text-gray-700">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 block p-2 text-gray-700 border border-gray-300 w-full bg-gray-100 h-11 rounded-xl hover:bg-blue-100 focus:bg-blue-100 placeholder-gray-400"
      />
    </div>
  );
};

export default TextField;