import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

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

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Layout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRoutes;