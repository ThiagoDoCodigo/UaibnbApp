import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  List,
  MapPinned,
  Banknote,
  Captions,
  PencilLine,
  ListCheck,
  Trash2,
  ListPlus,
  ArrowLeft,
  Image,
} from "lucide-react";
import PropTypes from "prop-types";
import PageTransitionAdd from "./PageTransitionAdd";

function Locacao({ listaCaracteristicas, setListaLocacoes }) {
  const navigate = useNavigate();
  const [locacao, setLocacao] = useState(null);
  const token =
    "patNIM0Lo6dcGG5oi.17e5f1e4ea00174d38fc29d288134a64b8dfd7862ea8a19d1876be0a8fdcd244";

  const { id } = useParams();

  const [listaCaracteristicasItem, setListaCaracteristicasItem] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [cidade, setCidade] = useState("");
  const [imagem, setImagem] = useState("");

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

  const atualizar = () => {
    axios
      .get(`https://api.airtable.com/v0/appqkjRYvyIwSHLR7/locacoes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLocacao(response.data);
        setListaCaracteristicasItem(
          response.data.fields.locacao_caracteristicas
        );
      })
      .catch((error) => console.error("Erro ao obter locação:", error));
  };

  useEffect(() => {
    axios
      .get(`https://api.airtable.com/v0/appqkjRYvyIwSHLR7/locacoes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLocacao(response.data);
        setListaCaracteristicasItem(
          response.data.fields.locacao_caracteristicas
        );
      })
      .catch((error) => console.error("Erro ao obter locação:", error));
  }, [id]);

  useEffect(() => {
    setTitulo(locacao?.fields.titulo);
    setDescricao(locacao?.fields.descricao);
    setPreco(locacao?.fields.preco);
    setCidade(locacao?.fields.cidade);
    setImagem(locacao?.fields.imagem);
  }, [locacao]);

  const [caracteristicasFiltradas, setCaracteristicasFiltradas] = useState([]);
  const [caracteristicasDiferentes, setCaracteristicasDiferentes] = useState(
    []
  );

  useEffect(() => {
    if (listaCaracteristicasItem !== undefined) {
      const filtro = listaCaracteristicas.filter((caracteristica) => {
        const rel = caracteristica.fields.locacao_caracteristicas;
        if (!Array.isArray(rel) || rel.length === 0) return false;
        return listaCaracteristicasItem.includes(rel[0]);
      });

      const diferentes = listaCaracteristicas.filter(
        (caracteristica) => !filtro.includes(caracteristica)
      );

      setCaracteristicasDiferentes(diferentes);
      setCaracteristicasFiltradas(filtro);
    } else {
      setCaracteristicasDiferentes(listaCaracteristicas);
      setCaracteristicasFiltradas([]);
    }
  }, [listaCaracteristicasItem, listaCaracteristicas]);

  const handleChangePrice = (value) => {
    setPreco(
      value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    );
  };

  const deleteCaracteristica = (id) => {
    const novaLista = listaCaracteristicasItem.filter(
      (caracteristica) => caracteristica !== id
    );

    setListaCaracteristicasItem(novaLista);
  };

  const addCaracteristica = (id) => {
    if (listaCaracteristicasItem !== undefined) {
      if (listaCaracteristicasItem.includes(id)) {
        alert("Característica já adicionada");
        return;
      }
      const novaLista = [...listaCaracteristicasItem, id];

      setListaCaracteristicasItem(novaLista);
    } else {
      setListaCaracteristicasItem([id]);
    }
  };

  const [add, setAdd] = useState(false);

  const atualizarLocacao = async () => {
    try {
      const response = await axios.patch(
        `https://api.airtable.com/v0/appqkjRYvyIwSHLR7/locacoes/${id}`,
        {
          fields: {
            titulo: titulo || "",
            descricao: descricao || "",
            preco: parseFloat(preco) || 0,
            cidade: cidade || "",
            locacao_caracteristicas: listaCaracteristicasItem || [],
            imagem: imagem || "",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Locação atualizada:", response.data);
      setListaLocacoes();
      atualizar();
      alert("Locação atualizada com sucesso!");
    } catch (error) {
      console.error(
        "Erro ao atualizar locação:",
        error.response?.data || error
      );
    }
  };

  if (!locacao) return <></>;

  return (
    <PageTransitionAdd>
      <div className="w-full top-0 left-0 bg-[#e7e7e7] z-10 h-screen p-4 absolute">
        <div className="flex w-full h-full align-center justify-center">
          <div
            className="bg-white rounded-lg w-[1000px]  flex flex-col relative shadow-md p-7 hover:shadow-lg"
            style={
              isMobile
                ? { overflowY: "scroll", height: "90%" }
                : { overflowY: "hidden", height: "100%" }
            }
          >
            <div
              onClick={() => navigate("/UaibnbApp/")}
              className="absolute top-1 left-1 flex items-center gap-2 cursor-pointer p-2 hover:bg-[#fff] rounded active:bg-[#f2f2f2]"
            >
              <ArrowLeft size={22} color="#505050" />
              <p className="text-[14px] text-[#505050]">Voltar</p>
            </div>
            <div
              className={`w-full flex mt-4 gap-4 ${isMobile ? "flex-col" : ""}`}
            >
              <img
                src={locacao.fields.imagem}
                alt={locacao.fields.titulo}
                className={`h-[300px] object-cover rounded-md ${
                  isMobile ? "w-full" : "w-1/2 "
                }`}
              />
              <div
                className={`flex flex-col justify-between ${
                  isMobile ? "w-full gap-2" : "w-1/2 "
                }`}
              >
                <div className="flex items-start flex-col gap-1 w-full">
                  <div className="flex items-center gap-1">
                    <PencilLine size={20} color="#505050" />
                    <p className="text-lg font-semibold text-[#505050]">
                      Título:
                    </p>
                  </div>
                  <input
                    type="text"
                    className="w-full focus:outline-none bg-[#efefef] color-[#506249] placeholder-[#506249] py-1 px-4 rounded-sm border border-[#9f9f9f] "
                    value={titulo || ""}
                    onChange={(e) => setTitulo(e.target.value)}
                  />
                </div>
                <div className="flex items-start flex-col gap-1 w-fullw-full">
                  <div className="flex items-center gap-1">
                    <Captions size={20} color="#505050" />
                    <p className="text-lg font-semibold text-[#505050]">
                      Descrição:
                    </p>
                  </div>
                  <textarea
                    type="text"
                    rows="2"
                    className="w-full focus:outline-none bg-[#efefef] color-[#506249] placeholder-[#506249] py-1 px-4 rounded-sm  border border-[#9f9f9f] "
                    value={descricao || ""}
                    onChange={(e) => setDescricao(e.target.value)}
                  />
                </div>
                <div className="flex w-full items-center gap-4">
                  <div className="flex items-start flex-col gap-1 w-full ">
                    <div className="flex items-center gap-1">
                      <Banknote size={20} />
                      <p className="text-lg font-semibold text-[#505050]">
                        Diária:
                      </p>
                    </div>
                    <input
                      type="text"
                      className="w-full focus:outline-none bg-[#efefef] color-[#506249] placeholder-[#506249] py-1 px-4 rounded-sm  border border-[#9f9f9f] "
                      value={preco || ""}
                      onChange={(e) => handleChangePrice(e.target.value)}
                    />
                  </div>
                  <div className="flex items-start flex-col gap-1 w-full">
                    <div className="flex items-center gap-1">
                      <MapPinned size={20} />
                      <p className="text-lg font-semibold text-[#505050]">
                        Cidade:
                      </p>
                    </div>
                    <input
                      type="text"
                      className="w-full focus:outline-none bg-[#efefef] color-[#506249] placeholder-[#506249] py-1 px-4 rounded-sm  border border-[#9f9f9f] "
                      value={cidade || ""}
                      onChange={(e) => setCidade(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-start gap-2 w-full mt-1">
                  <div className="flex items-center gap-2">
                    <Image size={20} color="#505050" />
                    <p className="text-[16px] font-semibold text-[#505050]">
                      Imagem da locação:
                    </p>
                  </div>
                  <input
                    type="text"
                    value={imagem || ""}
                    onChange={(e) => setImagem(e.target.value)}
                    placeholder="URL da imagem..."
                    className="w-full focus:outline-none bg-[#efefef] color-[#506249] placeholder-[#506249bb] py-1 px-4 rounded-sm border border-[#9f9f9f] "
                  />
                </div>
              </div>
            </div>
            <div className="flex items-start flex-col gap-1 w-full mt-3">
              <div className="flex items-center gap-1 mb-2">
                <ListCheck size={20} />
                <p className="text-lg font-semibold text-[#505050]">
                  Características:
                </p>
                <button
                  onClick={() => setAdd(!add)}
                  className="px-2 ml-2 bg-[#505050] text-white rounded-sm hover:bg-[#44523A] active:bg-[#505050]"
                >
                  {add === false ? "Adicionar" : "Voltar"}
                </button>
              </div>
              <div
                className="flex-col gap-2 w-full overflow-y-auto h-[420px]"
                style={add ? { display: "none" } : { display: "flex" }}
              >
                {caracteristicasFiltradas.map((caracteristica) => {
                  return (
                    <div
                      key={caracteristica.id}
                      style={{ padding: "8px 40px 8px 12px" }}
                      className="relative w-full bg-[#efefef] rounded-sm  border border-[#9f9f9f] "
                    >
                      <div className="absolute top-0 right-2 flex h-full items-center justify-center">
                        <Trash2
                          size={20}
                          color="red"
                          className="cursor-pointer"
                          onClick={() =>
                            deleteCaracteristica(
                              caracteristica.fields?.locacao_caracteristicas[0]
                            )
                          }
                        />
                      </div>
                      <p className="font-semibold text-[#505050]">
                        {caracteristica.fields.nome}
                      </p>
                      <li className="text-[#505050]">
                        {caracteristica.fields.descricao}
                      </li>
                    </div>
                  );
                })}
              </div>
              <div
                className="flex-col gap-2 w-full overflow-y-auto h-[420px]"
                style={add ? { display: "flex" } : { display: "none" }}
              >
                {caracteristicasDiferentes
                  .filter(
                    (caracteristica) =>
                      caracteristica.fields?.locacao_caracteristicas &&
                      caracteristica.fields.locacao_caracteristicas[0]
                  )
                  .map((caracteristica) => {
                    return (
                      <div
                        key={caracteristica.id}
                        style={{ padding: "8px 40px 8px 12px" }}
                        className="relative w-full bg-[#efefef] rounded-sm border border-[#9f9f9f] "
                      >
                        <div className="absolute top-0 right-2 flex h-full items-center justify-center">
                          <ListPlus
                            size={20}
                            color="#505050"
                            className="cursor-pointer"
                            onClick={() =>
                              addCaracteristica(
                                caracteristica.fields
                                  ?.locacao_caracteristicas[0]
                              )
                            }
                          />
                        </div>
                        <p className="font-semibold text-[#505050]">
                          {caracteristica.fields.nome}
                        </p>
                        <li className="text-[#505050]">
                          {caracteristica.fields.descricao}
                        </li>
                      </div>
                    );
                  })}
              </div>
              <button
                onClick={() => atualizarLocacao()}
                className="bg-[#44523A] w-full text-white font-semibold py-3 rounded-sm hover:bg-[#506249] active:bg-[#44523A]"
                style={isMobile ? { marginTop: "10px" } : { marginTop: "10px" }}
              >
                Salvar alterações
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageTransitionAdd>
  );
}

Locacao.propTypes = {
  listaCaracteristicas: PropTypes.array.isRequired,
  setListaLocacoes: PropTypes.func.isRequired,
};

export default Locacao;
