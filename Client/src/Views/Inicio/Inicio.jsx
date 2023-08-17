import React from "react";
import styles from "./Inicio.module.css";
import { NavLink } from "react-router-dom";
function Inicio() {
  return (
    <div className={styles.container}>
        <p className={styles.paragraphAdopt}>
        ¿ESTÁS INTERESADO EN ADOPTAR?
      </p>
      <NavLink to="/home" className={styles.buttonAdopt}> Mascotas en adopcion </NavLink>
      <NavLink to="/adopt" className={styles.buttonGive}>Dar en adopcion</NavLink>
      <p className={styles.paragraphGive}>
        EL AMOR NO SE PUEDE COMPRAR
      </p>
    </div>
  );
}

export default Inicio;