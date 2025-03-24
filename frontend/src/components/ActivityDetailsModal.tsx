import React from "react";
import { CalendarEvent } from "../services/eventService";
import Button from "./Button";

interface ActivityDetailsModalProps {
  event: CalendarEvent;
  onClose: () => void;
  onEdit: () => void;
  onDelete: (activityId: string) => void;
}

const ActivityDetailsModal: React.FC<ActivityDetailsModalProps> = ({ event, onClose, onDelete, onEdit }) => {
    const handleDelete = () => {
        if (window.confirm("Você tem certeza que deseja deletar esta atividade?")) {
          onDelete(event.id);
          onClose();
        }
      };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <Button onClick={onClose}> X </Button>
            <p className="mt-2 text-gray-600"> Concluído: {event.activity_done ? "Sim" : "Não"}</p>
            <h2 className="text-xl font-bold">{event.title}</h2>
            {event.description && <p className="mt-2">{event.description}</p>}
            <p className="mt-2 text-gray-600"> Data: {event.date} </p>
            <Button onClick={handleDelete}> Excluir atividade </Button>
            <Button onClick={onEdit}> Editar atividade </Button>
        </div>
        </div>
  );
};


export default ActivityDetailsModal;