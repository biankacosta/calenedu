import React, { useState } from "react";
import TextField from "./TextField";
import { TextArea } from "./TextArea";
import DateField from "./DateField";
import TimeField from "./TimeField";
import Button from "./Button";
import { LuListTodo } from "react-icons/lu";

interface ActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description: string;
    date: string;
    time: string;
    all_grades: false;
  }) => void;
}

// Modal para adicionar uma nova atividade
const AddActivityModal: React.FC<ActivityModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  // Estados para armazenar os valores do formulário
  const [title, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  
  // Função chamada ao submeter o formulário
  const handleSubmit = () => {
    onSubmit({
      title,
      description,
      date: date.toISOString(),
      time,
      all_grades: false
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-[90vw] sm:w-full sm:max-w-lg">
          <div className="">
            <div className="bg-[rgb(105,64,185)] pt-5 pb-1 px-4 gap-2 sm:flex sm:flex-row">
              <LuListTodo className="text-white text-4xl" />
              <h2 className="text-2xl font-medium text-white mb-4 ">
                Adicionar Atividade
              </h2>
            </div>
            <div className="px-6 pt-4">

            <TextField
              type="text"
              label="Título"
              value={title}
              placeholder="Título da tarefa"
              onChange={(e) => setName(e.target.value)}
            />
            <TextArea
              label="Descrição"
              placeholder="(Opcional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <DateField selectedDate={date} onChange={setDate} />
              </div>
              <div className="w-full sm:w-1/2">
                <TimeField
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
            </div>
          </div>

          <div className="px-4 py-5 flex flex-col-reverse sm:flex-row sm:justify-between gap-3">
            <Button onClick={onClose} variant="outline">
              Cancelar
            </Button>
            <Button onClick={handleSubmit} className="">Salvar</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddActivityModal;
