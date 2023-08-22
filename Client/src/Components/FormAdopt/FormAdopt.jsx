import React, { useState, useEffect } from "react";
import styles from "../FormAdopt/FormAdopt.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { submitAdoptionRequest } from '../../Redux/Actions';

const FormAdopt = ({petId}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userData);
  
  const [formData, setFormData] = useState({
    nameUser: "",
    numberPhone: user.numberPhone || '',
    email: user.email || '',
    addressAdoption:"",
    birthdate: "",
    comment: "",
  });

  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const nameUserRegex = /^[a-zA-Z\s]+$/;
  const numberPhoneRegex = /^[0-9]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    setIsFormValid(Object.keys(errors).length === 0);
  }, [errors]);

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    // Actualizar el valor de birthdate en el estado del formulario
    if (day && month && year) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        birthdate: `${year}-${month.toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`,
      }));
    }
  }, [day, month, year]);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const years = Array.from(
    { length: new Date().getFullYear() - 1904 },
    (_, i) => i + 1905
  );
  // Función para calcular la edad
  const calcularEdad = (birthdate) => {
    const birthdateDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthdateDate.getFullYear();
    const monthDiff = today.getMonth() - birthdateDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthdateDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // Función para validar la fecha de nacimiento
  const validarbirthdate = (birthdate) => {
    if (!birthdate) {
      return "Por favor, ingrese una fecha de nacimiento";
    }

    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!fechaRegex.test(birthdate)) {
      return "El formato de fecha no es válido";
    }

    const age = calcularEdad(birthdate);
    if (age < 21) {
      return "Debe tener al menos 21 años para adoptar";
    }

    // if (age >= 100) {
    //   return "La edad máxima permitida es de 99 años";
    // }

    return "";
  };

  const validateForm = () => {
    const { nameUser, numberPhone, email, comment, birthdate } = formData;

    const newErrors = {};

    if (!nameUser) {
      newErrors.nameUser = "El nombre es obligatorio";
    } else if (!nameUserRegex.test(nameUser)) {
      newErrors.nameUser = "El nombre no es válido";
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

    // Validar fecha de nacimiento
    const birthdateError = validarbirthdate(birthdate);
    if (birthdateError) {
      newErrors.birthdate = birthdateError;
    }

    if (!comment || comment.length < 10) {
      newErrors.comment =
        "Por favor, ingrese una descripción con al menos 10 caracteres";
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);

    // Devolvemos la validez del formulario actual
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { nameUser, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [nameUser]: value }));
    setFormSubmitted(false); // Añade esta línea para habilitar el botón nuevamente al cambiar un campo

    // Validar campo de fecha al cambiar su valor
    if (nameUser === "birthdate") {
      const errorMessage = validarbirthdate(value);
      setErrors((prevErrors) => ({ ...prevErrors, [nameUser]: errorMessage }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isFormValid = validateForm();

  if (isFormValid) {
    dispatch(
      submitAdoptionRequest({
        nameUser: formData.nameUser,
        numberPhone: formData.numberPhone,
        email: formData.email,
        addressAdoption: formData.addressAdoption,
        birthdate: formData.birthdate,
        comment: formData.comment,
      },
      petId
      )
    );

    setFormSubmitted(true);
  }
  };

  return (
    <div classnameUser={styles.createDog}>
      <div classnameUser={styles.container}>
        <div classnameUser={styles.createDogContainer}>
          <form classnameUser={styles.form} onSubmit={handleSubmit}>
            {/* nameUser */}
            <div classnameUser={styles.sectionInputCG}>
              <label classnameUser={styles.label} htmlFor="nameUser">
                {/* Nombre Completo: */}
              </label>
              <input
                type="text"
                classnameUser={styles.input}
                nameUser="nameUser"
                required
                autoComplete="off"
                placeholder="Nombre completo"
                value={formData.nameUser}
                onChange={handleChange}
              />
              {errors.nameUser && (
                <p classnameUser={styles.errorText}>{errors.nameUser}</p>
              )}
            </div>

            {/* numberPhone */}
            <div classnameUser={styles.sectionInputCG}>
              <label classnameUser={styles.label} htmlFor="numberPhone">
                {/* Teléfono: */}
              </label>
              <input
                type="text"
                classnameUser={styles.input}
                nameUser="numberPhone"
                required
                autoComplete="off"
                placeholder="Teléfono"
                value={formData.numberPhone}
                onChange={handleChange}
              />
              {errors.numberPhone && (
                <p classnameUser={styles.errorText}>{errors.numberPhone}</p>
              )}
            </div>

            {/* Email */}
            <div classnameUser={styles.sectionInputCG}>
              <label classnameUser={styles.label} htmlFor="email">
                {/* Email: */}
              </label>
              <input
                type="email"
                classnameUser={styles.input}
                nameUser="email"
                required
                autoComplete="off"
                placeholder="Ingrese un email válido"
                value={formData.email}
                onChange={handleChange}
                // disabled
              />
              <div>
                {errors.email && (
                  <span classnameUser={styles.errorText}>{errors.email}</span>
                )}
              </div>
            </div>
            <div classnameUser={styles.sectionInputCG}>
              <label classnameUser={styles.label} htmlFor="addressAdoption">
                Ubicación:
              </label>
              <input
                type="text"
                classnameUser={`${styles.input} ${
                  errors.location ? styles.errorBorder : ""
                }`}
                nameUser="addressAdoption"
                required
                autoComplete="off"
                placeholder="Ubicación"
                value={formData.location} // Proporcionar el valor desde el estado
                onChange={handleChange}
              />
              {errors.location && (
                <p classnameUser={styles.errorText}>{errors.location}</p>
              )}
            </div>

            {/* Fecha de Nacimiento */}
            <div classnameUser={styles.sectionInputCG}>
              <label classnameUser={styles.label} htmlFor="birthdate">
                Fecha de Nacimiento:
              </label>
              <div classnameUser={styles.customDateInput}>
                <div>
                  <label></label>
                  <select
                    classnameUser={styles.formGroup}
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                  >
                    {days.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>

                  <label></label>
                  <select
                    classnameUser={styles.formGroup}
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                  >
                    {months.map((m, i) => (
                      <option key={m} value={i + 1}>
                        {m}
                      </option>
                    ))}
                  </select>

                  <label></label>
                  <select
                    classnameUser={styles.formGroup}
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  >
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.birthdate && (
                  <p classnameUser={styles.errorText}>{errors.birthdate}</p>
                )}
              </div>
            </div>

            {/* comment */}
            <div classnameUser={styles.sectionInputCG}>
              <label classnameUser={styles.label} htmlFor="comment">
                Razones para adoptar:
              </label>
              <textarea
                nameUser="comment"
                id="commentCG"
                rows="4"
                style={{ resize: "none" }} // Bloquear el estiramiento del textarea
                minLength="10"
                maxLength="300"
                required
                autoComplete="off"
                placeholder="¿Por qué quieres adoptar?"
                value={formData.comment}
                onChange={handleChange}
              ></textarea>
              {errors.comment && (
                <p classnameUser={styles.errorText}>{errors.comment}</p>
              )}
            </div>

            {/* Botón submit */}
            <button
              type="submit"
              classnameUser={`${styles.createBtn} ${
                formSubmitted && !isFormValid ? styles.disabled : ""
              }`}
              disabled={formSubmitted && !isFormValid}
            >
              Enviar formulario
            </button>

            {/* Mostrar un mensaje de éxito después de enviar el formulario */}
            {formSubmitted && <p>Formulario enviado con éxito.</p>}
          </form>
        </div>
      </div>
      <div class="arrowRight"></div>
    </div>
  );
};

export default FormAdopt;