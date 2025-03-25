import React, { useState } from "react";
import TextField from "../components/TextField";
import Button from "../components/Button";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita o recarregamento da página
    setLoading(true);
    setError("");

    const token = await login(email, password);
    if (token) {
      console.log("Login realizado com sucesso!");
      navigate("/calendar");
    } else {
      setError("Erro no login. Verifique suas credenciais.");
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
          type="email"
        />
        <TextField
          label="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
          type="password"
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Carregando..." : "Entrar"}
        </Button>
      </form>
    </div>
  );
};

export default Login;
