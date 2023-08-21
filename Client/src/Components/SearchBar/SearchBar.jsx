import styles from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getPets, getPetsByName } from "../../Redux/Actions";

function SearchBar() {
  const dispatch = useDispatch()
  const [searchString, setSearchString] = useState("");
  const [ allPets, setAllPets ] = useState([])


  function handleChange(e) {
    setSearchString(e.target.value);

    if(e.target.value.length  ===0 ){
      dispatch(getPets()).then(()=> setAllPets(allPets));
    }
  }

  function handleSubmit(e) { //handler de submit para buscar por nombre
    e.preventDefault();
    // dispatch(getPetsByName(searchString)); 
    // setSearchString(""); //vacio la searchBar
    if(searchString.length === 0 ){
      dispatch(getPets()).then(()=> setAllPets(allPets));
    }else {
      dispatch(getPetsByName(searchString))
    }
  }

    return (
        <div >
            <form onSubmit={handleSubmit}>
                <input className={styles.textBox} type="search" placeholder="Buscar..."  value={searchString} onChange={handleChange}/>
                <button className={styles.button} type="submit" onClick={handleSubmit}>Buscar</button>
            </form>
            
        </div>
    )
}


export default SearchBar;