import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearAux, getPetDetail } from "../../Redux/Actions";
import NavBar from '../../Components/NavBar/NavBar'
import Footer from '../../Components/Footer/Footer'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../Detail/Detail.module.css';
import GoolgeMaps from '../../Assets/Logo/googleMaps.png';
import FormAdopt from "../../Components/FormAdopt/FormAdopt";
import UpdateAndDelete from '../../Components/PostPetForm/UpdateAndDelete/UpdateAndDelete.jsx';

function Detail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const mascota = useSelector((state) => state.auxState);
    
  
    const [showForm, setShowForm] = useState(false);
  
    useEffect(() => {
        dispatch(getPetDetail(id));
        return () => {
            dispatch(clearAux());
        };
    }, [dispatch, id]);

    return (
        <div className={styles.BigContainer}>
            <NavBar />
            <Container  className={styles.Container}>
                <Row >
                    {showForm ? (
                        <Col style={{marginTop: '0'}}>
                            <FormAdopt petId={id}/>
                        </Col>
                    ) : (
                        <Col md={5} className={styles.ColIzq}>
                            <div className={styles.contenido} >
                                <h1>{mascota.name/*.toUpperCase()*/}</h1>
                                <h4>EDAD:  {mascota.age}</h4>
                                <h4>GENERO:  {mascota.gender}</h4>
                                <h4>UBICACIÓN: {mascota.location} <a href={`https://www.google.com/maps/place/${mascota.location}`} target="_blank" rel="noopener noreferrer"><img src={GoolgeMaps} alt="Google Maps" style={{ width: '25px' }} /></a></h4>
                                <h4>TAMAÑO: {mascota.size}</h4>
                                <h5 style={{ textAlign: 'center' }}>DESCRIPCIÓN</h5>
                                <p>{mascota.description}</p>
                            </div>
                        </Col>
                    )}
                    <Col md={5} className={styles.colDer}>
                        <div className={styles.imgContainer}>
                            <div className={styles.imageWrapper}>
                                <img src={mascota.imageUrl} alt={mascota.name} className={styles.image} />
                            </div>
                        </div>
                        <div style={{ marginTop: '5%' }}>
                            {!showForm ? (
                                <button className={styles.button}  onClick={() => setShowForm(true)}>¡ADOPTA!</button>
                            ):(
                                <button className={styles.button}  onClick={() => setShowForm(false)}>¡INFO!</button>

                            )}
                            
                        </div>
                    </Col>
                    <Col>
                        <div>
                            {/* <UpdateAndDelete mascota={id} /> */}
                        </div>
                    </Col>
                </Row>      
            </Container>
            <Footer />
        </div>
    );
}

export default Detail;
