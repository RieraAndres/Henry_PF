import styles from "./ErrorPage.module.css"
import { useNavigate} from "react-router-dom";

const ErrorPage = ({access}) => {

  const navigate = useNavigate();

  const handleBack=()=>{

    if(!access) navigate('/home')
    
  }

  return (
    <>
      <div className={styles.contenedor404}>

        <p className={styles.error}>404<br /> PATITAS NO ENCONTRADAS</p>
        <button className={styles.buttonLogIn} onClick={handleBack}>Home</button>
        
      </div>
    </>
  );
};

export default ErrorPage;