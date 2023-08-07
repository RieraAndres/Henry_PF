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

import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function NavBar() { 
    const location = useLocation()
    return (
        <Navbar className = {styles.Nav} >
            <Container>
                <Row>
                    <Col><Navbar.Brand href="/inicio"><img src={Logo} alt="" style={{width :'50px'}}></img></Navbar.Brand></Col>
                </Row>
                <Row>
                    <Col>
                        {location.pathname === "/home" ? <SearchBar/> : <Link to="/home"><button>Home</button></Link>}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Navbar.Toggle aria-controls="navbar-dark-example" />
                        <Navbar.Collapse id="navbar-dark-example">
                            <Nav>
                                <NavDropdown
                                    title={<img src={Menu} className={styles.menu}></img>}
                                    menuVariant="light"
                                >
                                    <NavDropdown.Item href="/perfil">Perfil</NavDropdown.Item>
                                    <NavDropdown.Item href="/about">About</NavDropdown.Item>
                                    <NavDropdown.Item href="/donations">Donaciones</NavDropdown.Item>
                                    <NavDropdown.Item href="/info">¿Como adoptar?</NavDropdown.Item>
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
