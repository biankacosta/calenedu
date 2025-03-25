import { useState } from "react";
import Calendar from "../components/Calendar";
import {
  createActivity,
  updateActivity,
  deleteActivity,
} from "../services/activityService";
import AddActivityModal from "../components/AddActivityModal";
import ActivityDetailsModal from "../components/ActivityDetailsModal";
import ActivityEditModal from "../components/ActivityEditModal";
import { CalendarEvent } from "../services/eventService";
import { LuCalendarCheck2 } from "react-icons/lu";

const CalendarView = () => {
  // Estados para controlar os modais
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModals = () => {
    setIsModalOpen(false);
    setIsEditOpen(false);
    setSelectedEvent(null);
  };

  const handleAddActivity = async (data: {
    title: string;
    description: string;
    date: string;
    time: string;
    all_grades: false;
  }) => {
    if (!data.title.trim()) {
      alert("O campo Nome é obrigatório.");
      return;
    }

    try {
      const newActivity = await createActivity(data);
      console.log("Atividade criada com sucesso:", newActivity);
    } catch (error) {
      console.error("Erro ao criar atividade:", error);
      alert("Ocorreu um erro ao criar a atividade. Tente novamente.");
    } finally {
      handleCloseModals();
    }
  };
  

  const handleSubmitEdit = async (data: {
    title: string;
    description: string;
    date: string;
    time: string;
    all_grades: false;
  }) => {
    if (!data.title.trim()) {
      alert("O campo Nome é obrigatório.");
      return;
    }

    if (!selectedEvent) {
      alert("Nenhum evento selecionado.");
      return;
    }

    try {
      const updatedActivity = await updateActivity(selectedEvent.id, data);
      console.log("Atividade editada com sucesso:", updatedActivity);
    } catch (error) {
      console.error("Erro ao atualizar atividade:", error);
      alert("Ocorreu um erro ao atualizar a atividade. Tente novamente.");
    } finally {
      handleCloseModals();
    }

    console.log("Atividade editada:", data);
  };

  const handleDeleteActivity = async () => {
    if (!selectedEvent) return;

    try {
      await deleteActivity(selectedEvent.id);
      console.error("Atividade excluída:", selectedEvent.id);
    } catch (error) {
      console.error("Erro ao excluir atividade:", error);
    } finally {
      handleCloseModals();
    }
  };

  return (
    <div className="w-full sm:w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw] 2xl:w-[80vw] mx-auto">
      <div className="gap-5 sm:flex sm:flex-row">
        <LuCalendarCheck2 className="text-[rgb(105,64,185)] text-5xl" />
        <h2 className="text-4xl text-[rgb(105,64,185)] font-medium mb-4 ">
          Minhas Atividades
        </h2>
      </div>
      <hr className="my-4 border-gray-300" />
      <Calendar
        onOpenModal={handleOpenModal}
        onSelectEvent={setSelectedEvent}
      />

      {/* Renderização dos Modais */}
      <AddActivityModal
        isOpen={isModalOpen}
        onClose={handleCloseModals}
        onSubmit={handleAddActivity}
      />

      {selectedEvent && !isEditOpen && (
        <ActivityDetailsModal
          event={selectedEvent}
          onClose={handleCloseModals}
          onEdit={() => setIsEditOpen(true)}
          onDelete={handleDeleteActivity}
        />
      )}

      {selectedEvent && isEditOpen && (
        <ActivityEditModal
          isOpen={isEditOpen}
          activity={selectedEvent}
          onClose={handleCloseModals}
          onSubmit={handleSubmitEdit}
        />
      )}
    </div>
  );
};

export default CalendarView;
