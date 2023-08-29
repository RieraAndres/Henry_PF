import { Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./Views/About/About";
import Inicio from "./Views/Inicio/Inicio";
import Login from "./Views/Login/Login";
import Detail from "./Views/Detail/Detail";
import Home from "./Views/Home/Home";
import Info from "./Views/Info/Info";
import Profile from "./Views/Profile/Profile";
import MisPublicaciones from "./Views/MisPublicaciones/MisPublicaciones";
import EditPet from "./Views/EditPet/EditPet";
import Donaciones from "./Views/Donaciones/Donaciones";
import DarAdopt from "./Views/DarAdopt/DarAdopt";
import ErrorPage from "./Views/ErrorPage/ErrorPage";
import Registro from "./Views/Registro/Registro";
import Dashboard from "./Views/Dashboard/Dashboard";
import DashboardPerfil from "./Views/DashboardPerfil/DashboardPerfil";
import { useSelector } from "react-redux";
import Reviews from "./Views/Review/Review";

function App() {
  const LoggedUser = useSelector((state) => state.userLogedIn);
  const isAdmin = useSelector((state) => state.userData);
  // useEffect(() => {
  //   if (LoggedUser === false) {
  //     navigate("/"); // Redirigir a "/" si el usuario no está autenticado
  //   }
  // }, [LoggedUser, navigate]);
  // console.log(LoggedUser);

  return (
    <div className="App">
      <Routes>
        {LoggedUser === true && (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/home/:id" element={<Detail />} />
            <Route path="/info" element={<Info />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route
              path="/profile/:id/mispublicaciones"
              element={<MisPublicaciones />}
            />
            <Route
              path="/profile/:id/mispublicaciones/editar/:id"
              element={<EditPet />}
            />
            <Route path="/donations" element={<Donaciones />} />
            <Route path="/adopt" element={<DarAdopt />} />
            <Route path="/reviews" element={<Reviews />} />
            {isAdmin && isAdmin.typeUser === "Admin" ? (
              <>
                <Route path="/admindashboard" element={<Dashboard />} />
                <Route
                  path="/admindashboard/:id"
                  element={<DashboardPerfil />}
                />
              </>
            ) : null}

            <Route path="*" element={<ErrorPage />} />
          </>
        )}
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </div>
  );
}

export default App;
