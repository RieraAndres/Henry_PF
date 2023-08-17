import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import PostPetForm from "../../Components/PostPetForm/PostPetForm";
import styles from "./DarAdopt.module.css";
import Footer from "../../Components/Footer/Footer";

function DarAdopt() {
  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.content}>
        <PostPetForm />
        <Footer/>
      </div>
    </div>
  );
}

export default DarAdopt;