import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import CardsComponents from "../../Components/Cards/cards";
import Footer from "../../Components/Footer/Footer";
import styles from "../Home/Home.module.css";
import FiltersComponent from "../../Components/filters/filterAndSort";
import { useDispatch, useSelector } from "react-redux";
import { getPets } from "../../Redux/Actions";

function Home() {
  const dispatch = useDispatch();
  const allPets = useSelector((state) => state.allPets);

  useEffect(() => {
    dispatch(getPets());
  }, [dispatch]);

  const cardsPerPage = 9;
  const [activePage, setActivePage] = useState(1)
  const [currentPage, setCurrentPage] = useState(1);

  const petsCopy = allPets.filter((pet) => pet.status === true);

  const filters = useSelector((state) => state.filters); // Get filters from Redux state
  const orden = useSelector((state) => state.orden); // Get orden from Redux state

  const filteredPets = petsCopy.filter((pet) => {
    // Apply filters to the pets
    if (
      (!filters.specie || pet.specie === filters.specie) &&
      (!filters.size || pet.size === filters.size) &&
      (!filters.gender || pet.gender === filters.gender)
    ) {
      return true;
    }
    return false;
  });

  // Apply ordering to the filtered pets
  const orderedPets = filteredPets.sort((a, b) => {
    if (orden.orden === "name-ASC") {
      return a.name.localeCompare(b.name);
    } else if (orden.orden === "name-DESC") {
      return b.name.localeCompare(a.name);
    } else if (orden.orden === "age-ASC") {
      return a.age - b.age;
    } else if (orden.orden === "age-DESC") {
      return b.age - a.age;
    }
    return 0;
  });

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = orderedPets.slice(indexOfFirstCard, indexOfLastCard);

  const pageNumbers = Math.ceil(orderedPets.length / cardsPerPage);
  const pagesArray = Array.from({ length: pageNumbers }, (_, index) => index + 1);
  const hasNextPage = currentPage < pageNumbers;
  const hasPrevPage = currentPage > 1;

  function paginate(pageNumber) {
    setCurrentPage(pageNumber);
    setActivePage(pageNumber);
  }

  return (
    <div className={styles.fondo}>
      <NavBar />
      <div style={{ paddingTop: "90px" }}>
        <FiltersComponent setCurrentPage={setCurrentPage} setActivePage={setActivePage}/>
        <CardsComponents mascotas={currentCards} />
        <div className={styles.pagination}>
          {hasPrevPage && <button onClick={() => paginate(currentPage - 1)} className={styles.pageButton}>Prev</button>}
          {pagesArray.map((number) => (
            <button key={number} onClick={() => paginate(number)} className={activePage  === number ? styles.activePageButton : styles.PageButton}>{number}</button>
            // className={activePage  === number ? styles.activePageButton : styles.PageButton}>{number}</button>
          ))}
          {hasNextPage && <button onClick={() => paginate(currentPage + 1)} className={styles.pageButton}>Next</button>}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;