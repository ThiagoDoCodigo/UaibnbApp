import { useLocation, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";

function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`absolute top-0 left-0 w-full  bg-[#f1f1f1] shadow-sm flex items-center px-4 ${
        isMobile
          ? "flex-col gap-1 h-[100px]"
          : "flex-row h-[70px] justify-between"
      }`}
    >
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2">
          <img src={logo} className="w-16 h-16" alt="logo uaibnb" />
          <p className="text-2xl font-bold text-[#505050]">
            Setor de administração
          </p>
        </div>
      </div>
      <div className="flex items-center gap-7">
        <button
          className={`text-[16px] text-[#505050] cursor-pointer ${
            location.pathname === "/UaibnbApp/"
              ? "font-bold underline decoration-[#505050] underline-offset-2"
              : ""
          }`}
          onClick={() => navigate("/UaibnbApp/")}
        >
          Acomodações
        </button>
        <button
          className={`text-[16px] text-[#505050] cursor-pointer ${
            location.pathname === "/UaibnbApp/cadastrar"
              ? "font-bold underline decoration-[#505050] underline-offset-2"
              : ""
          }`}
          onClick={() => navigate("/UaibnbApp/cadastrar")}
        >
          Cadastro
        </button>
        <button
          className={`text-[16px] text-[#505050] cursor-pointer ${
            location.pathname === "/UaibnbApp/caracteristicas"
              ? "font-bold underline decoration-[#505050] underline-offset-2"
              : ""
          }`}
          onClick={() => navigate("/UaibnbApp/caracteristicas")}
        >
          Características
        </button>
      </div>
    </div>
  );
}

export default SideBar;
