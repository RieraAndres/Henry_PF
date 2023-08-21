import styles from '../Card/Card.module.css'; // Importa los estilos del archivo CSS externo
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAlerts, deletePetDb } from '../../Redux/Actions';
import { Alert } from 'react-bootstrap';
import { useState } from 'react';



function CardComponent({ mascota }) { //traigo mascota desde Cards 
  const [showAlert, setShowAlert] = useState(false); // Estado para controlar la visibilidad de la alerta

  const alert = useSelector(state=>state.alerts)
  const location = useLocation()
  const dispatch = useDispatch()
  const { name, imageUrl ,age,id,status} = mascota; //destructuro datos a renderizar en la Card

  const handleDeletePet = (id)=>{
    dispatch(deletePetDb(id))
    setShowAlert(true); // Mostrar la alerta al eliminar un usuario
    setTimeout(() => {
      setShowAlert(false);
      dispatch(clearAlerts()); // Ocultar la alerta después de 1 segundos
      window.location.reload();
    }, 1000); 
  }

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
              <button onClick={()=>handleDeletePet(id)}>Eliminar</button>
              {showAlert && 
               <Alert key='success' variant='success' style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 9999 }}>{alert}</Alert>
              }
            </div>
          </div>
        </div>
        
      )}
      
    </div>
      
    
   
  );
}

export default CardComponent;
