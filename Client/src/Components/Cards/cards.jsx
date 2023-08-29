import React from 'react';
import Card from "../Card/Card";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styles from '../Cards/cards.module.css';

function CardsComponent({ mascotas }) {

  // let pets = mascotas.mascotas
  // Verificar si pets es un array antes de usar map
  if (!Array.isArray(mascotas)) {
    // Si pets no es un array, mostrar un mensaje o renderizar un componente de carga
    return <div>Cargando...</div>;
  }

  return (
      <div className={styles.CardsContainer}>
        <Row xs={1} sm={2} md={2} lg={3} className="justify-content-center align-items-center" >
          {mascotas.map((mascota) => (
            <Col key={mascota.id} className={styles.Container}>
              <Card mascota={mascota} />
            </Col>
          ))}
        </Row>
      </div>  
  );
}

export default CardsComponent;