import React, { useState } from "react";
import TextField from "../components/TextField";
import Button from "../components/Button";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import calenEdu from "../assets/CalenEdu.png";

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
    <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 ">
      <div className="relative sm:max-w-sm w-full">
        <div className="card bg-secondary shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
        <div className="card bg-primary shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
        <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md p-4">
          <img src={calenEdu} alt="Logo" className="w-52 mx-auto block" />
          <h1 className="block text-2xl font-medium mb-4 mt-3 text-gray-700 text-center">Login</h1>
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
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <Button type="submit" disabled={loading}>
              {loading ? "Carregando..." : "Entrar"}
            </Button>
          </form>
        </div>
      </div>
    </div>
    
  );
};

export default Login;
