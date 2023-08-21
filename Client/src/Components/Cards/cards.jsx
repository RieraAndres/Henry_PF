// import Card from "../Card/Card"
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
// import styles from '../Cards/cards.module.css'
// function CardsComponent({mascotas}) {
//   let pets = mascotas.mascotas
//   // Verificar si pets es un array antes de usar map
//   if (!Array.isArray(pets)) {
//     // Si pets no es un array, mostrar un mensaje o renderizar un componente de carga
//     return <div>Cargando...</div>;
//   }
// return (
//     <div className={styles.CardsContainer}>
//       <Row  xs={1} md={3} className="g-4">
//       {pets.map((mascota, idx) => (
//         <Col  key={idx}>
//           <Card mascota={mascota} />
//         </Col>
//       ))}
//     </Row>
//     </div>
//        );
// }

// export default CardsComponent;


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
      <Row xs={1} md={3} className="g-4">
        {mascotas.map((mascota) => (
          <Col key={mascota.id}>
            <Card mascota={mascota} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default CardsComponent;