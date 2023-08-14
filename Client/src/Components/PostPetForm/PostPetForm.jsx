import React, { useState, useEffect } from "react";
import styles from "../../Components/PostPetForm/PostPetForm.module.css";
import { useDispatch } from "react-redux";
import { postPet } from "../../Redux/Actions";
import miniPerroImage from "./AssetsForm/miniPerro.jpg";
import miniGatoImage from "./AssetsForm/miniGato.jpg";
// import { Image } from "cloudinary-react"; // Importar el componente Image de cloudinary-react
import axios from "axios"; // Importar axios para realizar la solicitud HTTP

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
    // cloudinaryImageUrl: "", // Nuevo campo para almacenar la URL de la imagen en Cloudinary
  });

  const [especieOptions] = useState(["Perro", "Gato"]);
  const [generoOptions] = useState(["Macho", "Hembra"]);
  const [tamañoOptions] = useState(["Grande", "Mediano", "Chico"]);
  const [selectedFileName, setSelectedFileName] = useState("");

  const [especieSelect, setEspecieSelect] = useState([]);
  const [generoSelect, setGeneroSelect] = useState([]);
  const [tamañoSelect, setTamañoSelect] = useState([]);

  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isAgeModified, setIsAgeModified] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [isPhotoSelected, setIsPhotoSelected] = useState(false);
  const [isLocationValid, setIsLocationValid] = useState(true);

  const nameRegex = /^[a-zA-Z\s]+$/;
  const numberPhoneRegex = /^[0-9]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const googleMapsUrlRegex = /^(https:\/\/goo\.gl\/maps\/|https:\/\/www\.google\.com\/maps\/place\/)([-a-zA-Z0-9_]+)\/?(@([-0-9.]+),([-0-9.]+),(\d+)z)?/;


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

  const isValidGoogleMapsUrl = (url) => {
    return googleMapsUrlRegex.test(url);
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

    if (especieSelect.length === 0) {
      newErrors.specie = "Por favor, seleccione una especie";
    }

    if (generoSelect.length === 0) {
      newErrors.gender = "Por favor, seleccione un género";
    }

    if (tamañoSelect.length === 0) {
      newErrors.size = "Por favor, seleccione un tamaño";
    }

    if (!isValidGoogleMapsUrl(formData.location)) {
      newErrors.location = "Por favor, ingrese una ubicación válida de Google Maps";
      setIsLocationValid(false);
    } else {
      setIsLocationValid(true);
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);

    return Object.keys(newErrors).length === 0;
  };

  const validateLocation = (locationValue) => {
    if (!locationValue) {
      setIsLocationValid(true);
    } else if (googleMapsUrlRegex.test(locationValue)) {
      setIsLocationValid(true);
    } else {
      setIsLocationValid(false);
    }
  };

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "name":
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
      case "location":
        if (!value) return "La ubicación es obligatoria";
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

    if (especie === "") {
      setFormData({ ...formData, specie: "" });
    } else {
      setFormData({ ...formData, specie: especie });
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

  const handleLocationChange = (event) => {
    const locationValue = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      location: locationValue
    }));

    if (locationValue.trim() !== "") {
      validateLocation(locationValue);
    } else {
      setIsLocationValid(true);
    }
  };

  const handleImageUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "patitas"); // Usar el nombre de tu upload preset
  
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dtovejlec/image/upload", // Reemplazar "tu_cloud_name" con tu Cloud Name de Cloudinary
        formData
      );
  
      const imageUrl = response.data.secure_url;
      setFormData((prevFormData) => ({
        ...prevFormData,
        imageUrl, // Actualizar la URL de la imagen en Cloudinary en el estado
      }));
    } catch (error) {
      console.error("Error al cargar la imagen a Cloudinary:", error);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setFormSubmitted(false);

    if (name === "age") {
      setIsAgeModified(true);
    }

    if (name === "imageUrl") {
      const file = e.target.files[0];
      if (file) {
        try {
          await handleImageUpload(file); // Llamar a la función para cargar la imagen a Cloudinary
          setIsPhotoSelected(true);
          setSelectedFileName(file.name);
        } catch (error) {
          console.error("Error al cargar la imagen:", error);
        }
      } else {
        setIsPhotoSelected(false);
        setSelectedFileName("");
      }
    } else {
      setIsPhotoSelected(false);
    }

    if (name === "location") {
      validateLocation(value);
    }

    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formIsValid = validateForm();
    setIsPhotoSelected(!!formData.imageUrl);

    console.log("Datos enviados:", formData);
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


  const selectStyle = {
    backgroundImage:
      formData.specie === "Perro"
        ? `url(${miniPerroImage})`
        : formData.specie === "Gato"
        ? `url(${miniGatoImage})`
        : "none",
    backgroundSize: "45px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right center",
    paddingRight: "2px", // Ajusta este valor para controlar el espacio entre el texto y la imagen
    borderRadius: "15px",
    backgroundColor: "#ffffff",
    // width: "12vh",
    height: "45px",
    width: "92px",
    border: "none",
    padding: "10px",
    appearance: "none",
  };


  return (
    <div className={styles.createDog}>
      <div className={styles.createDogContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.sectionInputCG}>
            <label className={styles.label} htmlFor="name">
              {/* Nombre Completo: */}
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
  
          <div className={styles.container}>
            <div className={styles.flexContainer}>
              <div
                className={`${styles.sectionInputCG} ${styles.fieldContainer}`}
              >
                <label className="label">{/*Especie*/}</label>
                <div className={styles.customSelect}></div>
                <select
                  name="especie"
                  id="especie"
                  value={formData.specie}
                  onChange={handleEspeciesSelect}
                  style={selectStyle}
                >
                  <option value="">Especie</option>
                  <option value="Perro">Perro</option>
                  <option value="Gato">Gato</option>
                </select>
              </div>
  
              <div
                className={`${styles.sectionInputCG} ${styles.fieldContainer}`}
              >
                <label className="label">{/*Género*/}</label>
                <select
                  className={styles.selectOptions}
                  name="gender"
                  onChange={handleGeneroSelect}
                  required
                >
                  <option className={styles.optionsAllCGD} value="">
                    Género
                  </option>
                  {generoOptions.map((genero, i) => (
                    <option className="optionsCG" key={i} value={genero}>
                      {genero}
                    </option>
                  ))}
                </select>
                <div className={styles.petImages}></div>
              </div>
  
              <div
                className={`${styles.sectionInputCG} ${styles.fieldContainer}`}
              >
                <label className="label">{/*Tamaño*/}</label>
                <select
                  className={`${styles.selectOptions} ${styles.sizeList}`}
                  name="size"
                  onChange={handleTamañoSelect}
                  required
                >
                  <option className={styles.optionsAllCGD} value="">
                    Tamaño
                  </option>
                  {tamañoOptions.map((tamaño, i) => (
                    <option className="optionsCG" key={i} value={tamaño}>
                      {tamaño}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
  
          <div>
            <div className={`${styles.sectionInputCG} ${styles.whiteBorder}`}>
              <label className={styles.label} htmlFor="file">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.iborrainputfile}
                  width="20"
                  height="17"
                  viewBox="0 0 20 17"
                >
                  <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path>
                </svg>
                <span className={`${styles.iborrainputfile} ${styles.fileName}`}>
                  {selectedFileName || "Seleccione una foto"}
                </span>
              </label>
              <input
                type="file"

                className={styles.inputFoto2}

                name="imageUrl"
                id="file"
                required
                accept="image/*"
                placeholder="Foto de la mascota"
                onChange={handleChange}
              />
              
              {errors.imageUrl && (
                <p className={styles.errorText}>{errors.imageUrl}</p>
              )}
            </div>
  
            <div className={styles.sectionInputEdad}>
              <label className={styles.label} htmlFor="age"></label>
              <input
                type="number"
                className={`${styles.inputEdad} ${
                  errors.age ? styles.errorBorder : ""
                }`}
                name="age"
                required
                autoComplete="off"
                placeholder="Edad"
                value={formData.age}
                onChange={handleChange}
                min="0"
                max="20"
                onBlur={correctAgeIfExceedsMax}
              />
              {errors.age && <p className={styles.errorText}>{errors.age}</p>}
            </div>
          </div>
  
          <div className={styles.sectionInputCG}>
            <label className={styles.label} htmlFor="email">
              {/* Email: */}
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
            {errors.email && <p className={styles.errorText}>{errors.email}</p>}
          </div>
  
          <div className={styles.sectionInputCG}>
            <label className={styles.label} htmlFor="numberPhone">
              {/* Teléfono: */}
            </label>
            <input
              type="text"
              className={`${styles.input} ${
                errors.numberPhone ? styles.errorBorder : ""
              } ${errors.numberPhone ? styles.shakeAnimation : ""}`}
              name="numberPhone"
              required
              autoComplete="off"
              placeholder="Número de teléfono"
              value={formData.numberPhone}
              onChange={handleChange}
            />
            {errors.numberPhone && (
              <p className={styles.errorText}>{errors.numberPhone}</p>
            )}
          </div>
  
          <div className={styles.sectionInputCG}>
            <label className={styles.label} htmlFor="description">
              {/* Descripción: */}
            </label>
            <textarea
              name="description"
              id="descriptionCG"
              rows="4"
              style={{
                resize: "none",
                minHeight: "80px",
                maxHeight: "200px",
                padding: "10px",
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
  
          <div className={styles.sectionInputCG}>
            <label className={styles.label} htmlFor="location">
              {/* Ubicación: */}
            </label>
            <input
              type="text"
              className={`${styles.input} ${
                !isLocationValid ? styles.errorBorder : ""
              } ${!isLocationValid ? styles.shakeAnimation : ""}`}
              name="location"
              required
              autoComplete="off"
              placeholder="Ubicación"
              value={formData.location}
              onChange={handleLocationChange}
            />
            {/* Mensaje de error si la ubicación no es válida */}
            {(!isLocationValid || (errors.location && !isLocationValid)) && (
  <p className={styles.errorText}>
    {errors.location || "La ubicación no es válida"}
  </p>
        )}

          </div>
  
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
  );
};

export default PostPetForm;
