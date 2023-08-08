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
    const petsCopy = useSelector((state) => state.petsCopy);
   
    
   
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