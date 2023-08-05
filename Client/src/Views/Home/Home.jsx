import NavBar from "../../Components/NavBar/NavBar";
import CardsComponents from "../../Components/Cards/cards";
import Footer from "../../Components/Footer/Footer";
import styles from "../Home/Home.module.css";

function Home () {
    return(
        <div className={styles.fondo}> 
            <NavBar/>
            <CardsComponents/>
            <Footer/>
        </div>
    )
}
export default Home;