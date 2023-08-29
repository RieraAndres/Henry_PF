import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import styles from "../../Views/Donaciones/Donaciones.module.css"
import { clearAlerts, postDonationAndMercadoPago } from '../../Redux/Actions.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Donaciones () {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userData);
  const alert = useSelector(state=>state.alerts)
  
  useEffect(() => {
    if (alert) {
      toast.success(alert, {
        position: "top-center",
        autoClose: 2000,
        onClose:()=>{
          dispatch(clearAlerts())
        }
      });
    }
  }, [alert , dispatch]);

  const [donationData, setDonationData] = useState({
    nameDonante: user.name +" "+ user.lastName,
    email:user.email,
    numberPhone: user.numberPhone,
    description: "",
    receiver: "Patitas sin Hogar",
    amount: "",
  });
  const [errors, setErrors] = useState({});  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  console.log(user);

  const nameRegex = /^[a-zA-Z\s]+$/;

    const validateForm = () => {
    const { nameDonante, description, receiver, amount } = donationData;
    const newErrors = {};

    if (!nameDonante) {
      newErrors.nameDonante = "El nombre es obligatorio";
    } else if (!nameRegex.test(nameDonante)) {
      newErrors.nameDonante = "El nombre no es válido";
    }

    if (!receiver) {
      newErrors.receiver = "Este dato es obligatorio";
    } else if (!nameRegex.test(receiver)) {
      newErrors.receiver = "El nombre no es válido";
    }

    if (!description || description.length < 10) {
      newErrors.description =
        "Por favor, ingrese una descripción con al menos 10 caracteres";
    }

    if (!amount || amount < 300) {
      newErrors.amount =
        "Por favor, ingrese un monto. 300 es el mínimo";
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);

    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    setIsFormValid(Object.keys(errors).length === 0);
  }, [errors]);

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "nameDonante":
        if (!value) return "El nombre es obligatorio";
        if (!nameRegex.test(value)) return "El nombre no es válido";
        break;
      case "description":
        if (!value || value.length < 10) return "Ingrese una descripción con al menos 10 caracteres";
        break;
      case "receiver":
        if (!value) return "El destinatario es obligatorio";
        if (!nameRegex.test(value)) return "El nombre no es válido";
        break;
      case "amount":
        if (!value) return "El monto es obligatorio";
        break;
      default:
        break;
    }
    return "";
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setDonationData((prevDonationData) => ({ ...prevDonationData, [name]: value }));
    setFormSubmitted(false);

    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formIsValid = validateForm();

    console.log("Datos enviados:", donationData);
    if (formIsValid) {
      dispatch(postDonationAndMercadoPago(donationData));
      toast.success("Formulario enviado exitosamente", {
        position: "top-center",
        autoClose: 2000,
      });

      setDonationData({
        nameDonante: "",
        description: "",
        receiver: "",
        amount: "",
      });
      setErrors({});
      setIsFormValid(false);
      setFormSuccess(true);
    } else {
      setFormSubmitted(true);
      setFormSuccess(false);
    }
  };

  return(
    <div className={styles.fondo}>
        <NavBar/>
        <div className={styles.contenido}>
        <Form className={styles.form}>
        <Form.Group className="mb-3" controlId="formDonation">
          <>
            <Form.Label htmlFor="nameDonante" >Nombre Completo:</Form.Label>
            <Form.Control 
             type="text"
              className={`${styles.input} ${
                  errors.nameDonante ? styles.errorBorder : ""
              } ${errors.nameDonante ? styles.shakeAnimation : ""}`}
              required 
              autoComplete="off"
              placeholder="Nombre Completo"
              name="nameDonante"
              value={donationData.nameDonante}
              onChange={handleChange}
            />
            {errors.nameDonante && <p className={styles.errorText}>{errors.nameDonante}</p>}
          </>
          <div className={styles.userData}>
            <div >
              <label >Número de teléfono: </label>
              <span> {user.numberPhone}</span>
            </div>
            <div className={styles.email}>
              <label>Correo Electrónico: </label>
              <span> {user.email}</span>
           </div>
          </div>
          <>
            <Form.Label htmlFor="receiver" >Destino:</Form.Label>
            <Form.Control 
             type="text"
              className={`${styles.input} ${
                errors.receiver ? styles.errorBorder : ""
              } ${errors.receiver ? styles.shakeAnimation : ""}`}
              required 
              autoComplete="off" 
              placeholder="A quién va dirigida la donación"
              name="receiver"
              value={donationData.receiver}
              onChange={handleChange}
            />
            {errors.receiver && <p className={styles.errorText}>{errors.receiver}</p>}
          </>
          <>
            <Form.Label htmlFor="description">Descripción:</Form.Label>
            <Form.Control 
              type="text" 
              className={`${styles.input} ${
                errors.description ? styles.errorBorder : ""
              } ${errors.description ? styles.shakeAnimation : ""}`}
              placeholder="Descripción"
              required
              autoComplete="off"
              name="description"
              value={donationData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <p className={styles.errorText}>{errors.description}</p>
            )}
          </>
          <>
            <Form.Label htmlFor="amount" >Monto que desea donar:</Form.Label>
            <Form.Control
              type="number"
              className={`${styles.inputAmount} ${
                errors.amount ? styles.errorBorder : ""
              }`}
              placeholder="Ingrese monto"
              required
              autoComplete="off"
              min="300"
              name="amount"
              value={donationData.amount}
              onChange={handleChange}
            />
            {errors.amount && <p className={styles.errorText}>{errors.amount}</p>}
          </>
        </Form.Group>
          <>
          <Button
          className={styles.btn} 
          disabled={formSubmitted && isFormValid}
          onClick={handleSubmit}
          >
            Donar
            </Button>

            {formSubmitted && isFormValid && formSuccess && (
               <p className={styles.successMessage}>
                Formulario enviado con éxito.
                </p>
            )}
          </>       
      </Form>
      {alert && (<ToastContainer />)}

      <Footer/>
    </div>
    </div>
  )
}

export default Donaciones; 