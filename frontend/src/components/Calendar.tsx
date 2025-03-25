import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import { getEvents, CalendarEvent } from "../services/eventService";
import AddActivityModal from "./AddActivityModal";
import { createActivity, updateActivity, deleteActivity } from "../services/activityService";
import ActivityDetailsModal from "./ActivityDetailsModal";
import ActivityEditModal from "./ActivityEditModal";

const Calendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Função para buscar eventos com base no intervalo de datas
  const fetchEvents = async (startDate: string, endDate: string) => {
    const data = await getEvents(startDate, endDate);
    setEvents(data);
  };

  // Atualiza os eventos sempre que o intervalo de datas mudar
  useEffect(() => {
    if (dateRange.start && dateRange.end) {
      fetchEvents(dateRange.start, dateRange.end);
    }
  }, [dateRange]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsModalOpen(false);
    setIsEditOpen(false);
    setSelectedEvent(null);
  };
  
  const handleAddActivity = async (data: { title: string; description: string; date: string; time: string }) => {
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
  
  const handleSubmitEdit = async (data: { title: string; description: string; date: string; time: string }) => {
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

  const handleEdit = () => {
    setIsEditOpen(true);
  };

  return (
    <div>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="70vh"
        headerToolbar={{
            left: "title",
            center: "prev,next today",
            right: "AddActivityButton",
          }}
        customButtons={{
          AddActivityButton: {
            text: "Adicionar Tarefa",
            click: handleOpenModal,
          },
        }}
        datesSet={(info) => {
          setDateRange({
            start: info.startStr,
            end: info.endStr,
          });
        }}
        eventClick={(info) => {
          console.log("Evento clicado:", info.event.id, "Tipo:", typeof info.event.id);
          console.log("Eventos disponíveis:", events.map(e => ({ id: e.id, type: typeof e.id })));
          const event = events.find((e) => String(e.id) === info.event.id);
          console.log("Evento clicado:", info.event);
          console.log(selectedEvent)
          if (event) {
            setSelectedEvent(event);
          }
        }}
        
      />

      <AddActivityModal
        isOpen={isModalOpen}
        onClose={handleCloseModals}
        onSubmit={handleAddActivity}
      />

      {selectedEvent && !isEditOpen && (
        <ActivityDetailsModal event={selectedEvent} onClose={() => setSelectedEvent(null)} onDelete={handleDeleteActivity} onEdit={handleEdit}/>
      )}

      {/* Modal de edição */}
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

export default Calendar;