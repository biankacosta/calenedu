interface TextAreaProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    rows?: number;
  }
  
  export const TextArea: React.FC<TextAreaProps> = ({ 
    label, 
    value, 
    onChange, 
    placeholder,
    rows = 3 
  }) => {
    return (
      <div className="mb-4">
        <label className="block text-base font-medium text-gray-700">{label}</label>
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className="mt-1 block p-2 text-gray-700 border border-gray-300 w-full bg-gray-100 rounded-xl hover:bg-blue-100 focus:bg-blue-100 placeholder-gray-400 min-h-[100px]"
        />
      </div>
    );
  };