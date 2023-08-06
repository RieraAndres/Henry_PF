import NavBar from "../../Components/NavBar/NavBar";
import CardsComponents from "../../Components/Cards/cards";
import Footer from "../../Components/Footer/Footer";
import styles from "../Home/Home.module.css";

import { useDispatch , useSelector } from "react-redux";
import { getPets } from "../../Redux/Actions";
import { useEffect} from "react";

function Home () {
    const dispatch = useDispatch()
    const petsCopy = useSelector((state) => state.petsCopy);

    useEffect(() => { //al cargar la pagina home traigo las mascotas 
        dispatch(getPets());
    }, [dispatch]);

    return(

        <div className={styles.fondo}> 
            <NavBar/>
            <CardsComponents mascotas={petsCopy}/>
            <Footer/>
        </div>
    )
}
export default Home;