import React from "react";
import LoginForm from "../../Components/LoginForm/LoginForm";
import styles from "./Login.module.css";

function Login() {
  return (
    <div className={styles.loginContainer}>
      <LoginForm />
    </div>
  );
}

export default Login;