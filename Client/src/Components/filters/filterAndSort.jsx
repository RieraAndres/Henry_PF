import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
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

  const handleApplyFilters = (event) => {
    event.preventDefault()
    dispatch(applyFilters(filters, orden));
    setCurrentPage(1)
    setActivePage(1)
  };

  const resetFilter = (event) => {
    event.preventDefault()
    // Restablece los filtros y el orden al estado inicial
    dispatch(setFilter({ specie: '', size: '', gender: '' }));
    dispatch(setOrden({ orden: '' }));
    // Aplica los filtros y orden iniciales
    dispatch(applyFilters({ specie: '', size: '', gender: '' }, { orden: '' }));
    setCurrentPage(1);
    setActivePage(1);
  }

  return (
    <Form>
      <Row className={styles.filterButtonRow}>
        <Col className={styles.filtros}>
          <div className={styles.filterButton}>
              <select className={styles.filterButtonInner} value={filters.specie} onChange={(e) => handleFilterChange('specie', e.target.value)}>
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
            <select className={styles.filterButtonInner} value={orden.orden} onChange={(e) => handleOrdenChange('orden', e.target.value)}>
              <option value="">Ordenar por</option>
              <option value="name-ASC">Ascendente A-Z</option>
              <option value="name-DESC">Descendente Z-A</option>
              <option value="age-ASC">Edad Menor</option>
              <option value="age-DESC">Edad Mayor</option>
            </select>
          </div>
        </Col>
        {/* <Col>
        <div className={styles.filterButton}>
            <select className={styles.filterButtonInner} value={orden.orden_name} onChange={(e) => handleOrdenChange('orden_name', e.target.value)}>
            </select>
          </div>
        </Col> */}
        <Row className={styles.filterButtonRow}></Row>
        <Col>
          <button onClick={handleApplyFilters} className={styles.filterButtonFiltrar} >Filtrar</button>
          <button onClick={resetFilter} className={styles.filterButtonFiltrar} >Restablecer</button>
        </Col>
      </Row>
    </Form>
  );
};

export default FiltersComponent;