import React, { useState, useEffect } from "react";
import TextField from "./TextField";
import DateField from "./DateField";
import TimeField from "./TimeField";
import Button from "./Button";
import { CalendarEvent } from "../services/eventService";

interface ActivityEditModalProps {
  isOpen: boolean;
  activity: CalendarEvent;
  onClose: () => void;
  onSubmit: (data: { title: string; description: string; date: string; time: string }) => void;
}

const ActivityEditModal: React.FC<ActivityEditModalProps> = ({
  isOpen, activity, onClose, onSubmit, }) => {
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
      }}, [activity]);

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("O campo Nome é obrigatório.");
      return;
    }
    onSubmit({
      title, description, date: date.toISOString(), time, });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Editar Atividade</h2>
        <TextField
          label="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <DateField selectedDate={date} onChange={(newDate) => setDate(newDate || new Date())} />
        <TimeField value={time} onChange={(e) => setTime(e.target.value)} />

        <div className="mt-4 flex justify-end">
            <Button onClick={onClose}> Cancelar </Button>
            <Button onClick={handleSubmit}> Salvar Alterações </Button>
        </div>
      </div>
    </div>
  );
};

export default ActivityEditModal;
