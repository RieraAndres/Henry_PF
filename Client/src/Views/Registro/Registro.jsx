import RegisterForm from "../../Components/RegisterForm/RegisterForm";
import { Link } from "react-router-dom";

import styles from "./Registro.module.css";

function Registro () {
    return(
        <div className={styles.Registro}>
            <div className={styles.loginLink}>
                <Link to="/">
                    <button>Volver</button>
                </Link>
            </div>
            <RegisterForm/>
        </div>
    )
}
export default Registro;