import styles from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getPetsByName } from "../../Redux/Actions";

function SearchBar() {
  const dispatch = useDispatch()

  const [searchString, setSearchString] = useState("");

  function handleChange(e) {
    setSearchString(e.target.value);
  }

  function handleSubmit(e) { //handler de submit para buscar por nombre
    e.preventDefault();
    dispatch(getPetsByName(searchString)); 
    setSearchString(""); //vacio la searchBar
  }

    return (
        <div >
            <form onSubmit={handleSubmit}>
                <input className={styles.textBox} type="search" placeholder="Buscar..."  value={searchString} onChange={handleChange}/>
                <button className={styles.button} type="submit" >Buscar</button>
            </form>
            
        </div>
    )
}


export default SearchBar;