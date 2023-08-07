import React, { useState, useEffect } from "react";
import styles from "../../Components/PostPetForm/PostPetForm.module.css";
import { useDispatch } from "react-redux";
import { postPet } from "../../Redux/Actions";

const PostPetForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    numberPhone: "",
    email: "",
    description: "",
    location: "",
    age: "",
    imageUrl: "",
  });

  const [especieOptions] = useState(["Dog", "Cat"]);
  const [generoOptions] = useState(["macho", "hembra"]);
  const [tamañoOptions] = useState(["Grande", "Mediano", "Chico"]);

  const [especieSelect, setEspecieSelect] = useState([]);
  const [generoSelect, setGeneroSelect] = useState([]);
  const [tamañoSelect, setTamañoSelect] = useState([]);

  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isAgeModified, setIsAgeModified] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [isPhotoSelected, setIsPhotoSelected] = useState(false);

  const nameRegex = /^[a-zA-Z\s]+$/;
  const numberPhoneRegex = /^[0-9]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    setIsFormValid(Object.keys(errors).length === 0 && isPhotoSelected);
  }, [errors, isPhotoSelected]);

  const correctAgeIfExceedsMax = () => {
    if (isAgeModified) {
      const age = parseInt(formData.age, 10);
      if (isNaN(age) || age > 20) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          age: "20",
        }));
      }
    }
  };

  const validateForm = () => {
    const { name, numberPhone, email, description } = formData;
    const newErrors = {};

    if (!name) {
      newErrors.name = "El nombre es obligatorio";
    } else if (!nameRegex.test(name)) {
      newErrors.name = "El nombre no es válido";
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

    if (!description || description.length < 10) {
      newErrors.description =
        "Por favor, ingrese una descripción con al menos 10 caracteres";
    }

    // Validación de la imageUrl
    // if (!imageUrl) {
    //   newErrors.imageUrl = "Por favor, agregue una imageUrl.";
    // } else {
    //   // Si hay una imageUrl seleccionada, verificamos su tipo (opcionalmente)
    //   const allowedTypes = ["image/jpeg", "image/png", "image/gif", "text"];
    //   if (!allowedTypes.includes(imageUrl.type)) {
    //     newErrors.imageUrl = "El tipo de archivo debe ser JPEG, PNG o GIF";
    //   }
    // }

    // Validar campos de los selects
    if (especieSelect.length === 0) {
      newErrors.specie = "Por favor, seleccione una especie";
    }

    if (generoSelect.length === 0) {
      newErrors.gender = "Por favor, seleccione un género";
    }

    if (tamañoSelect.length === 0) {
      newErrors.size = "Por favor, seleccione un tamaño";
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);

    return Object.keys(newErrors).length === 0;
  };

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "name":
        if (!value) return "El nombre es obligatorio";
        if (!nameRegex.test(value)) return "El nombre no es válido";
        break;
      case "numberPhone":
        if (!value) return "Por favor, ingrese número de teléfono";
        if (!numberPhoneRegex.test(value))
          return "El teléfono debe ser un número";
        break;
      case "email":
        if (!value) return "Por favor, ingrese un email válido";
        if (!emailRegex.test(value)) return "Ingrese un email válido";
        break;
      case "description":
        if (!value || value.length < 10)
          return "Por favor, ingrese una descripción con al menos 10 caracteres";
        break;
      default:
        break;
    }
    return "";
  };

  const handleEspeciesSelect = (event) => {
    const especie = event.target.value;

    if (especieOptions.includes(especie)) {
      setEspecieSelect([...especieSelect, especie]);
      setFormData((prevFormData) => ({ ...prevFormData, specie: especie }));
    }
  };

  const handleGeneroSelect = (event) => {
    const genero = event.target.value;

    if (generoOptions.includes(genero)) {
      setGeneroSelect([...generoSelect, genero]);
      setFormData((prevFormData) => ({ ...prevFormData, gender: genero }));
    }
  };

  const handleTamañoSelect = (event) => {
    const tamaño = event.target.value;

    if (tamañoOptions.includes(tamaño)) {
      setTamañoSelect([...tamañoSelect, tamaño]);
      setFormData((prevFormData) => ({ ...prevFormData, size: tamaño }));
    }
  };

  //   const blockNonNumericInput = (event) => {
  //     if (event.key === "e" || event.key === "." || event.key === "-") {
  //       event.preventDefault();
  //     }
  //   };

  //   const handleFileChange = (event) => {
  //     const file = event.target.files[0];
  //     setFormData((prevFormData) => ({ ...prevFormData, imageUrl: file }));
  //     setIsPhotoSelected(true);
  //     setErrors((prevErrors) => ({ ...prevErrors, imageUrl: "" }));
  //   };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setFormSubmitted(false);

    if (name === "age") {
      setIsAgeModified(true);
    }

    if (name === "imageUrl") {
      setIsPhotoSelected(true);
    } else {
      setIsPhotoSelected(false);
    }

    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formIsValid = validateForm();
    setIsPhotoSelected(!!formData.imageUrl);

    if (formIsValid) {
      dispatch(postPet(formData));
      alert("Mascota creada exitosamente");

      setFormData({
        name: "",
        numberPhone: "",
        email: "",
        description: "",
        location: "",
        age: "",
        imageUrl: "",
      });
      setEspecieSelect([]);
      setGeneroSelect([]);
      setTamañoSelect([]);
      setErrors({});
      setIsFormValid(false);
      setIsAgeModified(false);
      setIsPhotoSelected(false);
      setFormSuccess(true);
    } else {
      setFormSubmitted(true);
      setFormSuccess(false);
    }
  };

  return (
    <div className={styles.createDog}>
      <div className={styles.container}>
        <div className={styles.createDogContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.sectionInputCG}>
              <label className={styles.label} htmlFor="name">
                Nombre Completo:
              </label>
              <input
                type="text"
                className={`${styles.input} ${
                  errors.name ? styles.errorBorder : ""
                } ${errors.name ? styles.shakeAnimation : ""}`}
                name="name"
                required
                autoComplete="off"
                placeholder="Nombre completo"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className={styles.errorText}>{errors.name}</p>}
            </div>

            <div className="platformList">
              <label className="label">Especies *</label>
              <select
                className="selectOptions"
                name="specie"
                onChange={handleEspeciesSelect}
                required
              >
                <option className="optionsAllCGD" value="">
                  Seleccione
                </option>
                {especieOptions.map((especie, i) => (
                  <option className="optionsCG" key={i} value={especie}>
                    {especie}
                  </option>
                ))}
              </select>
            </div>

            <div className="genresList">
              <div className="sectionInputCG">
                <label className="label">Géneros *</label>
                <select
                  className="selectOptions"
                  name="gender"
                  onChange={handleGeneroSelect}
                  required
                >
                  <option className="optionsAllCGD" value="">
                    Seleccione
                  </option>
                  {generoOptions.map((genero, i) => (
                    <option className="optionsCG" key={i} value={genero}>
                      {genero}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Edad */}
            <div className={styles.sectionInputCG}>
              <label className={styles.label} htmlFor="age">
                Edad:
              </label>
              <input
                type="number"
                className={`${styles.input} ${
                  errors.age ? styles.errorBorder : ""
                }`}
                name="age"
                required
                autoComplete="off"
                placeholder="Edad mascota"
                value={formData.age}
                onChange={handleChange}
                min="0"
                max="20"
                // onKeyDown={blockNonNumericInput}
                // onKeyPress={blockNonNumericInput}
                onBlur={correctAgeIfExceedsMax}
              />
              {errors.age && <p className={styles.errorText}>{errors.age}</p>}
            </div>

            <div className="platformList">
              <div className="sectionInputCG">
                <label className="label">Tamaño *</label>
                <select
                  className="selectOptions"
                  name="size"
                  onChange={handleTamañoSelect}
                  required
                >
                  <option className="optionsAllCGD" value="">
                    Seleccione
                  </option>
                  {tamañoOptions.map((tamaño, i) => (
                    <option className="optionsCG" key={i} value={tamaño}>
                      {tamaño}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.sectionInputCG}>
              <label className={styles.label} htmlFor="name">
                Foto:
              </label>
              <input
                type="text"
                className={styles.input}
                name="imageUrl"
                required
                accept="image/*" // Limitar a la selección de archivos de imagen
                placeholder="Foto de la mascota"
                onChange={handleChange}
              />
              {errors.imageUrl && (
                <p className={styles.errorText}>{errors.imageUrl}</p>
              )}
            </div>

            <div className={styles.sectionInputCG}>
              <label className={styles.label} htmlFor="email">
                Email:
              </label>
              <input
                type="email"
                className={`${styles.input} ${
                  errors.email ? styles.errorBorder : ""
                } ${errors.email ? styles.shakeAnimation : ""}`}
                name="email"
                required
                autoComplete="off"
                placeholder="Ingrese un email válido"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className={styles.errorText}>{errors.email}</p>
              )}
            </div>

            <div className={styles.sectionInputCG}>
              <label className={styles.label} htmlFor="numberPhone">
                Teléfono:
              </label>
              <input
                type="text"
                className={`${styles.input} ${
                  errors.numberPhone ? styles.errorBorder : ""
                } ${errors.numberPhone ? styles.shakeAnimation : ""}`}
                name="numberPhone"
                required
                autoComplete="off"
                placeholder="Teléfono"
                value={formData.numberPhone}
                onChange={handleChange}
              />
              {errors.numberPhone && (
                <p className={styles.errorText}>{errors.numberPhone}</p>
              )}
            </div>

            <div className={styles.sectionInputCG}>
              <label className={styles.label} htmlFor="description">
                Descripción:
              </label>
              <textarea
                name="description"
                id="descriptionCG"
                rows="4"
                style={{
                  resize: "none",
                  minHeight: "80px",
                  maxHeight: "200px",
                }}
                className={`${styles.input} ${
                  errors.description ? styles.errorBorder : ""
                } ${errors.description ? styles.shakeAnimation : ""}`}
                minLength="10"
                maxLength="300"
                required
                autoComplete="off"
                placeholder="Cuéntanos sobre la mascota"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
              {errors.description && (
                <p className={styles.errorText}>{errors.description}</p>
              )}
            </div>

            {/* Ubicación */}
            <div className={styles.sectionInputCG}>
              <label className={styles.label} htmlFor="location">
                Ubicación:
              </label>
              <input
                type="text"
                className={`${styles.input} ${
                  errors.location ? styles.errorBorder : ""
                }`}
                name="location"
                required
                autoComplete="off"
                placeholder="Ubicación"
                value={formData.location} // Proporcionar el valor desde el estado
                onChange={handleChange}
              />
              {errors.location && (
                <p className={styles.errorText}>{errors.location}</p>
              )}
            </div>

            {/* Botón submit */}
            <button
              type="submit"
              className={`${styles.createBtn} ${
                formSubmitted && !isFormValid ? styles.disabled : ""
              }`}
              disabled={formSubmitted && !isFormValid}
            >
              Enviar formulario
            </button>
            {formSubmitted && !isFormValid && formSuccess && (
              <p className={styles.successMessage}>
                Formulario enviado con éxito.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostPetForm;
