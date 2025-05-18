import { useState, useEffect } from "react";
import "./App.css";

import axios from "axios";
import { AnimatePresence } from "framer-motion";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Locacao from "./components/Locacao";
import ListaLocacoes from "./components/ListaLocacoes";
import CadastrarLocacao from "./components/CadastrarLocacao";
import SideBar from "./components/SideBar";
import Caracteristicas from "./components/Caracteristicas";

function Sections() {
  const token =
    "patNIM0Lo6dcGG5oi.17e5f1e4ea00174d38fc29d288134a64b8dfd7862ea8a19d1876be0a8fdcd244";
  const location = useLocation();

  const [listaLocacoes, setListaLocacoes] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.airtable.com/v0/appqkjRYvyIwSHLR7/locacoes?view=Grid%20view",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setListaLocacoes(response.data.records);
      })
      .catch((error) => {
        console.error(`Erro ao obter locações: ${error}`);
      });
  }, []);
  console.log(listaLocacoes);

  const setarLocacoes = () => {
    axios
      .get(
        "https://api.airtable.com/v0/appqkjRYvyIwSHLR7/locacoes?view=Grid%20view",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setListaLocacoes(response.data.records);
      })
      .catch((error) => {
        console.error(`Erro ao obter locações: ${error}`);
      });
  };

  const [listaCaracteristicas, setListaCaracteristicas] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.airtable.com/v0/appqkjRYvyIwSHLR7/caracteristicas?view=Grid%20view",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setListaCaracteristicas(response.data.records);
      })
      .catch((error) => {
        console.error(`Erro ao obter locações: ${error}`);
      });
  }, []);

  const setarCaracteristicas = () => {
    axios
      .get(
        "https://api.airtable.com/v0/appqkjRYvyIwSHLR7/caracteristicas?view=Grid%20view",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setListaCaracteristicas(response.data.records);
      })
      .catch((error) => {
        console.error(`Erro ao obter locações: ${error}`);
      });
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={<ListaLocacoes listaLocacoes={listaLocacoes} />}
          />
          <Route
            path="/cadastrar"
            element={<CadastrarLocacao setListaLocacoes={setarLocacoes} />}
          />
          <Route
            path={`/locacao/:id`}
            element={
              <Locacao
                listaCaracteristicas={listaCaracteristicas}
                setListaLocacoes={setarLocacoes}
              />
            }
          />
          <Route
            path="/caracteristicas"
            element={
              <Caracteristicas
                listaCaracteristicas={listaCaracteristicas}
                setListaCaracteristicas={setarCaracteristicas}
              />
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <>
      <Router>
        <SideBar />
        <Sections />
      </Router>
    </>
  );
}

export default App;
