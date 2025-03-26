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
//Envia os dados da atividade para a API e retorna a resposta
export const createActivity = async (data: ActivityData) => {
  try {
    const response = await api.post("/activities", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Função assíncrona para atualizar uma atividade existente
// Envia os dados atualizados da atividade para a API e retorna a resposta
export const updateActivity = async (id: string, data: ActivityData) => {
  try {
    const response = await api.patch(`/activities/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Função assíncrona para excluir uma atividade
// Envia uma requisição DELETE para a API para remover a atividade e retorna a resposta
export const deleteActivity = async (id: string) => {
  try {
    const response = await api.delete(`/activities/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar atividade. Por favor tente novamente", error);
  }
};

// Função assíncrona para atualizar o status de uma atividade de um estudante
// Envia os dados de atualização para a API e retorna a resposta
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