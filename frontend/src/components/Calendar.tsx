import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptLocale from "@fullcalendar/core/locales/pt-br";
import { useEffect, useState } from "react";
import { getEvents, CalendarEvent } from "../services/eventService";
import CheckboxField from "./CheckboxField";
import { useActivityDone } from "../hooks/useActivityDone";

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

  const InlineEventContent: React.FC<{ eventInfo: any }> = ({ eventInfo }) => {
    const event: CalendarEvent = {
      ...eventInfo.event.extendedProps,
      id: eventInfo.event.id,
      title: eventInfo.event.title,
    };

    const [activityDone, setActivityDone] = useState(
      event.activity_done || false
    );
    const { loading, handleCheckboxUpdate } = useActivityDone();

    const handleCheckboxChange = async (
      e?: React.ChangeEvent<HTMLInputElement>
    ) => {
      const newValue = e ? e.target.checked : true;
      setActivityDone(newValue);
      const result = await handleCheckboxUpdate(event.id, newValue);
      if (!result.success) {
        setActivityDone(!newValue);
      }
    };

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {event.classification === "tarefa" && event.creator_id.toString() === localStorage.getItem("user_id") && (
            <CheckboxField
              checked={activityDone}
              onChange={handleCheckboxChange}
              size="medium"
            />
          )}
          <span>{event.title}</span>
          {loading && <span>Atualizando...</span>}
        </div>
      </div>
    );
  };

  // Função que o FullCalendar utiliza para renderizar o conteúdo de cada evento
  const renderEventContent = (eventInfo: any) => {
    return <InlineEventContent eventInfo={eventInfo} />;
  };

  return (
    <div className="">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        locale={ptLocale}
        height="70vh"
        headerToolbar={{
          left: "title prev,next today",
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
        eventContent={renderEventContent}
        eventDidMount={(info) => {
          const event = info.event;
          const category = event.extendedProps.classification;

          // Mapeamento de cores por categoria
          const colorMap: Record<string, { bg: string; border: string }> = {
            tarefa: { bg: "#5381f5", border: "#366df7" },
            prova: { bg: "#f7984a", border: "#fa8c32" },
            evento: { bg: "#49a633", border: "#369620" },
          };

          if (category && colorMap[category]) {
            info.el.style.backgroundColor = colorMap[category].bg;
            info.el.style.borderColor = colorMap[category].border;
            info.el.style.color = "#fff";
          }
        }}
      />
    </div>
  );
};

export default Calendar;
