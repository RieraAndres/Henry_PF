import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import React, { useEffect, useState } from "react";
import styles from "./EditPet.module.css"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UpdatePetForm from "../../Components/PostPetForm/UpdateAndDelete/UpdateAndDelete";


function EditPet() {
    const { id } = useParams();
    const mascotas = useSelector((state) => state.allPets);
    const [selectedPet, setSelectedPet] = useState(null);

    useEffect(() => {
        // Buscar la mascota seleccionada por su ID en el array de mascotas
        const pet = mascotas.find((pet) => pet.id === id);
        setSelectedPet(pet);
    }, [mascotas, id]);

    return (
        <div className={styles.fondo}>
                <NavBar />
            <div className={styles.container}>
                {selectedPet && ( // Mostrar el formulario de edición solo si hay una mascota seleccionada
                    <UpdatePetForm petId={id} petData={selectedPet} />
                )}
                <Footer />
            </div>
        </div>
    );
}

export default EditPet;