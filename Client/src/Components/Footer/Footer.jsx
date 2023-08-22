import React from 'react';
import styles from './Footer.module.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from "../../Assets/Logo/logo_PF_full.png"

const Footer = () => {
  const LoggedUser = useSelector(state=>state.userData)
  return (
    <Navbar className={styles.footerContainer}>
      <div className={styles.contenido}>
      <div className={styles.imgContainer}>
        <Navbar.Brand >
          <Image
            className={styles.imagen}
            src={Logo}
            rounded
          />
        </Navbar.Brand>
      </div> 
      <div className={styles.link}>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className={`${styles.letras} flex-column`}>
              <NavLink to={"/inicio"} style={{color:"black", textDecoration:"none"}}>INICIO</NavLink>
              <NavLink to={"/info"} style={{color:"black", textDecoration:"none"}}>¿Cómo adopto?</NavLink>
              <NavLink to={"/donations"} style={{color:"black", textDecoration:"none"}}>Dona</NavLink>
              <NavLink to={`/profile/${LoggedUser.id}`} style={{color:"black", textDecoration:"none"}}>Perfil</NavLink>
              <NavLink to={"/about"} style={{color:"black", textDecoration:"none"}}>Quienes somos</NavLink>
              <NavLink to={"/reviews"} style={{color:"black", textDecoration:"none"}}>Reseñas</NavLink>

            </Nav>
        </Navbar.Collapse>
      </div>
      </div>
    
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
       
      <Nav className={`${styles.centrado}`}><p className={`${styles.p} ms-auto me-auto`}>Copyright © 2023 PATITAS-SIN-HOGAR. Todos los derechos reservados.</p></Nav>
    </Navbar>
  );
};

export default Footer;