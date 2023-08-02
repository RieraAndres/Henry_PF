import CardGroup from 'react-bootstrap/CardGroup';

function cards() { //traigo las mascotas por props desde Home
  const mascotas = [{name:"Pepito",img:"https://humanidades.com/wp-content/uploads/2017/02/perro-1-e1561678907722.jpg"}, {name:"Olaf",img:"https://upload.wikimedia.org/wikipedia/commons/0/04/Labrador_Retriever_%281210559%29.jpg"},{name:"Floki",img:"https://t1.ea.ltmcdn.com/es/posts/5/6/2/10_caracteristicas_de_los_perros_24265_600_square.jpg"}]
return (
  <CardGroup> 
    {mascotas.map((mascota)=><p>{mascota.name}</p>)}
  </CardGroup>
       );
}

export default cards;