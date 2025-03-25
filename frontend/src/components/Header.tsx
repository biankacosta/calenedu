import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import Button from "./Button";

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
    <div className="relative">
        <p>CalenEdu</p>
        <p></p>
        <Button onClick={handleLogout}>Sair</Button>
    </div>
    );
};

export default Header;