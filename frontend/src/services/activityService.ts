import api from "./api";

//Estrutura dos dados que serão enviados para a API
export interface ActivityData {
  title: string;
  description: string;
  date: string;
  time: string;
  all_grades: false;
  activity_done?: boolean;
}

//Função assíncrone de criação de atividade
export const createActivity = async (data: ActivityData) => {
  try {
    const response = await api.post("/activities", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateActivity = async (id: string, data: ActivityData) => {
  try {
    const response = await api.patch(`/activities/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const deleteActivity = async (id: string) => {
  try {
    const response = await api.delete(`/activities/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar atividade. Por favor tente novamente", error);
  }
};

export const updateActivityDone = async (activityId: string, userId: string, done: boolean) => {
  try {
    const response = await api.patch(`/student_activities/update_status`, {
      activity_id: activityId,
      activity: { activity_done: done },
      user_id: userId
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};