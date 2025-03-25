import { BrowserRouter, Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";

import Login from "../pages/Login";
import CalendarView from "../pages/CalendarView";
import NotFound from "../pages/NotFound";
import Header from "../components/Header";

//Função para não exibir o header na página de login
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const showHeader = location.pathname !== "/";

  return (
    <>
      {showHeader && <Header />}
      {children}
    </>
  );
};

//Função para proteger as rotas após o logout
const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/" />;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Layout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<PrivateRoute />}>
                <Route path="/calendar" element={<CalendarView />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRoutes;