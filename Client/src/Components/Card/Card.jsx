import styles from '../Card/Card.module.css'; // Importa los estilos del archivo CSS externo
import { NavLink, useLocation } from "react-router-dom";


function CardComponent({ mascota }) { //traigo mascota desde Cards 
  const location = useLocation()
  const { name, imageUrl ,age,id,status} = mascota; //destructuro datos a renderizar en la Card
  return (
    <div>
      {location.pathname === "/home" ? (
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
      ):(
        <div className={styles.card}>
          <div className={styles.divCard}>
            <div>
              <img src={imageUrl} alt=''></img>
            </div>
            <div >
              <p style={{fontSize:"30px"}}>{name}</p>
              <p style={{fontSize:"30px"}}>{age} años</p>
              {status === true?(<p style={{fontSize:"30px"}}>Activa</p>):(<p style={{fontSize:"30px"}}>Inactiva</p>)}
              <button>Eliminar</button>
            </div>
          </div>
        </div>
        
      )}
      
    </div>
      
    
   
  );
}

export default CardComponent;
