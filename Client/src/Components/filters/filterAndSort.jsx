import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setOrden, applyFilters } from '../../Redux/Actions';
import styles from "../filters/Filter.module.css";

const FiltersComponent = ({ setCurrentPage, setActivePage }) => {
  const dispatch = useDispatch();
  const { filters, orden } = useSelector((state) => state);

  const [filterValues, setFilterValues] = useState({
    specie: '',
    size: '',
    gender: '',
  });

  const [orderValue, setOrderValue] = useState('');

  const handleFilterChange = (filterName, value) => {
    setFilterValues((prevValues) => ({ ...prevValues, [filterName]: value }));
  };

  const handleOrdenChange = (value) => {
    setOrderValue(value);
  };

  const handleApplyFilters = (event) => {
    event.preventDefault();
    dispatch(setFilter(filterValues));
    dispatch(setOrden({ orden: orderValue }));
    dispatch(applyFilters(filterValues, { orden: orderValue }));
    setCurrentPage(1);
  };

  const resetFilter = (event) => {
    event.preventDefault();
    setFilterValues({
      specie: '',
      size: '',
      gender: '',
    });
    setOrderValue('');
    dispatch(setFilter({ specie: '', size: '', gender: '' }));
    dispatch(setOrden({ orden: '' }));
    dispatch(applyFilters({ specie: '', size: '', gender: '' }, { orden: '' }));
    setActivePage(1);
    setCurrentPage(1);
  }

  return (
    <Form>
      <Row className={styles.filterButtonRow}>
        <Col className={styles.filtros}>
          <div className={styles.filterButton}>
            <select
              className={styles.filterButtonInner}
              value={filterValues.specie}
              onChange={(e) => handleFilterChange('specie', e.target.value)}
            >
              <option value="">Especie</option>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
            </select>
          </div>
        </Col>
        <Col className={styles.filtros}>
          <div className={styles.filterButton}>
            <select
              className={styles.filterButtonInner}
              value={filterValues.size}
              onChange={(e) => handleFilterChange('size', e.target.value)}
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
            <select
              className={styles.filterButtonInner}
              value={filterValues.gender}
              onChange={(e) => handleFilterChange('gender', e.target.value)}
            >
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
              value={orderValue}
              onChange={(e) => handleOrdenChange(e.target.value)}
            >
              <option value="">Ordenar por</option>
              <option value="name-ASC">Ascendente A-Z</option>
              <option value="name-DESC">Descendente Z-A</option>
              <option value="age-ASC">Edad Menor</option>
              <option value="age-DESC">Edad Mayor</option>
            </select>
          </div>
        </Col>
        <Row className={styles.filterButtonRow}></Row>
        <Col>
          <button onClick={handleApplyFilters} className={styles.filterButtonFiltrar}>Filtrar</button>
          <button onClick={resetFilter} className={styles.filterButtonFiltrar}>Restablecer</button>
        </Col>
      </Row>
    </Form>
  );
};

export default FiltersComponent;