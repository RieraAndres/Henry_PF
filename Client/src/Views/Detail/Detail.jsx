import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { clearAux, getPetDetail } from "../../Redux/Actions";


import NavBar from '../../Components/NavBar/NavBar'
import Footer from '../../Components/Footer/Footer'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../Detail/Detail.module.css';
import GoolgeMaps from '../../Assets/Logo/googleMaps.png';
import Button from 'react-bootstrap/Button';

function Detail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const mascota = useSelector((state) => state.auxState);
    
    useEffect(() => {
        dispatch(getPetDetail(id));//al montar traigo la info de la receta en auxState
        return () => {
          dispatch(clearAux());//al desmontar limpio el estado
        };
      }, [dispatch, id]);

 console.log(mascota);

    return (
        <div>
            <NavBar/>
            <Container style={{marginTop:'5%', marginBottom: '5%'}}>
                <Row>
                    <Col md={5} style={{ textAlign: 'left', marginLeft: '5%' }} className={styles.ColIzq}>
                        <div className={styles.contenido} style={{ marginTop: '10%' }}>
                            <h1>{mascota.name/*.toUpperCase()*/}</h1>
                            <h4>EDAD:  {mascota.age}</h4>
                            <h4>GENERO:  {mascota.gender}</h4>
                            <h4>UBICACION: {mascota.location} <Link to={`https://www.google.com/maps/place/${mascota.location}`}><img src={GoolgeMaps} alt="Google Maps" style={{width:'25px'}}/></Link></h4>
                            <h4>TAMAÑO: {mascota.size}</h4>
                            <h5 style={{ textAlign: 'center' }}>DESCRIPCION</h5>
                            <p>{mascota.description}</p>
                        </div>
                    </Col>
                    <Col md={5} className={styles.colDer}>
                        <div className={styles.imgContainer}>
                            <div className={styles.imageWrapper}>
                                <img src={mascota.imageUrl} alt={mascota.name} className={styles.image} />
                            </div>
                        </div>
                        <div style={{ marginTop: '5%' }}>
                            <Button className={styles.button} variant="outline-info">¡ADOPTA!</Button>
                        </div>

                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    )
}

export default Detail;
