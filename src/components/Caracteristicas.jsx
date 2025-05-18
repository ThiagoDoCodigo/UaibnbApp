import { Captions, ListCheck, ListPlus, PencilLine } from "lucide-react";
import PageTransition from "./PageTransition";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function Caracteristicas({ listaCaracteristicas, setListaCaracteristicas }) {
  const [opotion, setOpition] = useState(1);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [lista, setLista] = useState([]);
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
    if (listaCaracteristicas) {
      setLista(listaCaracteristicas);
    }
  }, [listaCaracteristicas]);

  const token =
    "patNIM0Lo6dcGG5oi.17e5f1e4ea00174d38fc29d288134a64b8dfd7862ea8a19d1876be0a8fdcd244";

  const criarCaracteristica = async () => {
    if (!titulo || !descricao) {
      alert("Preencha todos os campos!");
      return;
    }
    try {
      const payload = {
        records: [
          {
            fields: {
              nome: titulo,
              descricao: descricao,
            },
          },
        ],
      };

      const response = await axios.post(
        "https://api.airtable.com/v0/appqkjRYvyIwSHLR7/caracteristicas",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Caracteristica criada com sucesso:", response.data);
      alert("Caracteristica criada com sucesso!");

      setListaCaracteristicas();
      setTitulo("");
      setDescricao("");
    } catch (error) {
      console.error("Erro ao criar caracteristica:", error);

      if (error.response) {
        console.log("Detalhes do erro:", error.response.data);
      }
    }
  };

  const atualizarCaracteristica = async (id, titulo, descricao) => {
    try {
      const response = await axios.patch(
        `https://api.airtable.com/v0/appqkjRYvyIwSHLR7/caracteristicas/${id}`,
        {
          fields: {
            nome: titulo,
            descricao: descricao,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Caracteristica atualizada com sucesso:", response.data);
      alert("Caracteristica atualizada com sucesso!");
      setListaCaracteristicas();
    } catch (error) {
      console.error("Erro ao atualizar caracteristica:", error);
    }
  };

  return (
    <PageTransition>
      <div
        className={` flex-wrap flex items-center gap-4 justify-around py-7 px-4 absolute left-0 w-full h-[calc(100vh-70px)] overflow-y-auto ${
          isMobile ? "top-[100px] " : "top-[70px] "
        }`}
      >
        <div className="bg-white rounded-lg w-[700px]  flex flex-col items-center shadow-md p-8 hover:shadow-lg">
          <div className="w-full flex items-center justify-around">
            <p
              className="text-1xl font-semibold text-[#505050] underline-offset-2 cursor-pointer"
              onClick={() => setOpition(1)}
              style={{ textDecoration: opotion === 1 ? "underline" : "none" }}
            >
              Cadastrar
            </p>
            <p
              className="text-1xl font-semibold text-[#505050] underline-offset-2 cursor-pointer"
              onClick={() => setOpition(2)}
              style={{ textDecoration: opotion === 2 ? "underline" : "none" }}
            >
              Características
            </p>
          </div>
          <div
            className="h-full flex-col items-center justify-center w-full mt-12"
            style={{ display: opotion === 1 ? "flex" : "none" }}
          >
            <div className="flex items-center gap-2">
              <ListPlus size={30} color="#505050" />
              <p className="text-[20px] font-semibold text-[#505050]">
                Cadastrar nova característica
              </p>
            </div>
            <div className="flex flex-col items-start gap-2 w-full mt-3">
              <div className="flex items-center gap-2">
                <PencilLine size={20} color="#505050" />
                <p className="text-[16px] text-[#505050]">
                  Título da característica:
                </p>
              </div>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Título da característica..."
                className="w-full focus:outline-none bg-[#efefef] color-[#506249] placeholder-[#506249bb] py-1 px-4 rounded-sm border border-[#9f9f9f] "
              />
            </div>
            <div className="flex flex-col items-start gap-2 w-full mt-3">
              <div className="flex items-center gap-2">
                <Captions size={20} color="#505050" />
                <p className="text-[16px] text-[#505050]">
                  Descrição da característica:
                </p>
              </div>
              <textarea
                type="text"
                rows="4"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descrição da característica..."
                className="w-full focus:outline-none bg-[#efefef] color-[#506249] placeholder-[#506249bb] py-1 px-4 rounded-sm  border border-[#9f9f9f] "
              />
            </div>
            <button
              onClick={() => criarCaracteristica()}
              className="bg-[#44523A] w-full mt-4 text-white font-semibold py-2 rounded-sm hover:bg-[#506249] active:bg-[#44523A]"
            >
              Cadastrar característica
            </button>
          </div>
          <div
            className="h-full flex-col items-center justify-center w-full mt-12"
            style={{ display: opotion === 2 ? "flex" : "none" }}
          >
            <div className="flex items-center gap-2">
              <ListCheck size={30} color="#505050" />
              <p className="text-[20px] font-semibold text-[#505050]">
                Lista de características
              </p>
            </div>
            <div className="flex-col flex mt-3 gap-2 w-full overflow-y-auto h-[68vh]">
              {lista.map((caracteristica) => {
                return (
                  <div
                    key={caracteristica.id}
                    style={{ padding: "8px 40px 8px 12px" }}
                    className="relative w-full bg-[#efefef] rounded-sm border border-[#9f9f9f] flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <PencilLine size={20} color="#505050" />
                      <p className="text-[16px] text-[#505050]">
                        Título da característica:
                      </p>
                    </div>
                    <input
                      type="text"
                      value={caracteristica.fields.nome}
                      className="bg-[#fff] w-full focus:outline-none color-[#506249] placeholder-[#506249bb] py-1 px-4 rounded-sm border border-[#9f9f9f] "
                      onChange={(e) => {
                        const novaLista = lista.map((item) => {
                          if (item.id === caracteristica.id) {
                            return {
                              ...item,
                              fields: {
                                ...item.fields,
                                nome: e.target.value,
                              },
                            };
                          }
                          return item;
                        });
                        setLista(novaLista);
                      }}
                    />
                    <div className="flex items-center gap-2">
                      <Captions size={20} color="#505050" />
                      <p className="text-[16px] text-[#505050]">
                        Descrição da característica:
                      </p>
                    </div>
                    <textarea
                      rows={3}
                      type="text"
                      className="bg-[#fff] w-full focus:outline-none color-[#506249] placeholder-[#506249bb] py-1 px-4 rounded-sm border border-[#9f9f9f] "
                      value={caracteristica.fields.descricao}
                      onChange={(e) => {
                        const novaLista = lista.map((item) => {
                          if (item.id === caracteristica.id) {
                            return {
                              ...item,
                              fields: {
                                ...item.fields,
                                descricao: e.target.value,
                              },
                            };
                          }
                          return item;
                        });
                        setLista(novaLista);
                      }}
                    />

                    <button
                      onClick={() =>
                        atualizarCaracteristica(
                          caracteristica.id,
                          caracteristica.fields.nome,
                          caracteristica.fields.descricao
                        )
                      }
                      className="bg-[#44523A] w-full mt-4 text-white font-semibold py-2 rounded-sm hover:bg-[#506249] active:bg-[#44523A]"
                    >
                      Atualizar característica
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

Caracteristicas.propTypes = {
  listaCaracteristicas: PropTypes.array.isRequired,
  setListaCaracteristicas: PropTypes.func.isRequired,
};

export default Caracteristicas;
