import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import { getEvents, CalendarEvent } from "../services/eventService";

interface CalendarProps {
  onOpenModal: () => void;
  onSelectEvent: (event: CalendarEvent) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onOpenModal, onSelectEvent }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

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
            click: onOpenModal,
          },
        }}
        datesSet={(info) => {
          setDateRange({
            start: info.startStr,
            end: info.endStr,
          });
        }}
        eventClick={(info) => {
          const event = events.find((e) => String(e.id) === info.event.id);
          if (event) {
            onSelectEvent(event);
          }
        }}
        
      />
    </div>
  );
};

export default Calendar;