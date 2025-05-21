import {
  ListPlus,
  Image,
  PencilLine,
  Captions,
  MapPinned,
  Ban,
  Banknote,
} from "lucide-react";
import PageTransition from "./PageTransition";
import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function CadastrarLocacao({ setListaLocacoes }) {
  const [imagem, setImagem] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [cidade, setCidade] = useState("");

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

  const token =
    "patNIM0Lo6dcGG5oi.17e5f1e4ea00174d38fc29d288134a64b8dfd7862ea8a19d1876be0a8fdcd244";

  const criarLocacao = async () => {
    if (!titulo || !descricao || !preco || !cidade || !imagem) {
      alert("Preencha todos os campos!");
      return;
    }
    try {
      const payload = {
        records: [
          {
            fields: {
              titulo: titulo,
              descricao: descricao,
              preco: parseFloat(preco),
              cidade: cidade,
              locacao_caracteristicas: [],
              imagem: imagem,
            },
          },
        ],
      };

      const response = await axios.post(
        "https://api.airtable.com/v0/appqkjRYvyIwSHLR7/locacoes",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Locação criada com sucesso:", response.data);
      alert("Locação criada com sucesso!");
      setListaLocacoes();

      setImagem("");
      setTitulo("");
      setDescricao("");
      setPreco("");
      setCidade("");
    } catch (error) {
      console.error("Erro ao criar locação:", error);

      if (error.response) {
        console.log("Detalhes do erro:", error.response.data);
      }
    }
  };

  return (
    <PageTransition>
      <div
        className={`flex flex-wrap items-center gap-4 justify-around py-7 px-4 absolute left-0 w-full  overflow-y-auto ${
          isMobile
            ? "top-[100px] h-[calc(85vh-70px)]"
            : "top-[70px] h-[calc(100vh-70px)]"
        }`}
      >
        <div className="bg-white rounded-lg w-[450px] flex flex-col items-center shadow-md p-8 hover:shadow-lg">
          <div className="flex items-center gap-2">
            <ListPlus size={30} color="#505050" />
            <p className="text-[20px] font-semibold text-[#505050]">
              Cadastrar nova locação
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 w-full mt-8">
            <div className="flex items-center gap-2">
              <Image size={20} color="#505050" />
              <p className="text-[16px] text-[#505050]">Imagem da locação:</p>
            </div>
            <input
              type="text"
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
              placeholder="URL da imagem..."
              className="w-full focus:outline-none bg-[#efefef] color-[#506249] placeholder-[#506249bb] py-1 px-4 rounded-sm border border-[#9f9f9f] "
            />
          </div>
          <div className="flex flex-col items-start gap-2 w-full mt-3">
            <div className="flex items-center gap-2">
              <PencilLine size={20} color="#505050" />
              <p className="text-[16px] text-[#505050]">Título da locação:</p>
            </div>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Título da locação..."
              className="w-full focus:outline-none bg-[#efefef] color-[#506249] placeholder-[#506249bb] py-1 px-4 rounded-sm  border border-[#9f9f9f] "
            />
          </div>
          <div className="flex flex-col items-start gap-2 w-full mt-3">
            <div className="flex items-center gap-2">
              <Captions size={20} color="#505050" />
              <p className="text-[16px] text-[#505050]">
                Descrição da locação:
              </p>
            </div>
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descrição da locação..."
              className="w-full focus:outline-none bg-[#efefef] color-[#506249] placeholder-[#506249bb] py-1 px-4 rounded-sm  border border-[#9f9f9f] "
            />
          </div>
          <div className="flex flex-col items-start gap-2 w-full mt-3">
            <div className="flex items-center gap-2">
              <Banknote size={20} color="#505050" />
              <p className="text-[16px] text-[#505050]">Valor da diária:</p>
            </div>
            <input
              type="text"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              placeholder="Valor da locação..."
              className="w-full focus:outline-none bg-[#efefef] color-[#506249] placeholder-[#506249bb] py-1 px-4 rounded-sm  border border-[#9f9f9f] "
            />
          </div>
          <div className="flex flex-col items-start gap-2 w-full mt-3">
            <div className="flex items-center gap-2">
              <MapPinned size={20} color="#505050" />
              <p className="text-[16px] text-[#505050]">Cidade da locação:</p>
            </div>
            <input
              type="text"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              placeholder="Cidade da locação..."
              className="w-full focus:outline-none bg-[#efefef] color-[#506249] placeholder-[#506249bb] py-1 px-4 rounded-sm  border border-[#9f9f9f] "
            />
          </div>
          <button
            onClick={() => criarLocacao()}
            className="bg-[#44523A] w-full mt-8 text-white font-semibold py-2 rounded-sm hover:bg-[#506249] active:bg-[#44523A]"
          >
            Cadastrar locação
          </button>
        </div>
      </div>
    </PageTransition>
  );
}

CadastrarLocacao.propTypes = {
  setListaLocacoes: PropTypes.func.isRequired,
};

export default CadastrarLocacao;
