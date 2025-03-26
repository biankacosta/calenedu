import React from "react";
import Button from "./Button";
import { IoWarningOutline } from "react-icons/io5";

// Modal para confirmação (deletar)
interface ConfirmationModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-[90vw] sm:w-full sm:max-w-lg">
          <div className="bg-red-500 pt-5 pb-1 px-4 gap-2 sm:flex sm:flex-row">
            <IoWarningOutline className="text-white text-4xl" />
            <h2 className="text-2xl font-medium text-white mb-4 ">{title}</h2>
          </div>
          <div className="px-6 pt-4">
            <p className="mt-2 text-gray-600">{message}</p>
            <div className="py-5 flex flex-col-reverse sm:flex-row sm:justify-between gap-3">
              <Button onClick={onCancel}> Cancelar </Button>
              <Button onClick={onConfirm} variant="warning"> Confirmar </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
