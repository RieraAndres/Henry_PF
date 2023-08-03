import Card from 'react-bootstrap/Card';
import styles from '../Card/Card.module.css'; // Importa los estilos del archivo CSS externo
import { NavLink } from "react-router-dom";


function CardComponent({ mascota }) { //traigo mascota desde Cards 
  const { name, img ,id} = mascota; //destructuro datos a renderizar en la Card
  return (
    <div className={styles.cardContainer}>
      <NavLink to={`${id}`} style={{textDecoration: 'none'}}>
       <Card className={styles.cardData} >
        <Card.Img className={styles.cardImage} variant="top" src={img} />
        <Card.Body>
        <Card.Title>{name}</Card.Title>
        </Card.Body>
       </Card>
      </NavLink>
    </div>
    
   
  );
}

export default CardComponent;