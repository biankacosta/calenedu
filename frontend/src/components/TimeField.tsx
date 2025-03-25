// TimeField.tsx
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
        type="time"
        value={value}
        onChange={onChange}
        className="mt-1 p-2 border border-gray-300 rounded w-full"
        step="300"
      />
    </div>
  );
};

export default TimeField;