import React from "react";
import styles from "./Inicio.module.css";

function Inicio() {
  return (
    <div className={styles.container}>
        <p className={styles.paragraphAdopt}>
        ¿ESTÁS INTERESADO EN ADOPTAR?
      </p>
      <button className={styles.buttonAdopt} onClick={() => window.location.href = '/home'}>
        Perros en Adopción
      </button>
      <button className={styles.buttonGive} onClick={() => window.location.href = '/adopt'}>
        Dar en Adopción
      </button>
      <p className={styles.paragraphGive}>
        EL AMOR NO SE PUEDE COMPRAR
      </p>
    </div>
  );
}

export default Inicio;