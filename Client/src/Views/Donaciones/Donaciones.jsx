import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import styles from "../../Views/Donaciones/Donaciones.module.css"
import { postDonationAndMercadoPago } from '../../Redux/Actions.js';

function Donaciones () {
  const dispatch = useDispatch();

  const [donationData, setDonationData] = useState({
    nameDonante: "",
    numberPhone: "",
    email: "",
    description: "",
    receiver: "",
    amount: "",
  });

  const [errors, setErrors] = useState({});  
  const [donationAmount, setDonationAmount] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const nameRegex = /^[a-zA-Z\s]+$/;
  const numberPhoneRegex = /^[0-9]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateForm = () => {
    const { nameDonante, numberPhone, email, description, receiver, amount } = donationData;
    const newErrors = {};

    if (!nameDonante) {
      newErrors.nameDonante = "El nombre es obligatorio";
    } else if (!nameRegex.test(nameDonante)) {
      newErrors.nameDonante = "El nombre no es válido";
    }

    if (!numberPhone) {
      newErrors.numberPhone = "Por favor, ingrese número de teléfono";
    } else if (!numberPhoneRegex.test(numberPhone)) {
      newErrors.numberPhone = "El teléfono debe ser un número";
    }

    if (!email) {
      newErrors.email = "Por favor, ingrese un email válido";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Ingrese un email válido";
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
      case "numberPhone":
        if (!value) return "Por favor, ingrese número de teléfono";
        if (!numberPhoneRegex.test(value)) return "El teléfono debe ser un número";
        break;
      case "email":
        if (!value) return "Por favor, ingrese un email válido";
        if (!emailRegex.test(value)) return "Ingrese un email válido";
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

  // Función para manejar el cambio en el input de monto personalizado
  const handleAmountChange = (event) => {
    const newValue = parseInt(event.target.value);
    setDonationAmount(newValue || '');
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
      alert("Formulario enviado exitosamente");

      setDonationData({
        nameDonante: "",
        numberPhone: "",
        email: "",
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
      <div className={styles.nav}>
        <NavBar/>
      </div>
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
          <>
            <Form.Label htmlFor="numberPhone" >Teléfono:</Form.Label>
            <Form.Control 
             type="text" 
             className={`${styles.input} ${
                 errors.numberPhone ? styles.errorBorder : ""
              } ${errors.numberPhone ? styles.shakeAnimation : ""}`}
              placeholder="Teléfono de contacto"
              required
              autoComplete="off"
              name="numberPhone"
              value={donationData.numberPhone}
             onChange={handleChange}
            />
            {errors.numberPhone && (
              <p className={styles.errorText}>{errors.numberPhone}</p>
            )}
          </>
          <>
            <Form.Label htmlFor="email" >Email:</Form.Label>
            <Form.Control 
              type="text"
              className={`${styles.input} ${
                  errors.email ? styles.errorBorder : ""
              } ${errors.email ? styles.shakeAnimation : ""}`}
              placeholder="Email"
              required
              autoComplete="off"
              name="email"
              value={donationData.email}
              onChange={handleChange}
            />
            {errors.email && <p className={styles.errorText}>{errors.email}</p>}
          </>
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
              min={300}
              name="amount"
              value={donationData.amount}
              onChange={handleChange}
            />
            {errors.amount && <p className={styles.errorText}>{errors.amount}</p>}
          </>
        </Form.Group>
          <>
            <Button 
              variant="primary" 
              type="submit"
              className={`${styles.boton} ${
                formSubmitted && !isFormValid ? styles.disabled : ""
              }`}
              disabled={formSubmitted && !isFormValid}
              onClick={handleSubmit}
              >
               Donar
            </Button>
            {formSubmitted && !isFormValid && formSuccess && (
              <p className={styles.successMessage}>
                Formulario enviado con éxito.
              </p>
            )}
          </>       
      </Form>
      <Footer/>
    </div>
  )
}
export default Donaciones;