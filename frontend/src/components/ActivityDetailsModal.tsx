import React, { useState } from "react";
import { CalendarEvent } from "../services/eventService";
import Button from "./Button";
import ConfirmationModal from "./ConfirmationModal";

interface ActivityDetailsModalProps {
  event: CalendarEvent;
  onClose: () => void;
  onEdit: () => void;
  onDelete: (activityId: string) => void;
}

const ActivityDetailsModal: React.FC<ActivityDetailsModalProps> = ({ event, onClose, onDelete, onEdit }) => {
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    const handleDelete = () => {
      onDelete(event.id);
      setIsConfirmationOpen(false);
      onClose();
    };
  
    const handleConfirmationCancel = () => {
      setIsConfirmationOpen(false);
    };
  
    const handleDeleteClick = () => {
      setIsConfirmationOpen(true);
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-15 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <Button onClick={onClose}> X </Button>
            <p className="mt-2 text-gray-600"> Concluído: {event.activity_done ? "Sim" : "Não"}</p>
            <h2 className="text-xl font-bold">{event.title}</h2>
            {event.description && <p className="mt-2">{event.description}</p>}
            <p className="mt-2 text-gray-600"> Data: {event.date} </p>
            <Button onClick={handleDeleteClick}> Excluir atividade </Button>
            <Button onClick={onEdit}> Editar atividade </Button>
        </div>

          {/* Modal de confirmação */}
        <ConfirmationModal
          isOpen={isConfirmationOpen}
          title="Confirmar Exclusão"
          message="Você tem certeza que deseja deletar esta atividade?"
          onConfirm={handleDelete}
          onCancel={handleConfirmationCancel}
        />
        </div>
  );
};


export default ActivityDetailsModal;