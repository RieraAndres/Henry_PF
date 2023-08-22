import Footer from '../../Components/Footer/Footer';
import NavBar from '../../Components/NavBar/NavBar';
import styles from '../About/About.module.css';

function Info () {
    return(
        <div className={styles.Container}>
            <NavBar/>
            <div className={styles.body}>
                <h2>¡Hola y bienvenidos a Patitas sin hogar!</h2>
                <div className={styles.presentar}>
                    <p>En Patitas sin hogar, estamos comprometidos a encontrar un hogar lleno de amor, cariño y protección a las mascotas necesitadas.<br /> 
                    Nuestra pasión por los animales y el deseo de crear un mundo donde cada uno encuentre su lugar perfecto.</p>
                    <h3>NUESTRA MISIÓN</h3>
                    <p>Es simple pero poderosa: Brindar una segunda oportunidad a las mascotas abandonadas, maltratadas, o simplemente que no puedan seguir en su hogar,
                        queremos conectarlos con familias cariñosas que esten dispuestas a darles un hogar. Creemos que cada vida animal es valiosa y merece ser tratada con respeto y compasión.
                    </p>
                    
                </div>
                <div className={styles.trabajo}>
                    <h3>¿CÓMO TRABAJAMOS?</h3>
                    <p><b>COLABORACIÓN:</b>Con refugios y organizaciones de rescate para proporcionar un lugar seguro y atención médica.</p>
                    <p><b>ADOPCIÓN RESPONSABLE:</b> Se realiza el proceso de adopción y nos aseguramos que cada una sea recibido por la familia adecuada.</p>
                    <p><h5>GRACIAS POR VISITAR Patitas sin hogar.</h5></p>
                    <p>Esperamos que encuentres la compañia perfecta en uno de nuestros adorables amigos.
                        <b/>¡No dudes en contactarnos!</p>
                    <p><b>¡AMOR Y PATITAS!</b></p>
                    <p>El equipo de Patitas sin hogar</p>
                </div>
            </div>
            <Footer/>
        </div>
      
    )
}
export default Info;