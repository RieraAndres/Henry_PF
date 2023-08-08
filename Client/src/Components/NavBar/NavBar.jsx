import React from 'react';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import styles from '../NavBar/NavBar.module.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Logo from '../../Assets/Logo/logo_PF.png';
import Menu from '../../Assets/Menu/menu_desplegable.png';
import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';

function NavBar() {
  const location = useLocation();

  // Aplica la clase de posición fija solo si estás en la página exacta "/home"
  const isHomePage = location.pathname === '/home';
  const navbarClassName = isHomePage ? `${styles.Nav} ${styles.fixed}` : styles.Nav;

  return (
    <div className={styles.contenedor}>
      <Navbar className={navbarClassName}>
        <Container>
          <Row>
            <Col>
              <Navbar.Brand href="/inicio">
                <img className={styles.logo} src={Logo} alt=""></img>
              </Navbar.Brand>
            </Col>
          </Row>
          <Row className={styles.SearchBarColum}>
            <Col>
              {isHomePage ? (
                <SearchBar />
              ) : (
                <Link to="/home">
                  <button className={styles.boton}>Home</button>
                </Link>
              )}
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
                    drop="start"
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
    </div>
  );
}

export default NavBar;
