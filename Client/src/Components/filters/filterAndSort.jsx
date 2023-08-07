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

  return (
    <Form>
      <Row>
        {/* <Col>
          <Form.Control
            type="text"
            value={filters.name}
            onChange={(e) => handleFilterChange('name', e.target.value)}
            placeholder="Nombre"
          />
        </Col> */}
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
            <option value="ASC">Ascendente</option>
            <option value="DESC">Descendente</option>
          </Form.Control>
        </Col>
        <Col>
          <Form.Control
            as="select"
            value={orden.orden_name}
            onChange={(e) => handleOrdenChange('orden_name', e.target.value)}
          >
            <option value="">Ordenar por nombre</option>
            <option value="ASC">Ascendente</option>
            <option value="DESC">Descendente</option>
          </Form.Control>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="primary" onClick={handleApplyFilters}>Filtrar</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FiltersComponent;


