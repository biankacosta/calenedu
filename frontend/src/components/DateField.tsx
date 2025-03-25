import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateFieldProps {
  selectedDate: Date;
  onChange: (date: Date) => void;
}

const DateField: React.FC<DateFieldProps> = ({ selectedDate, onChange }) => {
    const handleDateChange = (date: Date | null) => {
      onChange(date || new Date());
    };
  
    return (
      <div className="mb-4">
        <label className="block text-base font-medium text-gray-700">Data</label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          className="mt-1 block p-2 text-gray-700 border border-gray-300 w-full bg-gray-100 h-11 rounded-xl hover:bg-blue-100 focus:bg-blue-100 placeholder-gray-400"
          placeholderText="Selecione uma data"
        />
      </div>
    );
  };
  
  export default DateField;