import Card from "../Card/Card"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styles from '../Cards/cards.module.css'
function CardsComponent(/*{mascotas}*/) { //traigo las mascotas por props desde Home
  
  const mascotas = [
    {id:1,name:"Pepito",img:"https://humanidades.com/wp-content/uploads/2017/02/perro-1-e1561678907722.jpg"},
    {id:2,name:"Olaf",img:"https://upload.wikimedia.org/wikipedia/commons/0/04/Labrador_Retriever_%281210559%29.jpg"},
    {id:3,name:"Floki",img:"https://t1.ea.ltmcdn.com/es/posts/5/6/2/10_caracteristicas_de_los_perros_24265_600_square.jpg"},
    {id:4,name:"Floki",img:"https://t1.ea.ltmcdn.com/es/posts/5/6/2/10_caracteristicas_de_los_perros_24265_600_square.jpg"},
    {id:5,name:"Floki",img:"https://t1.ea.ltmcdn.com/es/posts/5/6/2/10_caracteristicas_de_los_perros_24265_600_square.jpg"},
    {id:6,name:"Floki",img:"https://t1.ea.ltmcdn.com/es/posts/5/6/2/10_caracteristicas_de_los_perros_24265_600_square.jpg"},
    {id:7,name:"Floki",img:"https://t1.ea.ltmcdn.com/es/posts/5/6/2/10_caracteristicas_de_los_perros_24265_600_square.jpg"},
    {id:8,name:"Floki",img:"https://t1.ea.ltmcdn.com/es/posts/5/6/2/10_caracteristicas_de_los_perros_24265_600_square.jpg"}
  ]
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