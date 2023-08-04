import Container from 'react-bootstrap/Container';
import styles from '../NavBar/NavBar.module.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Logo from "../../Assets/Logo/logo_PF.png"
import Menu from '../../Assets/Menu/menu_desplegable.png'
import SearchBar from '../SearchBar/SearchBar'


function NavBar() { 
  return (
        <Navbar variant="light" bg="#FFFDF6" >
            <Container className={styles.fijo}> 
                <Row>
                    <Col><Navbar.Brand href="/inicio"><img src={Logo} alt="" style={{width :'50px'}}></img></Navbar.Brand></Col>
                </Row>
                <Row>
                    <Col><SearchBar/></Col>
                </Row>
                <Row>
                    <Col className={styles.columna}>
                        <Navbar.Toggle aria-controls="navbar-dark-example" />
                        <Navbar.Collapse id="navbar-dark-example">
                        <Nav className={styles.boton}>
                            <NavDropdown
                            title={<img src={Menu} className={styles.menu} ></img>}
                            menuVariant="light"
                            >
                            <NavDropdown.Item href="/perfil">Perfil</NavDropdown.Item>
                            <NavDropdown.Item href="/about">About</NavDropdown.Item>
                            <NavDropdown.Item href="/donations">Donaciones</NavDropdown.Item>
                            <NavDropdown.Item href="/info">¿Cómo adoptar?</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        </Navbar.Collapse>
                    </Col>
                </Row>
            </Container>
    </Navbar>
    
  );
}

export default NavBar;