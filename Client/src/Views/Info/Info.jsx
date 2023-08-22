import Footer from '../../Components/Footer/Footer';
import NavBar from '../../Components/NavBar/NavBar'
import styles from '../Info/Info.module.css'
function Info () {
    return(
        <div className={styles.Container}>
            <NavBar/>
            <div className={styles.body}>
                <h2>¿Cómo adopto?</h2>
                <div className={styles.pasos}>
                    <p>Una vez que elegiste al proximo integrante, clickeá en <b>¡ADOPTAR!</b> y completa todos los datos.</p>
                    <p>Te pondremos en contacto con la persona a cargo de Patitas sin hogar.</p>
                    <p>Por último se coordinara la fecha y horario para entregar al futuro integrante.</p>
                </div>
                <div className={styles.criterios}>
                    <h2>Recuerda que...</h2>
                    <p>Las adopciones se tratan solamente con <b>ADOPTANTE FINAL</b>, no mediante terceros</p>
                    <p>Es requisito excluyente ser <b>MAYOR DE 21 AÑOS</b></p>
                </div>
            </div>
            <Footer/>
        </div>
      
    )
}
export default Info;