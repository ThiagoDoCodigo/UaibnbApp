import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Banknote, MapPinned, Search } from "lucide-react";
import { useEffect, useState } from "react";
function formatarParaReal(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}
import PageTransition from "./PageTransition";

function ListaLocacoes({ listaLocacoes }) {
  const [listaFiltrada, setListaFiltrada] = useState([]);
  const [search, setSearch] = useState("");

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

  useEffect(() => {
    let lista = listaLocacoes;

    if (search !== "") {
      lista = lista.filter((locacao) => {
        return (
          locacao.fields.titulo.toLowerCase().includes(search.toLowerCase()) ||
          locacao.fields.cidade.toLowerCase().includes(search.toLowerCase())
        );
      });
    }

    setListaFiltrada(lista);
  }, [listaLocacoes, search]);

  const navigate = useNavigate();
  return (
    <PageTransition>
      <div
        className={`flex flex-col absolute  left-0 w-full h-[calc(100vh-70px)] ${
          isMobile ? "top-[100px]" : "top-[70px]"
        }`}
      >
        <div className="py-3 px-4 flex justify-between ">
          <div
            className={`flex items-center  gap-2 py-2 px-4 rounded-md bg-[#fff] shadow ${
              isMobile ? "w-full justify-between" : "w-[250px]"
            }`}
          >
            <input
              type="text"
              className="focus:outline-none bg-[#fff] color-[#506249] placeholder-[#506249]"
              placeholder="Pesquisar acomodações..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search color="#506249" />
          </div>
        </div>
        <div
          className={`flex flex-wrap gap-4 justify-around overflow-y-auto py-3 px-4  ${
            isMobile ? "mb-8 h-[70vh]" : "mb-8"
          }`}
        >
          {listaFiltrada.map((locacao) => {
            return (
              <div
                key={locacao.id}
                style={isMobile ? { width: "100%" } : { width: "340px" }}
                className="bg-white rounded-lg  h-[420px] flex flex-col justify-between shadow-md p-4 hover:shadow-lg"
              >
                <div className="flex flex-col w-full">
                  <img
                    src={locacao.fields.imagem}
                    alt={locacao.fields.titulo}
                    className="w-full h-48 object-cover mb-4"
                  />
                  <div className="flex items-center gap-2 mb-1 w-full">
                    <p className="text-lg font-semibold text-[#505050] truncate w-full">
                      {locacao.fields.titulo}
                    </p>
                  </div>
                  <p className="text-[#505050] text-[14px] h-10 mb-2 line-clamp-2">
                    {locacao.fields.descricao}
                  </p>
                  <div className="flex items-center gap-1 mb-1">
                    <Banknote size={20} />
                    <p className="text-[14px] font-semibold text-[#505050]">
                      Diária:
                    </p>
                    <p className="text-[14px] text-green-600">
                      {formatarParaReal(locacao.fields.preco)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPinned size={20} />
                    <p className="text-[14px] font-semibold text-[#505050]">
                      Cidade:
                    </p>
                    <p className="text-[14px] text-[#505050]">
                      {locacao.fields.cidade}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/UaibnbApp/locacao/${locacao.id}`)}
                  className="bg-[#44523A] text-white font-semibold py-2 rounded-md hover:bg-[#506249] active:bg-[#44523A]"
                >
                  Acessar detalhes
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
}

ListaLocacoes.propTypes = {
  listaLocacoes: PropTypes.array.isRequired,
};

export default ListaLocacoes;
