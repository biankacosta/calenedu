import React from "react";

// Componente de campo de entrada para seleção de horário
interface TimeFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TimeField: React.FC<TimeFieldProps> = ({ value, onChange }) => {
  return (
    <div className="mb-4 text-gray-700">
      <label className="block text-base font-medium text-gray-700">Hora</label>
      <input
        type="time"
        value={value}
        onChange={onChange}
        className="mt-1 block p-2 text-gray-700 border border-gray-300 w-full bg-gray-100 h-11 rounded-xl hover:bg-blue-100 focus:bg-blue-100 placeholder-gray-400"
        step="300"
      />
    </div>
  );
};

export default TimeField;