import React, { useEffect, useState, useRef } from "react";
import styles from "../MisPublicaciones/MisPublicaciones.module.css";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMyPets, updatePetStatus } from "../../Redux/Actions";
import { NavLink } from "react-router-dom";

function MisPublicaciones() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userPets = useSelector((state) => state.myPets);

  
  const [selectedPet, setSelectedPet] = useState(null);

  const containerRefEnabled = useRef(null);
  const containerRefDisabled = useRef(null);
  const [isMouseOver, setIsMouseOver] = useState(false);
  let directionEnabled = 1;
  let directionDisabled = 1;

  const handleMouseEnter = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };

  useEffect(() => {
    const containerEnabled = containerRefEnabled.current;
    const containerDisabled = containerRefDisabled.current;

    let intervalEnabled;
    let intervalDisabled;

    const startCarousel = () => {
      intervalEnabled = setInterval(() => {
        if (!isMouseOver) {
          if (containerEnabled.scrollLeft >= containerEnabled.scrollWidth - containerEnabled.clientWidth) {
            directionEnabled = -1;
          } else if (containerEnabled.scrollLeft <= 0) {
            directionEnabled = 1;
          }
          containerEnabled.scrollLeft += directionEnabled;
        }
      }, 20);

      intervalDisabled = setInterval(() => {
        if (!isMouseOver) {
          if (containerDisabled.scrollLeft >= containerDisabled.scrollWidth - containerDisabled.clientWidth) {
            directionDisabled = -1;
          } else if (containerDisabled.scrollLeft <= 0) {
            directionDisabled = 1;
          }
          containerDisabled.scrollLeft += directionDisabled;
        }
      }, 20);

      containerEnabled.addEventListener('mouseenter', handleMouseEnter);
      containerEnabled.addEventListener('mouseleave', handleMouseLeave);
      containerDisabled.addEventListener('mouseenter', handleMouseEnter);
      containerDisabled.addEventListener('mouseleave', handleMouseLeave);
    };

    const stopCarousel = () => {
      clearInterval(intervalEnabled);
      clearInterval(intervalDisabled);

      containerEnabled.removeEventListener('mouseenter', handleMouseEnter);
      containerEnabled.removeEventListener('mouseleave', handleMouseLeave);
      containerDisabled.removeEventListener('mouseenter', handleMouseEnter);
      containerDisabled.removeEventListener('mouseleave', handleMouseLeave);
    };

    startCarousel();

    return () => {
      stopCarousel();
    };
  }, [isMouseOver]);

  useEffect(() => {
    dispatch(getMyPets(id));
  }, [dispatch, id]);

  // useEffect(() => {
  //   dispatch(getPetDetail(id));
  // }, [dispatch, id]);

  const enabledPets = userPets.filter((pet) => pet.status === true);
  const disabledPets = userPets.filter((pet) => pet.status === false);

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
    <div className={styles.fondo}>
      <NavBar />
      <h2>Mis Publicaciones</h2>
      <div className={styles.cardContainer}>
      <h3>Habilitados</h3>
      <div className={styles.carousel}>
      <div ref={containerRefEnabled} className={styles.card}>
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
        </div>
        <div className={styles.cardContainer}>
        <h3>Deshabilitados</h3>
        <div className={`${styles.carousel} ${styles.card}`}>
        <div ref={containerRefDisabled} className={styles.card}>
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
      </div>
      <Footer />
    </div>
  );
}

export default MisPublicaciones;