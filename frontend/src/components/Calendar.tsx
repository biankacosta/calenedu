import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEffect, useState } from "react";
import { getEvents, CalendarEvent } from "../services/eventService";
import api from "../services/api";

const Calendar = () => {
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
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events} // Renderiza os eventos carregados
      datesSet={(info) => {
        // Atualiza o intervalo de datas com base na visão do calendário
        setDateRange({
          start: info.startStr, // Data inicial visível no calendário
          end: info.endStr, // Data final visível no calendário
        });
      }}
    />
  );
};

export default Calendar;