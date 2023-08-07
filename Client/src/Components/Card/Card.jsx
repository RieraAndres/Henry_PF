import styles from '../Card/Card.module.css'; // Importa los estilos del archivo CSS externo
import { NavLink } from "react-router-dom";


function CardComponent({ mascota }) { //traigo mascota desde Cards 
  const { name, imageUrl ,age,id} = mascota; //destructuro datos a renderizar en la Card
  return (
      <NavLink to={`${id}`} style={{textDecoration: 'none'}}>
        <div className={styles.card}>
          <div className={styles.divCard}>
            <div>
              <img src={imageUrl} alt=''></img>
            </div>
            <div className={styles.info}>
              <p className={styles.nombre}>{name}</p>
              <p className={styles.edad}><b>{age}</b> años</p>
            </div>
          </div>
        </div>
      </NavLink>
    
   
  );
}

export default CardComponent;