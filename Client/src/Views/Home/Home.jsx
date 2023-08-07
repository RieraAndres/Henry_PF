import NavBar from "../../Components/NavBar/NavBar";
import CardsComponents from "../../Components/Cards/cards";
import Footer from "../../Components/Footer/Footer";
import styles from "../Home/Home.module.css";
import FiltersComponent from "../../Components/filters/filterAndSort"

import { useDispatch , useSelector } from "react-redux";
import { getPets } from "../../Redux/Actions";
import { useEffect,useState} from "react";

function Home () {
    const dispatch = useDispatch()
    //const petsCopy = useSelector((state) => state.petsCopy);
    const petsCopy = [
        {
            "name": "Max",
            "specie": "Dog",
            "age": "5",
            "size": "Mediano",
            "gender": "macho",
            "imageUrl": "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
            "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
            "description": "Max es un perro enérgico y cariñoso que siempre está listo para jugar contigo.",
            "email": "nvnsuibsd@yahoo.com",
            "numberPhone": "5789294034"
          },
          {
            "name": "Luna",
            "specie": "Dog",
            "age": "3",
            "size": "Grande",
            "gender": "hembra",
            "imageUrl": "https://cdn2.thedogapi.com/images/hMyT4CDXR.jpg",
            "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
            "description": "Luna es una perrita dulce y tranquila que adora acurrucarse contigo en el sofá.",
            "email": "nvnsuibsd@yahoo.com",
            "numberPhone": "5789294034"
          },
          {
            "name": "Rocky",
            "specie": "Dog",
            "age": "4",
            "size": "Mediano",
            "gender": "macho",
            "imageUrl": "https://www.tailwaggerphoto.com/wp-content/uploads/2021/04/Grand-Rapids-Dog-Photographer-2364-1280x853.jpg",
            "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
            "description": "Rocky es un perro valiente y aventurero que está listo para explorar el mundo contigo.",
            "email": "nvnsuibsd@yahoo.com",
            "numberPhone": "5789294034"
          },
          {
            "name": "Toby",
            "specie": "Dog",
            "age": "6",
            "size": "Mediano",
            "gender": "hembra",
            "imageUrl": "https://cdn2.thedogapi.com/images/1-7cgoZSh.jpg",
            "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
            "description": "Toby es un perro inteligente y curioso que siempre está listo para aprender cosas nuevas.",
            "email": "nvnsuibsd@yahoo.com",
            "numberPhone": "5789294034"
          },
          {
            "name": "Charlie",
            "specie": "Dog",
            "age": "5",
            "size": "Grande",
            "gender": "macho",
            "imageUrl": "https://cdn2.thedogapi.com/images/26pHT3Qk7.jpg",
            "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
            "description": "Charlie es un perro amigable y cariñoso que se llevará bien con todos en la familia.",
            "email": "nvnsuibsd@yahoo.com",
            "numberPhone": "5789294034"
          },
          {
            "name": "Bella",
            "specie": "Dog",
            "age": "5",
            "size": "Grande",
            "gender": "hembra",
            "imageUrl": "https://cdn2.thedogapi.com/images/BFRYBufpm.jpg",
            "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
            "description": "Bella es una perrita elegante y leal que será tu compañera fiel en todas tus aventuras.",
            "email": "nvnsuibsd@yahoo.com",
            "numberPhone": "5789294034"
          },
          {
            "name": "Lola",
            "specie": "Dog",
            "age": "5",
            "size": "Mediano",
            "gender": "hembra",
            "imageUrl": "https://cdn2.thedogapi.com/images/33mJ-V3RX.jpg",
            "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
            "description": "Lola es una perra guardiana y llena de energía que te hará reír con sus travesuras.",
            "email": "nvnsuibsd@yahoo.com",
            "numberPhone": "5789294034"
          },
          {
            "name": "Rocket",
            "specie": "Dog",
            "age": "8",
            "size": "Grande",
            "gender": "macho",
            "imageUrl": "https://cdn2.thedogapi.com/images/-HgpNnGXl.jpg",
            "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
            "description": " Rocket es un perro lleno de vitalidad y alegría que te contagiará su entusiasmo.",
            "email": "nvnsuibsd@yahoo.com",
            "numberPhone": "5789294034"
          },
          {
            "name": "Daisy",
            "specie": "Dog",
            "age": "6",
            "size": "Grande",
            "gender": "hembra",
            "imageUrl": "https://cdn2.thedogapi.com/images/dW5UucTIW.jpg",
            "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
            "description": "Daisy es una perrita tierna y afectuosa que adora recibir mimos y caricias.",
            "email": "nvnsuibsd@yahoo.com",
            "numberPhone": "5789294034"
          },
          {
            "name": "Buddy",
            "specie": "Dog",
            "age": "5",
            "size": "Grande",
            "gender": "macho",
            "imageUrl": "https://cdn2.thedogapi.com/images/pk1AAdloG.jpg",
            "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
            "description": "Buddy es un perro leal y protector que cuidará de ti y de tu familia.",
            "email": "nvnsuibsd@yahoo.com",
            "numberPhone": "5789294034"
          },
          {
            "name": "Coco",
            "specie": "Dog",
            "age": "4",
            "size": "Mediano",
            "gender": "macho",
            "imageUrl": "https://cdn2.thedogapi.com/images/sqQJDtbpY.jpg",
            "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
            "description": "Coco es un perro valiente y atlético que siempre está listo para correr y jugar.",
            "email": "nvnsuibsd@yahoo.com",
            "numberPhone": "5789294034"
          },
          {
            "name": "Olivia",
            "specie": "Dog",
            "age": "5",
            "size": "Mediano",
            "gender": "hembra",
            "imageUrl": "https://cdn2.thedogapi.com/images/Bymjyec4m.jpg",
            "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
            "description": "Olivia es una perrita cariñosa y juguetona que hará que cada día sea especial.",
            "email": "nvnsuibsd@yahoo.com",
            "numberPhone": "5789294034"
          },
          {
            "name": "Eva",
            "specie": "Dog",
            "age": "4",
            "size": "Chico",
            "gender": "hembra",
            "imageUrl": "https://cdn2.thedogapi.com/images/_gn8GLrE6.jpg",
            "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
            "description": "Eva es una perra amigable y cariñosa que se llevará bien con todos en la familia.",
            "email": "nvnsuibsd@yahoo.com",
            "numberPhone": "5789294034"
          },
          {
            "name": "Maxi",
            "specie": "Dog",
            "age": "5",
            "size": "Grande",
            "gender": "macho",
            "imageUrl": "https://cdn2.thedogapi.com/images/S14n1x9NQ.jpg",
            "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
            "description": "Maxi es un perro amigable y cariñoso que se llevará bien con todos en la familia.",
            "email": "nvnsuibsd@yahoo.com",
            "numberPhone": "5789294034"
          },
          {
            "name": "Rex",
            "specie": "Dog",
            "age": "4",
            "size": "Grande",
            "gender": "hembra",
            "imageUrl": "https://cdn2.thedogapi.com/images/HkC31gcNm.png",
            "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
            "description": "Rex es un perro fuerte y valiente que será tu compañero fiel en todas tus aventuras.",
            "email": "nvnsuibsd@yahoo.com",
            "numberPhone": "5789294034"
          },
          {
            "name": "Huma",
            "specie": "Cat",
            "age": "5",
            "size": "Mediano",
            "gender": "hembra",
            "imageUrl": "https://cdn2.thecatapi.com/images/d6i.jpg",
            "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
            "description": "Huma es una gatita misteriosa y juguetona que te cautivará con su mirada.",
            "email": "nvnsuibsd@yahoo.com",
            "numberPhone": "5789294034"
          },
          {
            "name": "Simba",
            "specie": "Cat",
            "age": "3",
            "size": "Mediano",
            "gender": "macho",
            "imageUrl": "https://cdn2.thecatapi.com/images/MTc2MTYxNg.jpg",
            "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
            "description": "Simba es un gato travieso y carismático que siempre está listo para explorar nuevos lugares.",
            "email": "nvnsuibsd@yahoo.com",
            "numberPhone": "5789294034"
          },
          {
            "name": "Mía",
            "specie": "Cat",
            "age": "4",
            "size": "Mediano",
            "gender": "hembra",
            "imageUrl": "https://cdn2.thecatapi.com/images/MTU1MTYzNw.jpg",
            "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
            "description": "Mia es una gatita dulce y encantadora que adora pasar tiempo acurrucada a tu lado.",
            "email": "nvnsuibsd@yahoo.com",
            "numberPhone": "5789294034"
          },
          {
            "name": "Oliver",
            "specie": "Cat",
            "age": "6",
            "size": "Mediano",
            "gender": "macho",
            "imageUrl": "https://cdn2.thecatapi.com/images/5na.jpg",
            "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
            "description": "Oliver es un gato curioso y astuto que siempre está investigando su entorno.",
            "email": "nvnsuibsd@yahoo.com",
            "numberPhone": "5789294034"
          },
          {
            "name": "Nala",
            "specie": "Cat",
            "age": "5",
            "size": "Mediano",
            "gender": "hembra",
            "imageUrl": "https://cdn2.thecatapi.com/images/7e4.jpg",
            "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
            "description": "Nala es una gatita cariñosa y tierna que te hará sonreír con sus ocurrencias",
            "email": "nvnsuibsd@yahoo.com",
            "numberPhone": "5789294034"
          },
          {
            "name": "Leo",
            "specie": "Cat",
            "age": "5",
            "size": "Mediano",
            "gender": "macho",
            "imageUrl": "https://cdn2.thecatapi.com/images/MTg1MjAxOQ.jpg",
            "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
            "description": "Leo es un gato valiente y aventurero que disfruta explorando cada rincón de tu hogar.",
            "email": "nvnsuibsd@yahoo.com",
            "numberPhone": "5789294034"
          },
          {
            "name": "Cleo",
            "specie": "Cat",
            "age": "3",
            "size": "Mediano",
            "gender": "hembra",
            "imageUrl": "https://cdn2.thecatapi.com/images/MTUyMDExNQ.jpg",
            "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
            "description": "Cleo es una gatita elegante y distinguida que se robará el corazón de todos.",
            "email": "nvnsuibsd@yahoo.com",
            "numberPhone": "5789294034"
          },
          {
            "name": "Pity",
            "specie": "Cat",
            "age": "8",
            "size": "Grande",
            "gender": "macho",
            "imageUrl": "https://cdn2.thecatapi.com/images/MTU5MzA0Mw.jpg",
            "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
            "description": "Pity es un gato juguetón y activo que siempre está en movimiento.",
            "email": "nvnsuibsd@yahoo.com",
            "numberPhone": "5789294034"
          },
          {
            "name": "Bella",
            "specie": "Cat",
            "age": "6",
            "size": "Mediano",
            "gender": "hembra",
            "imageUrl": "https://cdn2.thecatapi.com/images/MTY4NzY4Mw.jpg",
            "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
            "description": "Bella es una gatita encantadora y cariñosa que adora recibir caricias.",
            "email": "nvnsuibsd@yahoo.com",
            "numberPhone": "5789294034"
          },
          {
            "name": "Charlie",
            "specie": "Cat",
            "age": "5",
            "size": "Mediano",
            "gender": "macho",
            "imageUrl": "https://cdn2.thecatapi.com/images/4t6.jpg",
            "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
            "description": "Charlie es un gato curioso y amigable que se lleva bien con todos.",
            "email": "nvnsuibsd@yahoo.com",
            "numberPhone": "5789294034"
          },
          {
            "name": "Lily",
            "specie": "Cat",
            "age": "4",
            "size": "Mediano",
            "gender": "hembra",
            "imageUrl": "https://cdn2.thecatapi.com/images/MTkwMjQ0Nw.jpg",
            "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
            "description": "Lily es una gatita dulce y tranquila que adora los momentos de relax.",
            "email": "nvnsuibsd@yahoo.com",
            "numberPhone": "5789294034"
          },
          {
            "name": "Toby",
            "specie": "Cat",
            "age": "5",
            "size": "Mediano",
            "gender": "macho",
            "imageUrl": "https://cdn2.thecatapi.com/images/MTkwMjQ0Nw.jpg",
            "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
            "description": "Toby es un gato travieso y lleno de energía que te hará reír con sus ocurrencias.",
            "email": "nvnsuibsd@yahoo.com",
            "numberPhone": "5789294034"
          },
          {
            "name": "Luna",
            "specie": "Cat",
            "age": "4",
            "size": "Chico",
            "gender": "hembra",
            "imageUrl": "https://cdn2.thecatapi.com/images/MTc2NjExNw.jpg",
            "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
            "description": "Luna es una gatita enérgica y cariñosa que siempre está buscando jugar contigo.",
            "email": "nvnsuibsd@yahoo.com",
            "numberPhone": "5789294034"
          },
          {
            "name": "Oscar",
            "specie": "Cat",
            "age": "5",
            "size": "Mediano",
            "gender": "macho",
            "imageUrl": "https://cdn2.thecatapi.com/images/MTU2MjQxOQ.jpg",
            "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
            "description": "Oscar es un gato inteligente y astuto que te sorprenderá con su ingenio.",
            "email": "nvnsuibsd@yahoo.com",
            "numberPhone": "5789294034"
          },
          {
            "name": "Chloe",
            "specie": "Cat",
            "age": "3",
            "size": "Mediano",
            "gender": "hembra",
            "imageUrl": "https://cdn2.thecatapi.com/images/MTYyMDEyMA.jpg",
            "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
            "description": "Chloe es una gatita tierna y afectuosa que se convertirá en tu mejor amiga.",
            "email": "nvnsuibsd@yahoo.com",
            "numberPhone": "5789294034"
          }
    ]
   
    useEffect(() => { //al cargar la pagina home traigo las mascotas 
        dispatch(getPets());
    }, [dispatch]);


      /* PAGINADO */

  const [activePage, setActivePage] = useState(1); // para cambiar estilo del boton de pagina actual
  const [currentPage, setCurrentPage] = useState(1); //pagina actual
  const cardsPerPage = 9; //cartas por pagina

  
  const indexOfLastCard = currentPage * cardsPerPage; //calcula el indice inical y final de las cartas a renderizar
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = { mascotas: petsCopy?.slice(indexOfFirstCard, indexOfLastCard) };//saca "seccion" de recipes copy con 9 recetas
  
  const pageNumbers = Math.ceil(petsCopy?.length / cardsPerPage);//calcula la cantidad de paginas 
  const pagesArray = Array.from({ length: pageNumbers }, (_, index) => index + 1); //arreglo de numeros
  const hasNextPage = currentPage < pageNumbers; //booleano para renderizar next o prev
  const hasPrevPage = currentPage > 1;

  function paginate(pageNumber) {
    setCurrentPage(pageNumber);
    setActivePage(pageNumber);
  }
    return(

        <div className={styles.fondo}> 
            <NavBar/>
            <FiltersComponent/>
            <CardsComponents mascotas={currentCards}/>
            <div className={styles.pagination}>
                {hasPrevPage && (
                    <button onClick={() => paginate(currentPage - 1)}className={styles.pageButton}>Prev</button>
                )}
                {pagesArray.map((number) => (
                    <button key={number} onClick={() => paginate(number)}
                    className={activePage === number ? styles.activePageButton : styles.pageButton}>{number}</button>
                ))}
                {hasNextPage && (
                    <button onClick={() => paginate(currentPage + 1)}className={styles.pageButton}>Next</button>
                )}
            </div>
            <Footer/>
        </div>
    )
}
export default Home;