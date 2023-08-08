import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setOrden, applyFilters } from '../../Redux/Actions';
import styles from "../filters/Filter.module.css";

const FiltersComponent = ({setCurrentPage , setActivePage}) => {
  const dispatch = useDispatch();
  const { filters, orden } = useSelector((state) => state);

  const handleFilterChange = (filterName, value) => {
    dispatch(setFilter({ ...filters, [filterName]: value }));
  };

  const handleOrdenChange = (ordenName, value) => {
    dispatch(setOrden({ ...orden, [ordenName]: value }));
  };

  const handleApplyFilters = () => {
    dispatch(applyFilters(filters, orden));
    setCurrentPage(1)
    setActivePage(1)
  };

  const resetFilter = () => {
    // Restablece los filtros y el orden al estado inicial
    dispatch(setFilter({ size: '', gender: '' }));
    dispatch(setOrden({ orden_age: '', orden_name: '' }));
    // Aplica los filtros y orden iniciales
    dispatch(applyFilters({ size: '', gender: '' }, { orden_age: '', orden_name: '' }));
    setCurrentPage(1);
    setActivePage(1);
  }

  return (
    <Form>
      <Row>
      <Col className={styles.filtros}>
          <Form.Control
            as="select"
            value={filters.size}
            onChange={(e) => handleFilterChange('size', e.target.value)}
          >
            <option value="">Tamaño</option>
            <option value="Chico">Chico</option>
            <option value="Mediano">Mediano</option>
            <option value="Grande">Grande</option>
          </Form.Control>
        </Col>
        <Col className={styles.filtros}>
          <Form.Control
            as="select"
            value={filters.gender}
            onChange={(e) => handleFilterChange('gender', e.target.value)}
          >
            <option value="">Género</option>
            <option value="macho">Macho</option>
            <option value="hembra">Hembra</option>
          </Form.Control>
        </Col>
        <Col>
          <Form.Control
            as="select"
            value={orden.orden_age}
            onChange={(e) => handleOrdenChange('orden_age', e.target.value)}
          >
            <option value="">Ordenar por edad</option>
            <option value="ASC">Menor Edad</option>
            <option value="DESC">Mayor Edad</option>
          </Form.Control>
        </Col>
        <Col>
          <Form.Control
            as="select"
            value={orden.orden_name}
            onChange={(e) => handleOrdenChange('orden_name', e.target.value)}
          >
            <option value="">Ordenar por nombre</option>
            <option value="ASC">Ascendente A-Z</option>
            <option value="DESC">Descendente Z-A</option>
          </Form.Control>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="primary" onClick={handleApplyFilters}>Filtrar</Button>
          <Button variant="primary" onClick={resetFilter}>Restablecer</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FiltersComponent;


