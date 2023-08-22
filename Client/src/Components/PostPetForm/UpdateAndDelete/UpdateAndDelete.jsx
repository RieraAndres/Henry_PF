import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { updatePet } from "../../../Redux/Actions";
import styles from '../../../Components/PostPetForm/PostPetForm.module.css';
import miniPerroImage from "../AssetsForm/miniGato.jpg";
import miniGatoImage from "../AssetsForm/miniGato.jpg";
import axios from 'axios';

const UpdatePetForm = ({ petData }) => {
    const { id } = useParams();
  const navigate = useNavigate(); // Obtenemos el objeto history
  const dispatch = useDispatch();
  
  const user = useSelector((state) => state.userData);

  const [formData, setFormData] = useState({
    name: petData.name || '',
    numberPhone: user.numberPhone || '',
    email: user.email || '',
    description: petData.description || '',
    location: petData.location || '',
    age: petData.age || '',
    imageUrl: petData.imageUrl || '',
    specie: petData.specie || '',
    gender: petData.gender || '',
    size: petData.size || '',
  });

  // const [nameChange, setNameChange] = useState(petData.name);
  const [especieSelect, setEspecieSelect] = useState(petData.specie || '');
  const [generoSelect, setGeneroSelect] = useState(petData.gender || '');
  const [tamañoSelect, setTamañoSelect] = useState(petData.size || '');
  const [isAgeModified, setIsAgeModified] = useState(false);
  const [isLocationValid, setIsLocationValid] = useState(true);
  const [isPhotoChange, setIsPhotoChange] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  // const [formSuccess, setFormSuccess] = useState(false);

  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Estado para controlar si la mascota está deshabilitada
  const [isDisabled, setIsDisabled] = useState(false);

  const nameRegex = /^[a-zA-Z\s]+$/;
  const numberPhoneRegex = /^[0-9]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const googleMapsUrlRegex = /^(https:\/\/goo\.gl\/maps\/|https:\/\/www\.google\.com\/maps\/place\/)([-a-zA-Z0-9_]+)\/?(@([-0-9.]+),([-0-9.]+),(\d+)z)?/;

  // Definimos el estado para las opciones y sus valores por defecto
  const [options, setOptions] = useState({
    especieOptions: ["Perro", "Gato"],
    generoOptions: ["Macho", "Hembra"],
    tamañoOptions: ["Grande", "Mediano", "Chico"],
  });

  

  useEffect(() => {
    // console.log(petData.status)
    if (!petData.status) {
    //   console.log("Esto es dentro de  petData.status:",setIsDisabled);
      setIsDisabled(true);
    }

    // Actualiza las opciones seleccionadas con los valores de petData
  setEspecieSelect(petData.specie || ''); // Opción por defecto
  setGeneroSelect(petData.gender || ''); // Opción por defecto
  setTamañoSelect(petData.size || '');   // Opción por defecto

  // Autocompletar campos de "email" y "numberPhone"
  setFormData((prevFormData) => ({
    ...prevFormData,
    email: user.email || prevFormData.email,
    numberPhone: user.numberPhone || prevFormData.numberPhone,
  }));
}, [petData.status, petData.specie, petData.gender, petData.size, user.email, user.numberPhone]);


useEffect(() => {
  const isFormValid =
    Object.keys(errors).length === 0 &&
    formData.name &&
    formData.numberPhone &&
    formData.email &&
    formData.description &&
    formData.location &&
    formData.specie &&
    formData.gender &&
    formData.size;

  setIsFormValid(isFormValid);
}, [errors, formData]);

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

    if (!especieSelect) {
      newErrors.specie = "Por favor, seleccione una especie";
    }

    if (!generoSelect) {
      newErrors.gender = "Por favor, seleccione un género";
    }

    if (!tamañoSelect) {
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

    if (especie) {
      setEspecieSelect(especie);
      setFormData((prevFormData) => ({ ...prevFormData, specie: especie }));
    }
  };

  const handleGeneroSelect = (event) => {
    const genero = event.target.value;

    if (genero) {
      setGeneroSelect(genero);
      setFormData((prevFormData) => ({ ...prevFormData, gender: genero }));
    }
  };

  const handleTamañoSelect = (event) => {
    const tamaño = event.target.value;

    if (tamaño) {
      setTamañoSelect(tamaño);
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

  const handleCloudImage = async (file) => {
    try{
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'patitas');

      const response = await axios.post("https://api.cloudinary.com/v1_1/dtovejlec/image/upload", formData);

      const imageUrl = response.data.secure_url;
      setFormData((prevFormData) => ({
        ...prevFormData,
        imageUrl,
      }));
    } catch(error){
      console.error('Error al cargar la imagen a CLoudinary', error);
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
      if(file){
        try{
          await handleCloudImage(file);
          setIsPhotoChange(true);
          setSelectedFileName(file.name);
        } catch(error){
          console.error('Error al cargar la imagen', error);
        }
      }else{
        setIsPhotoChange(false);
        setSelectedFileName('');
      }
    } else {
      setIsPhotoChange(false);
    }

    if (name === "location") {
      validateLocation(value);
    }

    

    // if (name === "name") {
    //   setNameChange(value); // Actualiza el estado nameChange
    // }

    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
  
    console.log("handleUpdate antes: ",isDisabled);
  if (isDisabled) {
    alert("Esta mascota está deshabilitada y no puede ser actualizada.");
    return;
  }

  let formIsValid = validateForm();

  if (formIsValid) {
    const updatedFields = {
      name: formData.name,
      numberPhone: formData.numberPhone,
      email: formData.email,
      description: formData.description,
      location: formData.location,
      age: formData.age,
      imageUrl: formData.imageUrl,
      specie: formData.specie,
      gender: formData.gender,
      size: formData.size,
    };

    try {
      dispatch(updatePet(petData.id, updatedFields));
      setFormSubmitted(true);
      console.log("Pet updated successfully"); // Add this line
      alert("Mascota actualizada exitosamente");
    } catch (error) {
      console.log("Error updating pet:", error); // Add this line
    } finally {
      // Rest of your code
    }
  } else {
    // setFormSuccess(false);
  }
};

// const handleDisable = async () => {
//   try {
//     await dispatch(disablePet(petData.id));
//     setIsDisabled(true);
//     console.log("Pet disabled successfully");
//     alert("Mascota desactivada exitosamente");
//     // Puedes realizar cualquier lógica adicional aquí después de cambiar el estado
//   } catch (error) {
//     console.log("Error disabling pet:", error);
//   }
// };

const handleCancel = () => {
  // Regresar a la página de detalles
  navigate(`/profile/${id}/mispublicaciones`);
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
    paddingRight: "2px",
    borderRadius: "15px",
    backgroundColor: "#ffffff",
    height: "45px",
    width: "92px",
    border: "none",
    padding: "10px",
    appearance: "none",
  }
  
  const submitButtonText = formSubmitted && !isFormValid ? "Verificando..." : "Actualizar Mascota";
  return (
    <div className={styles.createDog}>
      <div className={styles.createDogContainer}>
        <form className={styles.form} onSubmit={handleUpdate}>
          <div className={styles.sectionInputCG}>
            <label className={styles.label} htmlFor="name"></label>
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
                <label className="label"></label>
                <div className={styles.customSelect}></div>
                <select
                  name="especie"
                  id="especie"
                  value={formData.specie}
                  onChange={handleEspeciesSelect}
                  style={selectStyle}
                >
                  <option value="">Especie</option>
                  {options.especieOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div
                className={`${styles.sectionInputCG} ${styles.fieldContainer}`}
              >
                <label className="label"></label>
                <select
                  className={styles.selectOptions}
                  name="gender"
                  onChange={handleGeneroSelect}
                  required
                >
                  <option className={styles.optionsAllCGD} value="">
                    Género
                  </option>
                  {options.generoOptions.map((optione) => (
                    <option key={optione} value={optione}>
                      {optione}
                    </option>
                  ))}
                </select>
                <div className={styles.petImages}></div>
              </div>

              <div
                className={`${styles.sectionInputCG} ${styles.fieldContainer}`}
              >
                <label className="label"></label>
                <select
                  className={`${styles.selectOptions} ${styles.sizeList}`}
                  name="size"
                  onChange={handleTamañoSelect}
                  required
                >
                  <option className={styles.optionsAllCGD} value="">
                    Tamaño
                  </option>
                  {options.tamañoOptions.map((options) => (
                    <option key={options} value={options}>
                      {options}
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
            <label className={styles.label} htmlFor="email"></label>
            <input
              type="email"
              className={`${styles.input} ${
                errors.email ? styles.errorBorder : ""
              } ${errors.email ? styles.shakeAnimation : ""}`}
              name="email"
              required
              autoComplete="off"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className={styles.errorText}>{errors.email}</p>}
          </div>

          <div className={styles.sectionInputCG}>
            <label className={styles.label} htmlFor="numberPhone"></label>
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
            <label className={styles.label} htmlFor="location"></label>
            <input
              type="text"
              className={`${styles.input} ${
                !isLocationValid ? styles.errorBorder : ""
              } ${!isLocationValid ? styles.shakeAnimation : ""}`}
              name="location"
              autoComplete="off"
              placeholder="Ubicación (Google Maps URL)"
              value={formData.location}
              onChange={handleLocationChange}
            />
            {errors.location && !isLocationValid && (
              <p className={styles.errorText}>{errors.location}</p>
            )}
          </div>

          <div className={styles.sectionInputCG}>
            <label className={styles.label} htmlFor="description"></label>
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
              placeholder="Descripción"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <p className={styles.errorText}>{errors.description}</p>
            )}
          </div>
              
          {/* <button
  className={`${styles.createBtn} ${
    formSubmitted && !isFormValid ? styles.disabled : ""
  }`}
  type="submit"
  disabled={formSubmitted && !isFormValid}
>
{formSubmitted && !isFormValid ? "Verificando..." : "Actualizar Mascota"
   }
</button>

{/* Agrega el botón de desactivar 
<button onClick={handleDisable} className={styles.disableBtn}>
        Desactivar Mascota
      </button> */}
<div className={styles.containerButton}>
<button
  className={`${styles.createBtn} ${
    formSubmitted && !isFormValid ? styles.disabled : ""
  }`}
  type="submit"
  disabled={formSubmitted && !isFormValid}
>
  {submitButtonText}
</button>

{/* <button onClick={handleDisable} className={styles.createBtn}>
  Desactivar Mascota
</button> */}
<button onClick={handleCancel} className={styles.createBtn}>
  Cancelar
</button>
</div>
        </form>
      </div>
      <div className={styles.CardPreview}>
        <div id="card">
          <div className={styles.imgCard}>
          <div className={styles.prewEdad}>{formData.age}</div>
          {formData.imageUrl && (
              <img className={styles.img} src={formData.imageUrl} alt="Mascota"/>
            )}
          </div>
          <div className={styles.cardInfo}>
            <section className={styles.cardClose}>
              <section className={styles.flexContainer}>
                <div className={`${styles.sectionInputCG} ${styles.fieldContainer} ${styles.colorWhite}`}>{formData.specie}</div>
                <div className={`${styles.sectionInputCG} ${styles.fieldContainer} ${styles.colorWhite}`}>{formData.gender}</div>
                <div className={`${styles.sectionInputCG} ${styles.fieldContainer} ${styles.colorWhite}`}>{formData.size}</div>
              </section>
              <p className={styles.name}>
                  {formData.name}
              </p>
              <div>{formData.numberPhone}</div>
              <div>{formData.email}</div>
              <div className={styles.decript}>{formData.description}</div>
              <div className={styles.prewUbi}>{formData.location}</div>

            </section>
          </div>
            {/* <h2>Vista Previa en Tiempo Real</h2> */}
          </div>
        </div>
    </div>
  );
};

export default UpdatePetForm;