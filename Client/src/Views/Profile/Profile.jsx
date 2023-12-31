import React, { useState,useEffect } from 'react';
import styles from '../Profile/ProfileUser.module.css';
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import { NavLink } from "react-router-dom"
import { useSelector,useDispatch } from 'react-redux';
import { clearAlerts, createUserPassword, updateUser } from '../../Redux/Actions';
import { validate } from './formValidator';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProfileUser(){

    const [isEditing, setIsEditing] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const [cloudinaryImage, setCloudinaryImage] = useState("");
    const [isPhotoSelected, setIsPhotoSelected] = useState(false);

    const alert = useSelector(state=>state.alerts)
    
    useEffect(() => {
      if (alert) {
        toast.info(alert, {
          position: "top-center",
          autoClose: 2000,
          onClose:()=>{
            dispatch(clearAlerts())
          }
        });
      }
    }, [alert]);

    const [errors, setErrors] = useState({
      name:"",
      createdEmail:"",
      userNewPasswordToDispatch:"",
      userNewPassword:"",
      createdPassword:"",
      createdPasswordToDispatch:"",
      userName:"",
    });

    const user = useSelector((state) => state.userData);
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
      image: user.image,
      name: user.name || "",
      lastName: user.lastName || "",
      birthdate: user.birthdate || "01/01/1905",
      address: user.address || "",
      email: user.email || "",
      userName: user.userName || "",
      numberPhone: user.numberPhone || "",
      userActualPassword: user.userActualPassword || "",
      userNewPasswordToDispatch: user.userNewPasswordToDispatch || "",
      userNewPassword: user.userNewPassword || "",
      DBpassword: user.password || "",
      idFacebook: user.idFacebook || "",
      createdPassword: user.createdPassword || "",
      createdPasswordToDispatch: user.createdPasswordToDispatch || "",
      createdEmail: user.createdEmail || ""
    });

  const handleImageUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "profile");
  
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dtovejlec/image/upload",
        formData
      );
  
      const image = response.data.secure_url;
      setUserData((prevUserData) => ({
        ...prevUserData,
        image: image,
      }));
    } catch (error) {
      console.error("Error al cargar la imagen a Cloudinary:", error);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        await handleImageUpload(file); // Llamar a la función para cargar la imagen a Cloudinary
        setIsPhotoSelected(true);
        setCloudinaryImage(file.name);
      } catch (error) {
        console.error("Error al cargar la imagen:", error);
      }
    } else {
      setIsPhotoSelected(false);
      setCloudinaryImage("");
    }
  };
    
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
    if (['createdEmail', 'userNewPasswordToDispatch', 'userNewPassword', 'createdPassword', 'createdPasswordToDispatch', 'userName'].includes(name)) {
      setErrors(validate({ ...userData, [name]: value }))  
      }
  };

  const handleShowClick = () => {
    setIsEditing(true);
  };
  
  const handleHideClick = () => {
    setIsEditing(false);
  };
  
  const handleUpdateClick = () => {
    setIsEditing(false);
    if(userData.DBpassword && userData.userActualPassword && userData.userNewPassword){
      if(userData.userNewPassword !== userData.userNewPasswordToDispatch){
        toast.error("Las contraseñas no coinciden", {
          position: "top-center",
          autoClose: 3000, // Tiempo en milisegundos para cerrar automáticamente la notificación
        });
      }else{
        setIsEditing(true)
        dispatch(updateUser( user.email,userData.name,userData.lastName,userData.userName,userData.birthdate,userData.address,userData.numberPhone,userData.image,user.password,userData.userActualPassword,userData.userNewPassword))
        const updatedUserData = {
          ...userData,
          userNewPassword: "",  // Setear a cadena vacía
          userNewPasswordToDispatch: "",  // Setear a cadena vacía
          userActualPassword: ""  // Setear a cadena vacía
      };
      setUserData(updatedUserData)
      }
    }else {
      dispatch(updateUser( user.email,userData.name,userData.lastName,userData.userName,userData.birthdate,userData.address,userData.numberPhone, userData.image))
    }
  };
  const handleShowEditPassword = ()=>{
    if(editPassword){
      setEditPassword(false)
    }else if(!editPassword){
      setEditPassword(true)
    }
  }
  const handleCreatePassword = (e)=>{
    if(userData.createdPassword !== userData.createdPasswordToDispatch){
      toast.error("Las contraseñas no coinciden", {
        position: "top-center",
        autoClose: 2000, // Tiempo en milisegundos para cerrar automáticamente la notificación
      });
    } else if(!userData.email){
      dispatch(createUserPassword(userData.idFacebook,"",userData.createdPasswordToDispatch,userData.createdEmail))
      
    }else if(!userData.idFacebook){
      dispatch(createUserPassword("",userData.email,userData.createdPasswordToDispatch))
    }
    }  
  return (
    <div>
    <NavBar className={styles.Nav}/>
    <div className={styles.BigCont}>
    <div className={styles.container}>
      <div className={styles.DivFoto}>
        <img src={userData.image} alt="Foto de perfil" />
      </div>
      <div className={styles.DivInput}>
      <div>
      {isEditing ? (
  <>
    <label>Foto de perfil:</label>
    <br />
    {/* Aplica el estilo personalizado al botón */}
    <label className={styles.button2}>
      &#8679; {/* Símbolo de carga */}
      Seleccionar archivo
      <input
        type="file"
        accept="image/*"
        name="image"
        onChange={handleImageChange}
      />
    </label>
    {/* Muestra el nombre del archivo seleccionado */}
    {isPhotoSelected && <p className={styles.file}>{cloudinaryImage}</p>}
  </>
): (
            <></>
          )}
      </div>
        <div >
          <label>Nombre:</label>
          {isEditing ? (
           <> <input type="text" name="name" value={userData.name} onChange={handleInputChange} /> <br /> </>
          ) : ( 
            <span> {userData.name }</span>
          )}
        </div> 
        <div >
          <label>Apellido:</label>
          {isEditing ? (
           <> <input type="text" name="lastName" value={userData.lastName} onChange={handleInputChange} /> <br /> </>
          ) : (
            <span> {userData.lastName}</span>
          )}
        </div>
        <div >
          <label>Fecha Nac.: </label>
          {isEditing ? (
           <> <input type="date" name="birthdate" min="1905-01-01" max="2023-01-01"  value={userData.birthdate} onChange={handleInputChange} /> <br /> </>
          ) : (
            <span> {userData.birthdate}</span>
          )}
        </div> 
        <div >
          <label>Dirección: </label>
          {isEditing ? (
          <> <input type="text" name="address" value={userData.address} onChange={handleInputChange} /> <br /> </>
          ) : (
            <span> {userData.address}</span>
          )}
        </div> 
        <div >
          <label>Correo Electrónico: </label>
          <span> {user.email}</span>
        </div> 
        <div >
          <label>Usuario: </label>
          {isEditing ? (
          <> 
          <input type="text" name="userName" value={userData.userName} onChange={handleInputChange} /> <br /> 
          <p className={styles.error}>{errors.userName}</p>
          </>
          ) : (
            <span> {userData.userName}</span>
          )}
        </div> 
        <div >
          <label>Teléfono: </label>
          {isEditing ? (
          <> <input type="number" name="numberPhone" value={userData.numberPhone} onChange={handleInputChange} /> <br /> </>
          ) : (
            <span> {userData.numberPhone}</span>
          )}
        </div> 
        <div>
  {!user.password && !user.email && (
    <div>
      <p>Por favor completa los datos para habilitar el editado de Perfil</p>
      <label>Correo electronico: </label>
      <input
        type="email"
        name="createdEmail"
        value={userData.createdEmail}
        onChange={handleInputChange}
      />
      <p className={styles.error}>{errors.createdEmail}</p>
      <label>Contraseña Nueva: </label>
      <input
        type="password"
        name="createdPassword"
        value={userData.createdPassword}
        onChange={handleInputChange}
      />
      <p className={styles.error}>{errors.createdPassword}</p>
      <label>Repita Contraseña Nueva: </label>
      <input
        type="password"
        name="createdPasswordToDispatch"
        value={userData.createdPasswordToDispatch}
        onChange={handleInputChange}
      />
      {userData.createdPassword !== userData.createdPasswordToDispatch &&
      <p style={{color:"red"}}>Las contraseñas no coinciden</p>}
      <button className={styles.button2} onClick={handleCreatePassword}>
        Crear Contraseña
      </button>
    </div>
  )}

  {!user.password && user.email && (
    <div>
      <p>Por favor crea tu Contraseña para habilitar el editado de Perfil</p>
      <label>Contraseña Nueva: </label>
      <input
        type="password"
        name="createdPassword"
        value={userData.createdPassword}
        onChange={handleInputChange}
      />
      <label>Repita Contraseña Nueva: </label>
      <input
        type="password"
        name="createdPasswordToDispatch"
        value={userData.createdPasswordToDispatch}
        onChange={handleInputChange}
      />
      
      <button className={styles.button2} onClick={handleCreatePassword}>
        Crear Contraseña
      </button>
    </div>
  )}
</div>
        <div>
          {editPassword && isEditing ? (
              <div>
                <label >Contraseña Actual: </label>
                <input type="password" name="userActualPassword" value={userData.userActualPassword} onChange={handleInputChange}></input>
                <label>Contraseña Nueva: </label>
                <input type="password" name='userNewPassword' value={userData.userNewPassword} onChange={handleInputChange}></input>
                <p className={styles.error}>{errors.userNewPassword}</p>
                <label>Repita Contraseña Nueva: </label>
                <input type="password" name='userNewPasswordToDispatch' value={userData.userNewPasswordToDispatch} onChange={handleInputChange}></input>
                <p className={styles.error}>{errors.userNewPasswordToDispatch}</p>
              </div>
          ):(
            <p></p>
          )}
        </div>
        <div>
          {isEditing && editPassword && <button onClick={handleShowEditPassword} className={styles.button2}>Atras</button>}
          {isEditing && !editPassword &&  <button onClick={handleShowEditPassword} className={styles.button2}>Editar Contraseña</button>}
        </div>
        </div>
        {isEditing ? (
          <div>
            {userData.userNewPassword !== userData.userNewPasswordToDispatch && <p style={{color: "red"}}>Las contraseñas no coinciden</p>}
            <button className={styles.BotonActualizar} onClick={handleHideClick}>Regresar</button>
            {!errors.createdEmail &&
             !errors.userNewPasswordToDispatch &&
              !errors.userNewPassword &&
               !errors.createdPassword &&
               !errors.createdPasswordToDispatch &&
               !errors.userName &&
               userData.name &&
               userData.lastName &&
                <button className={styles.BotonActualizar} onClick={handleUpdateClick}>Actualizar Datos</button>}
            {/* const [errors, setErrors] = useState({
      createdEmail:"",
      userNewPasswordToDispatch:"",
      userNewPassword:"",
      createdPassword:"",
      createdPasswordToDispatch:"",
      userName:""
    }); */}
          </div>
        ) : (
          <div>
           {user.password && <button className={styles.boton} onClick={handleShowClick}>Editar</button>}
            <NavLink to={`/profile/${user.id}/mispublicaciones`} style={{ color: 'blue', fontWeight: 'bold' }}>
            <button className={styles.botonMisPublicaciones}>Mis Publicaciones</button>
          </NavLink>
          </div>   
        )}
      <div>
        </div>
      </div>
      {alert && (<ToastContainer />)}
      <Footer className={styles.Footer}/>
      </div>
      </div>
  );
};

export default ProfileUser;