import Card from 'react-bootstrap/Card';
import styles from '../Card/Card.module.css'; // Importa los estilos del archivo CSS externo

function CardComponent({ mascota }) { //traigo mascota desde Cards 
  const { name, img } = mascota; //destructuro datos a renderizar en la Card
  return (
    <Card className={styles.cardContainer} >
      <Card.Img className={styles.cardImage} variant="top" src={img} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default CardComponent;