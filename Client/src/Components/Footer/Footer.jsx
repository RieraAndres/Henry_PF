import React from 'react';
import styles from './Footer.module.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';

const Footer = () => {
  return (
    <Navbar className={styles.footerContainer}>
      <Container className={styles.container} >
        <Navbar.Brand href="/inicio">
          <Image
            className={styles.imagen}
            src="https://media.discordapp.net/attachments/1133816321407205511/1135650208680788111/logo_PF_4_1.png?width=467&height=467"
            rounded
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className={`${styles.letras} flex-column`}>
              <Nav.Link href="/inicio">INICIO</Nav.Link>
              <Nav.Link href="/info">¿Cómo adopto?</Nav.Link>
              <Nav.Link href="/donations">Dona</Nav.Link>
              <Nav.Link href="/profile">Perfil</Nav.Link>
            </Nav>
        </Navbar.Collapse>
      </Container>
      <Nav className={`${styles.centrado}`}><p className={`${styles.p} ms-auto me-auto`}>Copyright © 2023 PATITAS-SIN-HOGAR. Todos los derechos reservados.</p></Nav>
    </Navbar>
  );
};

export default Footer;