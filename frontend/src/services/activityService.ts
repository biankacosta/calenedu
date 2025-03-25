import api from "./api";

//Estrutura dos dados que serão enviados para a API
export interface ActivityData {
  title: string;
  description: string;
  date: string;
  time: string;
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