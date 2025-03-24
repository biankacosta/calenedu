import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import CalendarView from "../pages/CalendarView";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/calendar" element={<CalendarView />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;