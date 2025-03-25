import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import Button from "./Button";
import calenEdu from "../assets/CalenEdu.png";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <div className="relative flex items-center justify-between w-full text-gray-default py-5 px-50 gap-4 bg-white z-50">
        <img src={calenEdu} alt="Logo" className="w-52" />
        <Button onClick={handleLogout}>Sair</Button>
      </div>
      <hr className="mb-6 border-gray-300" />
    </div>
  );
};

export default Header;
