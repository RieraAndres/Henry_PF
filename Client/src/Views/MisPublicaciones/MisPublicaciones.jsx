import React, { useEffect } from "react";
import styles from "../MisPublicaciones/MisPublicaciones.module.css";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
// import styles from "../Home/Home.module.css";
// import UpdatePetForm from "../../Components/PostPetForm/UpdateAndDelete/UpdateAndDelete"
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPets, updatePetStatus, getPetDetail } from "../../Redux/Actions";
import { NavLink } from "react-router-dom";

function MisPublicaciones() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const allPets = useSelector(state => state.allPets);
  const mascota = useSelector((state) => state.auxState);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  console.log("Mis publicaiones: Mascota", mascota);
  console.log("Mis publicaciones: Allpets: ", allPets);

  useEffect(() => {
    dispatch(getPets());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPetDetail(id));

}, [dispatch, id]);

  const handleStatusToggle = (id, currentStatus) => {
    const status = !currentStatus;
    dispatch(updatePetStatus(id, status)); // Llama a la acción de habilitar aquí
  };

  const handleEditClick = (pet) => {
    setSelectedPet(pet);
    setShowEditForm(true);
  };

  console.log(allPets);

  return (
    <div>
      <NavBar />
      <h2>Mis Publicaciones</h2>
      <div className={styles.container}>
        <div className={styles.pagination}>
  
      {allPets.map((pet) => (
        <div key={pet.id} className={styles.content}>
          <div className="imgBx">
            <img className={styles.imgMisPublicaciones} src={pet.imageUrl} alt={pet.name} />
            {/* <p>className={styles.content}{pet.description}</p> */}
          </div>
          <p>{pet.name}</p>
          <p>Status: {pet.status ? "Habilitado" : "Deshabilitado"}</p>
          <button onClick={() => handleStatusToggle(pet.id, pet.status)}>
            {pet.status ? "Deshabilitar" : "Habilitar"}
          </button>
          <NavLink to={`/profile/${id}/mispublicaciones/editar/${pet.id}`}>
            <button className={styles.button} onClick={() => handleEditClick(pet)}>Editar</button> {/* Botón para mostrar el formulario de edición */}
          </NavLink>
        </div>
      ))}
      {/* {showEditForm && ( // Mostrar el formulario de edición si showEditForm es true
        <UpdatePetForm petData={mascota} />
      )} */}
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default MisPublicaciones;