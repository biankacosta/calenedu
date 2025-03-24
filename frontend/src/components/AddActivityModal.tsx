import React, { useState } from "react";
import TextField from "./TextField";
import DateField from "./DateField";
import TimeField from "./TimeField";
import Button from "./Button";

interface ActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; description: string; date: string; time: string }) => void;
}

const AddActivityModal: React.FC<ActivityModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");

  const handleSubmit = () => {
    onSubmit({
      title,
      description,
      date: date.toISOString(),
      time,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Adicionar Atividade</h2>
        <TextField label="Nome" value={title} onChange={(e) => setName(e.target.value)} />
        <TextField label="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} />
        <DateField selectedDate={date} onChange={setDate} />
        <TimeField value={time} onChange={(e) => setTime(e.target.value)} />

        <div className="mt-4 flex justify-end">
          <Button onClick={handleSubmit}> Salvar </Button>
          <Button onClick={onClose}> Cancelar </Button>
        </div>
      </div>
    </div>
  );
};

export default AddActivityModal;