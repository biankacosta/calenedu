import api from "./api";

// Definição do tipo de evento
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  status: string;
  activity_done: boolean;
  date: string;
  time: string;
  formatted_time: string;
  start: string;
  end?: string;
};

// Função para buscar atividades no backend dentro de um intervalo de datas
export const getEvents = async (startDate: string, endDate: string): Promise<CalendarEvent[]> => {
  try {
    const response = await api.get<CalendarEvent[]>("/activities", {
      params: { start_date: startDate, end_date: endDate }, 
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar atividades:", error);
    return [];
  }
};

// Função para buscar atividades no backend dentro de um intervalo de datas
export const deleteEvent = async (startDate: string, endDate: string): Promise<CalendarEvent[]> => {
  try {
    const response = await api.get<CalendarEvent[]>("/activities", {
      params: { start_date: startDate, end_date: endDate }, 
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar atividade. Por favor tente novamente", error);
    return [];
  }
};