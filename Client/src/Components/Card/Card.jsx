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
    }, 2000); 
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
              {status === true?(<p style={{fontSize:"30px",color:"red"}}>Activa</p>):(<p style={{fontSize:"30px",color:"red"}}>Inactiva</p>)}
              <button className={styles.deletebutton} onClick={()=>handleDeletePet(id)} >
                <svg className={styles.deletesvgIcon} viewBox="0 0 448 512">
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                </svg>
              </button>
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
