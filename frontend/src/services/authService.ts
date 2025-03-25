import api from "./api";

interface LoginResponse {
  token: string;
  user_id: string;
}

export const login = async (email: string, password: string): Promise<string | null> => {
  try {
    const response = await api.post<LoginResponse>("/auth/login", { email, password });

    console.log("Resposta da API:", response.data);

    const { token, user_id } = response.data;

    localStorage.setItem("token", token); 
    localStorage.setItem("user_id", user_id);

    return token;
  } catch (error) {
    console.error("Erro no login:", error);
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};