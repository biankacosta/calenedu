import React from "react";

interface TimeFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TimeField: React.FC<TimeFieldProps> = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Hora</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="HH:mm"
        className="mt-1 p-2 border border-gray-300 rounded w-full"
      />
    </div>
  );
};

export default TimeField;