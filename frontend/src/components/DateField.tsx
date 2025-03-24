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
        <label className="block text-sm font-medium text-gray-700">Data</label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          className="mt-1 p-2 border border-gray-300 rounded w-full"
          placeholderText="Selecione uma data"
        />
      </div>
    );
  };
  
  export default DateField;