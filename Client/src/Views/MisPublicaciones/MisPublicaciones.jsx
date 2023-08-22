import React, { useEffect, useState } from "react";
import styles from "../MisPublicaciones/MisPublicaciones.module.css";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPets, updatePetStatus, getPetDetail } from "../../Redux/Actions";
import { NavLink } from "react-router-dom";

function MisPublicaciones() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const allPets = useSelector((state) => state.allPets);
  const mascota = useSelector((state) => state.auxState);

  const [selectedPet, setSelectedPet] = useState(null);

  useEffect(() => {
    dispatch(getPets());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPetDetail(id));
  }, [dispatch, id]);

  const enabledPets = allPets.filter((pet) => pet.status === true);
  const disabledPets = allPets.filter((pet) => pet.status === false);

  const handleStatusToggle = async (id, currentStatus) => {
    const status = !currentStatus;
    await dispatch(updatePetStatus(id, status));
    if (!status) {
      const petToMove = enabledPets.find((pet) => pet.id === id);
      setSelectedPet(petToMove);
    } else {
      setSelectedPet(null);
    }
  };

  const handleEditClick = (pet) => {
    setSelectedPet(pet);
  };

  return (
    <div>
      <NavBar />
      <h2>Mis Publicaciones</h2>
      <div className={styles.cardContainer}>
      <h3>Habilitados</h3>
      <div className={styles.carousel}>
        <div className={styles.card}>
          {enabledPets.map((pet) => (
            <div
              key={pet.id}
              className={`${styles.carouselSlide} ${styles.content}`}
            >
              {/* Contenido de la tarjeta */}
              <div className="imgBx">
                <img
                  className={styles.imgMisPublicaciones}
                  src={pet.imageUrl}
                  alt={pet.name}
                />
              </div>
              <p>{pet.name}</p>
              <p>
                Status: {pet.status === true ? "Habilitado" : "Deshabilitado"}
              </p>
              <div className="buttons">
                <button onClick={() => handleStatusToggle(pet.id, pet.status)}>
                  {pet.status ? "Deshabilitar" : "Habilitar"}
                </button>
                <NavLink to={`/profile/${id}/mispublicaciones/editar/${pet.id}`}>
                  <button
                    className={styles.button}
                    onClick={() => handleEditClick(pet)}
                  >
                    Editar
                  </button>
                </NavLink>
              </div>
            </div>
          ))}
        </div>
        </div>
        <h3>Deshabilitados</h3>
        <div className={styles.card}>
          {disabledPets.map((pet) => (
            <div
              key={pet.id}
              className={`${styles.carouselSlide} ${styles.content}`}
            >
              {/* Contenido de la tarjeta */}
              <div className="imgBx">
                <img
                  className={styles.imgMisPublicaciones}
                  src={pet.imageUrl}
                  alt={pet.name}
                />
              </div>
              <p>{pet.name}</p>
              <p>
                Status: {pet.status === true ? "Habilitado" : "Deshabilitado"}
              </p>
              <div className="buttons">
                <button onClick={() => handleStatusToggle(pet.id, pet.status)}>
                  {pet.status ? "Deshabilitar" : "Habilitar"}
                </button>
                <NavLink to={`/profile/${id}/mispublicaciones/editar/${pet.id}`}>
                  <button
                    className={styles.buttonDisabled}
                    onClick={() => handleEditClick(pet)}
                    disabled={!pet.status} // Deshabilita el botón si la mascota está deshabilitada
                  >
                    Editar
                  </button>
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MisPublicaciones;
