import Footer from '../../Components/Footer/Footer';
import NavBar from '../../Components/NavBar/NavBar'
import styles from '../Info/Info.module.css'
function Info () {
    return(
        <div className={styles.Container}>
            <NavBar/>
            <div className={styles.body}>
                <h1>¿Como adopto?</h1>
                <div className={styles.pasos}>
                    <p>Una vez que elegiste al proximo integrante, clickeá en ¡ADOPTAR!  y completa todos los datos.</p>
                    <p>Te pondremos en contacto con la persona a cargo del Patitas sin hogar.</p>
                    <p>Por ultimo se cordinara la fecha y horario para buscar al futuro integrante.</p>
                </div>
                <div className={styles.criterios}>
                    <h1>Recuerda que...</h1>
                    <p>Las adopciones se tratan solamente con ADOPTANTE FINAL, no mediante terceros</p>
                    <p>Es requisito excluyente ser MAYOR DE 21 AÑOS</p>
                </div>
            </div>
            <Footer/>
        </div>
      
    )
}
export default Info;