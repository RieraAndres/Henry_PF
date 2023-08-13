import React, {useState} from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setOrden, applyFilters } from '../../Redux/Actions';
import styles from "../filters/Filter.module.css";

const FiltersComponent = ({setCurrentPage , setActivePage}) => {
  const dispatch = useDispatch();
  const { filters, orden } = useSelector((state) => state);

  // Utilizamos useState para controlar el valor seleccionado del dropdown de orden
  const [ordenValue, setOrdenValue] = useState(`${orden.orden_age}-${orden.orden_name}`);

  const handleFilterChange = (filterName, value) => {
    dispatch(setFilter({ ...filters, [filterName]: value }));
  };

  const handleOrdenChange = (value) => {
    // Actualizamos el estado local y el valor seleccionado del dropdown
    setOrdenValue(value);
    // Descomponemos el valor en orden_age y orden_name
    const [orden_age, orden_name] = value.split('-');
    dispatch(setOrden({ orden_age, orden_name }));
  };

  const handleApplyFilters = (event) => {
    event.preventDefault();
    dispatch(applyFilters(filters, ordenValue)); // Utilizamos ordenValue
    setCurrentPage(1);
    setActivePage(1);
  };

  const resetFilter = (event) => {
    event.preventDefault();
    // Restablece los filtros y el orden al estado inicial
    setOrdenValue('');
    dispatch(setFilter({ size: '', gender: '', specie: '' }));
    dispatch(setOrden({ orden_age: '', orden_name: '' }));
    // Aplica los filtros y orden iniciales
    dispatch(applyFilters({ size: '', gender: '', specie: '' }, { orden_age: '', orden_name: '' }));
    setCurrentPage(1);
    setActivePage(1);
  };

  return (
    <Form>
      <Row className={styles.filterButtonRow}>
        <Col className={styles.filtros}>
          <div className={styles.filterButton}>
              <select className={styles.filterButtonInner} value={filters.specie} onChange={(e) => handleFilterChange('specie', e.target.value)}
              >
                <option value="">Especie</option>
                <option value="Perro">Perro</option>
                <option value="Gato">Gato</option>
              </select>
          </div>
        </Col>
        <Col className={styles.filtros}>
          <div className={styles.filterButton}>
              <select className={styles.filterButtonInner} value={filters.size} onChange={(e) => handleFilterChange('size', e.target.value)}
              >
                <option value="">Tamaño</option>
                <option value="Chico">Chico</option>
                <option value="Mediano">Mediano</option>
                <option value="Grande">Grande</option>
              </select>
          </div>
        </Col>
        <Col>
        <div className={styles.filterButton}>
            <select className={styles.filterButtonInner} value={filters.gender} onChange={(e) => handleFilterChange('gender', e.target.value)}>
              <option value="">Género</option>
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
        </div>
        </Col>
        <Col>
        <div className={styles.filterButton}>
        <select
              className={styles.filterButtonInner}
              value={ordenValue} // Utilizamos el valor del estado local
              onChange={(e) => handleOrdenChange(e.target.value)}
            >
              <option value="">Sin orden</option>
              <option value="ASC-ASC">Menor Edad y Ascendente A-Z</option>
              <option value="ASC-DESC">Menor Edad y Descendente Z-A</option>
              <option value="DESC-ASC">Mayor Edad y Ascendente A-Z</option>
              <option value="DESC-DESC">Mayor Edad y Descendente Z-A</option>
            </select>
          </div>
        </Col>
        {/* <Col>
        <div className={styles.filterButton}>
            <select className={styles.filterButtonInner} value={orden.orden_name} onChange={(e) => handleOrdenChange('orden_name', e.target.value)}>
              <option value="">Ordenar por nombre</option>
              <option value="ASC">Ascendente A-Z</option>
              <option value="DESC">Descendente Z-A</option>
            </select>
          </div>
        </Col> */}
        <Row className={styles.filterButtonRow}></Row>
        <Col>
          <button variant='primary' onClick={handleApplyFilters} className={styles.filterButtonFiltrar} >Filtrar</button>
          <button variant='primary' onClick={resetFilter} className={styles.filterButtonFiltrar} >Restablecer</button>
        </Col>
      </Row>
    </Form>
  );
};

export default FiltersComponent;