import React, { useState } from "react";
import { CalendarEvent } from "../services/eventService";
import Button from "./Button";
import ConfirmationModal from "./ConfirmationModal";
import CheckboxField from "./CheckboxField";
import { useActivityDone } from "../hooks/useActivityDone";

interface ActivityDetailsModalProps {
  event: CalendarEvent;
  onClose: () => void;
  onEdit: () => void;
  onDelete: (activityId: string) => void;
  onActivityUpdated?: () => void;
}

const ActivityDetailsModal: React.FC<ActivityDetailsModalProps> = ({
  event,
  onClose,
  onDelete,
  onEdit,
  onActivityUpdated,
}) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [activityDone, setActivityDone] = useState(
    event.activity_done || false
  );
  const { loading, handleCheckboxUpdate } = useActivityDone();

  // Verificação se o usuário logado é o criador da atividade
  const userId = localStorage.getItem("user_id");
  const isOwner = event.creator_id.toString() === userId;

  const isTarefa = event.classification.toString() === "tarefa";
  console.log(isTarefa);

  const handleCheckboxChange = async (
    e?: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e ? e.target.checked : true;
    setActivityDone(newValue);
    const result = await handleCheckboxUpdate(event.id, newValue);
    if (result.success) {
      if (onActivityUpdated) {
        onActivityUpdated();
      }
    } else {
      setActivityDone(!newValue);
    }
  };

  const handleDelete = () => {
    onDelete(event.id);
    if (onActivityUpdated) {
      onActivityUpdated();
    }
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
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-[90vw] sm:w-full sm:max-w-lg">
          <div className="flex justify-between items-start p-6">
            <div className="flex py-2 gap-3">
              {isTarefa && isOwner && (
                <div className="">
                  <CheckboxField
                    checked={activityDone}
                    onChange={handleCheckboxChange}
                  />
                </div>
              )}
              <h2 className="text-2xl font-bold">{event.title}</h2>
            </div>
            <Button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full p-2"
            >
              X
            </Button>
          </div>
          <div className="px-6">
            <p className="text-gray-600">
              {" "}
              Data: {new Date(event.date).toLocaleDateString("pt-BR")}{" "}
            </p>
            {event.formatted_time && (
              <p className="mt-2 text-gray-600">Hora: {event.formatted_time}</p>
            )}
            <hr className="my-4 border-gray-300" />
            {event.description && (
              <p className="mt-2 mb-6">Descrição: {event.description}</p>
            )}

            {isTarefa &&
              (isOwner ? (
                <>
                  <div className="py-5 flex flex-col-reverse sm:flex-row sm:justify-between gap-3">
                    <Button onClick={handleDeleteClick} variant="warning">
                      Excluir
                    </Button>
                    <Button onClick={onEdit}>Editar atividade</Button>
                  </div>
                </>
              ) : (
                <div className="py-5 flex flex-col-reverse sm:flex-row sm:justify-between gap-3">
                  <Button
                    onClick={() => handleCheckboxChange()}
                    disabled={activityDone || loading}
                  >
                    {activityDone ? "Atividade Enviada" : "Enviar Atividade"}
                  </Button>
                </div>
              ))}
          </div>
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
    </div>
  );
};

export default ActivityDetailsModal;
