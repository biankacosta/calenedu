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
  dateRange: { start: string; end: string };
  setDateRange: (range: { start: string; end: string }) => void;
  events: CalendarEvent[];
  setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
}

const Calendar: React.FC<CalendarProps> = ({ onOpenModal, onSelectEvent, dateRange, setDateRange, events, setEvents }) => {

  // Função para buscar eventos com base no intervalo de datas
  const fetchEvents = async (startDate: string, endDate: string): Promise<CalendarEvent[]> => {
    try {
      const data = await getEvents(startDate, endDate); // Chama a API para obter os eventos
      return data;
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
      return [];
    }
  };

  // useEffect para monitorar mudanças no intervalo de datas e busca eventos
  useEffect(() => {
    if (dateRange.start && dateRange.end) {
      fetchEvents(dateRange.start, dateRange.end).then((fetchedEvents) => {
        setEvents(fetchedEvents); // Passa os eventos diretamente para setEvents
      });
    }
  }, [dateRange]);

  // Componente para personalizar o conteúdo dos eventos no calendário
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
    
    // Função para lidar com a alteração do checkbox e atualizar o status da atividade
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
        // Atualiza o intervalo de datas ao navegar no calendário
        datesSet={(info) => {
          setDateRange({
            start: info.startStr,
            end: info.endStr,
          });
        }}
        // Abre o modal ao clicar em um evento
        eventClick={(info) => {
          const event = events.find((e) => String(e.id) === info.event.id);
          if (event) {
            onSelectEvent(event);
          }
        }}
        eventContent={renderEventContent}
        // Modifica a aparência dos eventos com base na classificação
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
