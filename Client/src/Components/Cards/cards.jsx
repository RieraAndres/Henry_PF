import Card from "../Card/Card"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styles from '../Cards/cards.module.css'
function CardsComponent({mascotas}) {
  
return (
    <div className={styles.CardsContainer}>
      <Row  xs={1} md={3} className="g-4">
      {mascotas.map((mascota, idx) => (
        <Col  key={idx}>
          <Card mascota={mascota} />
        </Col>
      ))}
    </Row>
    </div>
       );
}

export default CardsComponent;