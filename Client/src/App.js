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
import Registro from "./Views/Registro/Registro";
import Dashboard from "./Views/Dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/home/:id" element={<Detail />} />
        <Route path="/info" element={<Info />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/donations" element={<Donaciones />} />
        <Route path="/adopt" element={<DarAdopt />} />
        <Route path="/admindashboard" element={<Dashboard/>}/>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
