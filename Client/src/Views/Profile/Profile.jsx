import React, { useState } from 'react';
import styles from '../Profile/ProfileUser.module.css';
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useSelector } from 'react-redux';
function ProfileUser(){

    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const user = useSelector((state) => state.userData);
    console.log(user);

  const [userData, setUserData] = useState({
    name: user.name,
    lastName: user.lastName,
    birthdate: user.birthdate,
    address: user.address,
    email: user.email,
    userName: user.userName,
    password: user.password,
    numberPhone: user.password,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateClick = () => {
    setIsEditing(false);
    // Aquí puedes realizar una llamada a una API para actualizar los datos del usuario
    // por ejemplo: api.updateUserProfile(userData);
  };

  return (
    <div className={styles.BigCont}>
    <NavBar className={styles.Nav}/>
    <div className={styles.container}>
      { <img src={userData.photo} alt="Foto de perfil" />}
      <div >
        <div className={styles.nombre}>
          <label>Nombre:</label>
          {isEditing ? (
           <> <input type="text" name="name" value={userData.name} onChange={handleInputChange} /> <br /> </>
          ) : ( 
            <span>{userData.name}</span>
          )}
        </div> 
        <div className={styles.apellido}>
          <label>Apellido: </label>
          {isEditing ? (
           <> <input type="text" name="lastName" value={userData.lastName} onChange={handleInputChange} /> <br /> </>
          ) : (
            <span>{userData.lastName}</span>
          )}
        </div>
        <div className={styles.nacimiento}>
          <label>Fecha Nac.: </label>
          {isEditing ? (
           <> <input type="text" name="birthdate" value={userData.birthdate} onChange={handleInputChange} /> <br /> </>
          ) : (
            <span>{userData.birthdate}</span>
          )}
        </div> 
        <div className={styles.dire}>
          <label>Dirección: </label>
          {isEditing ? (
          <> <input type="text" name="address" value={userData.address} onChange={handleInputChange} /> <br /> </>
          ) : (
            <span>{userData.address}</span>
          )}
        </div> 
        <div className={styles.correo}>
          <label>Correo Electrónico: </label>
          {isEditing ? (
          <> <input type="email" name="email" value={userData.email} onChange={handleInputChange} /> <br /> </>
          ) : (
            <span>{userData.email}</span>
          )}
        </div> 
        <div className={styles.usuario}>
          <label>Usuario: </label>
          {isEditing ? (
          <> <input type="text" name="userName" value={userData.userName} onChange={handleInputChange} /> <br /> </>
          ) : (
            <span>{userData.userName}</span>
          )}
        </div> 
        <div className={styles.tel}>
          <label>Teléfono: </label>
          {isEditing ? (
          <> <input type="text" name="numberPhone" value={userData.numberPhone} onChange={handleInputChange} /> <br /> </>
          ) : (
            <span>{userData.numberPhone}</span>
          )}
        </div> 
        <div className={styles.contraseña}>
          <label> Contraseña: </label>
          {isEditing ? (
            <div>
              <input 
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={userData.password}
                onChange={handleInputChange}
              />
              <button onClick={handleTogglePassword} className={styles.btn}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          ) : (
            <span> ******</span>
          )}
        </div>
      </div>
      {isEditing ? (
        <button  className={styles.actualizar} onClick={handleUpdateClick}>Actualizar Datos</button>
      ) : (
        <button className={styles.boton} onClick={handleEditClick}>Editar</button>
      )}
    </div>
    <Footer className={styles.Footer}/>
    </div>
  );
};


export default ProfileUser;