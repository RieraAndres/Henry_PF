import Form from 'react-bootstrap/Form';
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import styles from "../../Views/Donaciones/Donaciones.module.css";


function Donaciones() {
  return (
    <div className={styles.fondo}>
    <NavBar/>
    <div className={styles.contenedor}>
    <Form className={styles.form}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        
        <Form.Label className={styles.name}>Nombre:</Form.Label>
        <Form.Control type="nombre" placeholder="Nombre" />

        <Form.Label>Teléfono:</Form.Label>
        <Form.Control type="telefono" placeholder="Telefono" />

        <Form.Label>E-mail:</Form.Label>
        <Form.Control type="mail" placeholder="E-mail" />

        <Form.Label>Destino:</Form.Label>
        <Form.Control type="destino" placeholder="Destino" />

        <Form.Label>Descripción:</Form.Label>
        <Form.Control type="descripcion" placeholder="Descripción" />
        
        <Form.Label>Rango de Patitas</Form.Label>
        <Form.Range/>

      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
      </Form.Group>
      <button type="button" className={styles.boton}>
            Dona Patitas
          </button>
    </Form>
    </div>
    <Footer/>
    </div>
  );
}

export default Donaciones;