import React, { useState, useEffect } from "react";
import TextField from "./TextField";
import DateField from "./DateField";
import TimeField from "./TimeField";
import { TextArea } from "./TextArea";
import Button from "./Button";
import { CalendarEvent } from "../services/eventService";
import { LuPencilLine } from "react-icons/lu";

interface ActivityEditModalProps {
  isOpen: boolean;
  activity: CalendarEvent;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description: string;
    date: string;
    time: string;
    all_grades: false;
  }) => void;
}

const ActivityEditModal: React.FC<ActivityEditModalProps> = ({
  isOpen,
  activity,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState(activity.title);
  const [description, setDescription] = useState(activity.description || "");
  const [date, setDate] = useState<Date>(() => {
    const parsed = new Date(activity.start);
    return isNaN(parsed.getTime()) ? new Date() : parsed;
  });
  const [time, setTime] = useState("");

  useEffect(() => {
    setTitle(activity.title);
    setDescription(activity.description || "");
    const parsedDate = new Date(activity.start);
    setDate(isNaN(parsedDate.getTime()) ? new Date() : parsedDate);

    if (activity.formatted_time) {
      setTime(activity.formatted_time);
    } else {
      setTime("12:00");
    }
  }, [activity]);

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("O campo Nome é obrigatório.");
      return;
    }
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
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-[90vw] sm:w-full sm:max-w-lg">
          <div className="bg-[rgb(105,64,185)] pt-5 pb-1 px-4 gap-2 sm:flex sm:flex-row">
            <LuPencilLine className="text-white text-4xl" />
            <h2 className="text-2xl font-medium text-white mb-4 ">
              Editar Atividade
            </h2>
          </div>
          <div className="px-6 pt-4">
          <TextField
            type="text"
            label="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextArea
            label="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/2">
          <DateField
            selectedDate={date}
            onChange={(newDate) => setDate(newDate || new Date())}
          />
          </div>
          <TimeField value={time} onChange={(e) => setTime(e.target.value)} />
          </div>

          <div className="py-5 flex flex-col-reverse sm:flex-row sm:justify-between gap-3">
            <Button onClick={onClose} variant="outline"> Cancelar </Button>
            <Button onClick={handleSubmit}> Salvar Alterações </Button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityEditModal;
