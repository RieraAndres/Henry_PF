import styles from '../Card/Card.module.css'; // Importa los estilos del archivo CSS externo
import { NavLink } from "react-router-dom";


function CardComponent({ mascota }) { //traigo mascota desde Cards 
  const { name, img ,id} = mascota; //destructuro datos a renderizar en la Card
  return (
      <NavLink to={`${id}`} style={{textDecoration: 'none'}}>
        <div className={styles.card}>
          <div className={styles.divCard}>
            <img src={img} alt=''></img>
            <h1>{name}</h1>
          </div>
        </div>
      </NavLink>
    
   
  );
}

export default CardComponent;