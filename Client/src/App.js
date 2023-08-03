import { Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./Views/About/About";
import Inicio from "./Views/Inicio/Inicio";
import Login from "./Views/Login/Login";
import Detail from "./Views/Detail/Detail";
import Home from "./Views/Home/Home";
import Info from "./Views/Info/Info";
import Profile from "./Views/Profile/Profile";
import Donaciones from "./Views/Donaciones/Donaciones";
import DarAdopt from "./Views/DarAdopt/DarAdopt";
import ErrorPage from "./Views/ErrorPage/ErrorPage";
import axios from "axios";

function App() {
  return (
    <div className="App">
      {/* <h1 className="Titulo">PATITAS SIN HOGAR</h1> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/info" element={<Info />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/donations" element={<Donaciones />} />
        <Route path="/adopt" element={<DarAdopt />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
