import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEffect, useState } from "react";
import { getEvents, CalendarEvent } from "../services/eventService";
import AddActivityModal from "./AddActivityModal";
import { createActivity, ActivityData } from "../services/activityService";
import Button from "./Button";
import api from "../services/api";

const Calendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddActivity = async (data: { title: string; description: string; date: string; time: string }) => {
    console.log("Atividade adicionada:", data);
    if (!data.title.trim()) {
      alert("O campo Nome é obrigatório.");
      return;
    }
    
    try {
      const newActivity = await createActivity(data);
      console.log("Atividade criada com sucesso:", newActivity);
      // Se necessário, atualize o estado dos eventos ou mostre uma mensagem de sucesso.
    } catch (error) {
      console.error("Erro ao criar atividade:", error);
      alert("Ocorreu um erro ao criar a atividade. Tente novamente.");
    } finally {
      handleCloseModal();
    }
  };

  return (
    <div>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
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
      />

      <AddActivityModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddActivity}
      />
    </div>
  );
};

export default Calendar;