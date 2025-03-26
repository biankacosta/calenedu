import api from "./api";

interface LoginResponse {
  token: string;
  user_id: string;
}

// Função assíncrona para autenticar o usuário
// Envia email e senha para a API e, se a autenticação for bem-sucedida, salva o token e o ID do usuário no localStorage
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

// Função para realizar logout do usuário
// Remove o token do localStorage para invalidar a sessão
export const logout = () => {
  localStorage.removeItem("token");
};