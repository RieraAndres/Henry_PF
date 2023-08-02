import styles from "./SearchBar.module.css";

function SearchBar() {
    return (
        <div >
            <input className={styles.textBox} type="search" placeholder="Buscar Patitas..." />
            <button className={styles.button} type="submit" >Buscar</button>
        </div>
    )
}


export default SearchBar;