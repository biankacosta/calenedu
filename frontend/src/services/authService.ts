import api from "./api";

interface LoginResponse {
  token: string;
}

export const login = async (email: string, password: string): Promise<string | null> => {
  try {
    const response = await api.post<LoginResponse>("/auth/login", { email, password });

    const token = response.data.token;
    localStorage.setItem("token", token);
    return token;
  } catch (error) {
    console.error("Erro no login:", error);
    return null;
  }
};