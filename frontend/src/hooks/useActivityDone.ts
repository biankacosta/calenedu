import { useState } from "react";
import { updateActivityDone } from "../services/activityService";

// Hook personalizado para atualizar o status de conclusão de uma atividade
export function useActivityDone() {
  const [loading, setLoading] = useState(false);

  async function handleCheckboxUpdate(eventId: string, newValue: boolean) {
    try {
      const userId = localStorage.getItem("user_id");
      if (!userId) throw new Error("Usuário não autenticado");

      setLoading(true);
      await updateActivityDone(eventId, userId, newValue);
      return { success: true };
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  }

  return { loading, handleCheckboxUpdate };
}