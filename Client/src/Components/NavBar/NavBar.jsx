import React from 'react';
import { NavLink,Link, useLocation } from 'react-router-dom';
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
import Reviews from '../../Views/Review/Review';
import { useDispatch,useSelector } from 'react-redux';
import { logOutUser } from '../../Redux/Actions';

function NavBar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const LoggedData = useSelector(state=>state.userData)
  console.log(LoggedData);
  
  // Aplica la clase de posición fija solo si estás en la página exacta "/home"
  const isHomePage = location.pathname === '/home';
  const navbarClassName = isHomePage ? `${styles.Nav} ${styles.fixed}` : styles.Nav;

  const HandleLogOut = (e)=>{
    e.preventDefault();
    dispatch(logOutUser)
    window.location.href = "/"
  }

  
  return (
    <div className={styles.contenedor}>
      <Navbar className={navbarClassName}>
        <Container>
          <Row>
            <Col>
              <Navbar.Brand>
                <NavLink to="/inicio"><img className={styles.logo} src={Logo} alt=""></img></NavLink>
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
          <Row className={styles.welcome}>
            <Col>
              <p >Bienvenido {LoggedData.userName}</p>
            </Col>
            <Col>
              <Navbar.Toggle aria-controls="navbar-dark-example" />
              <Navbar.Collapse id="navbar-dark-example">
                <Nav>
                  <NavDropdown
                    title={<img src={Menu} className={styles.menu} alt=''></img>}
                    menuVariant="light"
                    drop="start"
                  >
                     <NavLink to={`/profile/${LoggedData.id}`} className="dropdown-item"  activeClassName="active">
                      Perfil
                    </NavLink>
                    <NavLink to={'/about'} className="dropdown-item"  activeClassName="active">
                      Quienes somos
                    </NavLink>
                    <NavLink to={'/donations'} className="dropdown-item"  activeClassName="active">
                      Donaciones
                    </NavLink>
                    <NavLink to={'/info'} className="dropdown-item"  activeClassName="active">
                     ¿Como adoptar?
                    </NavLink>
                    {LoggedData.typeUser === "Admin" && 
                    <NavLink to={'/admindashboard'} className="dropdown-item" activeClassName="active">Dashboard</NavLink>
                  }
                    <NavLink to={'/reviews'} className="dropdown-item"  activeClassName="active">
                     Reseñas
                    </NavLink>
                    <NavDropdown.Item onClick={HandleLogOut}>Salir</NavDropdown.Item>
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
