import axios from "axios";

export const GET_PETS = "GET_PETS";
export const GET_PET_DETAIL = "GET_PET_DETAIL";
export const GET_PET_BY_NAME = "GET_PET_BY_NAME";
export const POST_PET_SUCCESS = "POST_PET_SUCCESS";
export const POST_PET_FAILURE = "POST_PET_FAILURE";
export const CLEAR_AUX_STATE = "CLEAR_AUX_STATE";
export const SET_ORDEN = "SET_ORDEN";
export const SET_FILTER = "SET_FILTER";
export const APPLY_FILTERS_SUCCESS = "APPLY_FILTERS_SUCCESS";
export const APPLY_FILTERS_FAILURE = "APPLY_FILTERS_FAILURE";
export const UPDATE_PET = "UPDATE_PET";
export const UPDATE_PET_STATUS = "UPDATE_PET_STATUS";
export const DISABLE_PET_SUCCESS = "DISABLE_PET_SUCCESS";
export const DISABLE_PET_FAILURE = "DISABLE_PET_FAILURE";
export const POST_DONATION = "POST_DONATION";
export const POST_DONATION_SUCCESS = "POST_DONATION_SUCCESS";
export const POST_DONATION_FAILURE = "POST_DONATION_FAILURE";
export const POST_USER_SUCCESS = "POST_USER_SUCCES";
export const POST_USER_FAILURE = "POST_USER_FAILURE";
export const GET_USER_DATA = "GET_USER_DATA";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";
export const LOGIN_USER_GOOGLE = "LOGIN_USER_GOOGLE";
export const USER_LOGOUT = "USER_LOGOUT";
export const USER_UPDATE = "USER_UPDATE";
export const CREATE_USER_PASSWORD = "CREATE_USER_PASSWORD";
export const GET_MY_PETS = "GET_MY_PETS";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const DELETE_USER = "DELETE_USER";
export const CLEAR_ALERTS_STATE = "CLEAR_ALERTS_STATE";
export const GET_ALL_REVIEWS = "GET_ALL_REVIEWS";
export const CHANGE_USER_TYPE = "CHANGE_USER_TYPE";
export const GET_ALL_USER_DATA = "GET_ALL_USER_DATA";
export const DELETE_PET_DB = "DELETE_PET_DB";
export const GET_ALL_DONATIONS = "GET_ALL_DONATIONS";
export const GET_REVIEWS = "GET_REVIEWS";
export const CREATE_REVIEW = "CREATE_REVIEW";
export const GET_USER_REVIEWS = "GET_USER_REVIEWS";
export const USER_UPDATE_FAILURE = "USER_UPDATE_FAILURE";

export function getPets() {
  return async function (dispatch) {
    try {
      const response = await axios(`/mascotas`); //traigo todas las mascotas
      return dispatch({
        type: "GET_PETS",
        payload: response.data,
      });
    } catch (error) {
      return error.message;
    }
  };
}

export function getPetDetail(id) {
  //para traer por id y renderizar los datos en detail
  return async function (dispatch) {
    try {
      const response = await axios.get(`/mascotas/${id}`);
      return dispatch({
        type: "GET_PET_DETAIL",
        payload: response.data,
      });
    } catch (error) {
      return error.message;
    }
  };
}

export function getPetsByName(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/mascotas?name=${name}`);
      return dispatch({
        type: "GET_PET_BY_NAME",
        payload: response.data,
      });
    } catch (error) {
      return error.message;
    }
  };
}

// Create(Alexis)
export function postPet(formData) {
  return async function (dispatch) {
    try {
      await axios.post("/mascotas", formData);
      dispatch({
        type: POST_PET_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: POST_PET_FAILURE,
        payload: error.message,
      });
    }
  };
}
export const setFilter = (filterData) => {
  return {
    type: SET_FILTER,
    payload: filterData,
  };
};

export const setOrden = (ordenData) => {
  return {
    type: SET_ORDEN,
    payload: ordenData,
  };
};
export const applyFilters = (filters, orden) => {
  return async function (dispatch) {
    try {
      const queryString = `specie=${filters.specie}&size=${filters.size}&gender=${filters.gender}&orden=${orden.orden}`;
      const response = await axios.get(`/mascotas/filter?${queryString}`, {
        ...filters,
        ...orden,
      });

      // Luego de recibir los datos filtrados y ordenados del servidor, actualiza el estado de Redux con estos datos.
      dispatch({
        type: APPLY_FILTERS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: APPLY_FILTERS_FAILURE,
        payload: error.message,
      });
    }
  };
};

export function updatePet(id, updatedFields) {
  return async function (dispatch) {
    try {
      await axios.put(`/mascotas/${id}`, updatedFields);
      console.log("Pet updated successfully"); // Add this line
      // Puedes realizar cualquier lógica adicional aquí después de la actualización
    } catch (error) {
      console.log("Error updating pet:", error); // Add this line
      throw error;
    }
  };
}

// export function disablePet(id) {
//   return async function (dispatch) {
//     try {
//       await axios.put(`/mascotas/disable/${id}`);
//       dispatch(disablePetSuccess(id)); // Pasar el id como argumento

//       // Cambiar el estado de status a false en el Redux Store
//       dispatch(updatePetStatus(id, false));
//     } catch (error) {
//       dispatch(disablePetFailure(error)); // Despachar fallo
//       throw error;
//     }
//   };
// }

export function postUser(user) {
  return async function (dispatch) {
    try {
      const response = await axios.post("/usuario/userLog", user);

      // Si el servidor devuelve un código de estado 201 (creado), muestra el mensaje de éxito
      if (response.status === 201) {
        dispatch({
          type: POST_USER_SUCCESS,
          alert: response.data.message, //para setear userCreated en true y redireccionar a la view login
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        dispatch({
          type: POST_USER_FAILURE,
          alert: error.response.data.error, // para setear userCreated en false y mantenerme en la view de registro
        });
      } else {
        window.alert(error.message);
      }
    }
  };
}

export function disablePetSuccess(id) {
  return {
    type: DISABLE_PET_SUCCESS,
    payload: {
      id,
    },
  };
}

export function disablePetFailure(error) {
  return {
    type: DISABLE_PET_FAILURE,
    payload: error,
  };
}

// Actualiza el estado de una mascota para habilitarla o deshabilitarla
export function updatePetStatus(id, status) {
  return async function (dispatch) {
    try {
      // Realiza la petición para cambiar el estado de la mascota en el servidor
      await axios.put(`/mascotas/status/${id}`, {
        newStatus: status,
      });

      // Despacha la acción para actualizar el estado de Redux con el nuevo estado de la mascota
      dispatch({
        type: UPDATE_PET_STATUS,
        payload: {
          id,
          status,
        },
      });

      // Puedes realizar cualquier lógica adicional aquí después de cambiar el estado
    } catch (error) {
      console.error("Error al cambiar el estado de la mascota:", error);
      throw error;
    }
  };
}

//LOGIN LOCAL
export const loginUserSuccess = (userData) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: userData,
  };
};

export function logInUser(userName, password) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`/loginAuth/login`, {
        userName,
        password,
      });

      if (response.status === 200) {
        const responseData = response.data;
        localStorage.setItem("authUser", JSON.stringify(responseData)); //guarda el token en aplicación-storage
        localStorage.setItem("userLogedIn", "true");
        dispatch(dispatch(loginUserSuccess(response.data.userData)));
      }
      // Ahora, obtenemos los datos del usuario logueado utilizando la ruta userData
      const userResponse = await axios.get(
        `/usuario/userData?userName=${userName}`
      );
      dispatch({
        type: GET_USER_DATA,
        payload: userResponse.data,
        alert: "Te logueaste con exito",
      });
      return { success: true };
    } catch (error) {
      if (error.response && error.response.status === 400) {
        dispatch({
          type: GET_USER_DATA,
          alert: error.response.data.error,
        });
      }
      return { success: false }; // Indica que el inicio de sesión falló
    }
  };
}

export function logOutUser() {
  localStorage.removeItem("authUser"); //al cerrar la sesion elimina su almacenamiento
  localStorage.setItem("userLogedIn", "false");
  return {
    type: USER_LOGOUT,
  };
}

export const submitAdoptionRequest = (formData, petId) => async (dispatch) => {
  try {
    await axios.post(`/mascotas/${petId}/adopt`, formData);
    // Puedes realizar cualquier lógica adicional aquí después de enviar la solicitud
  } catch (error) {
    throw error;
  }
};

export function loginUserGoogle(email, name, lastName) {
  return async function (dispatch) {
    try {
      const randomNumber = Math.floor(Math.random() * 1000) + 1;
      const userNameWithRandomNumber = name + lastName + randomNumber;
      const response = await axios.get(
        `/usuario/loginGoogle?email=${email}&name=${name}&lastName=${lastName}&userName=${userNameWithRandomNumber}`
      );
      localStorage.setItem("userLogedIn", "true");
      dispatch({
        type: LOGIN_USER_GOOGLE,
        payload: response.data,
      });
      return { success: true };
    } catch (error) {
      return { success: false };
      // return error.message;
    }
  };
}

export function postDonationAndMercadoPago(
  donationData,
  donationId,
  mp_payment_id,
  mp_status
) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`/donations/payment`, donationData);
      const { preferenceId, donate } = response.data;

      dispatch({
        type: POST_DONATION,
        payload: donate,
        alert: "Serás redirigido a Mercado Pago",
      });

      window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?preference_id=${preferenceId}`;

      // Esperar el retorno de Mercado Pago y obtener mp_payment_id y mp_status
      const urlParams = new URLSearchParams(window.location.search);
      const mp_payment_id = urlParams.get("mp_payment_id");
      const mp_status = urlParams.get("mp_status");

      if (mp_payment_id && mp_status) {
        const resMpago = await axios.post(
          `http://localhost:3001/donations/success`,
          {
            donationId: donate.id,
            mp_payment_id,
            mp_status,
          }
        );

        dispatch({
          type: POST_DONATION_SUCCESS,
          payload: resMpago.data,
        });
        window.alert("Gracias por tu granito de arena!");
      } else {
        dispatch({
          type: POST_DONATION_FAILURE,
          payload: "Error al obtener los datos de pago de Mercado Pago",
        });

        /*window.alert("Error al obtener los datos de pago de Mercado Pago.");*/
      }
    } catch (error) {
      dispatch({
        type: POST_DONATION_FAILURE,
        payload: error.message,
      });
      window.alert(error.message);
    }
  };
}

export function updateUser(
  email,
  name,
  lastName,
  userName,
  birthdate,
  address,
  numberPhone,
  image,
  DBpassword,
  userActualPassword,
  userNewPassword
) {
  return async function (dispatch) {
    try {
      const response = await axios.put("/usuario/userUpdate", {
        email,
        name,
        lastName,
        userName,
        birthdate,
        address,
        numberPhone,
        image,
        DBpassword,
        userActualPassword,
        userNewPassword,
      });
      if (response.status === 200) {
        return dispatch({
          type: USER_UPDATE,
          payload: response.data,
          alert: "Usuario editado con exito",
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        return dispatch({
          type: USER_UPDATE_FAILURE,
          payload: error.response.data.error,
        });
      } else {
        window.alert(error.message);
      }
    }
  };
}

export function createUserPassword(
  idFacebook,
  email,
  createdPassword,
  createdEmail
) {
  return async function (dispatch) {
    try {
      const response = await axios.put(`/usuario/createUserPassword`, {
        idFacebook,
        email,
        createdPassword,
        createdEmail,
      });
      if (response.status === 200) {
        return dispatch({
          type: CREATE_USER_PASSWORD,
          payload: response.data,
          alert: "Cambios Aplicados",
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        window.alert(error.response.data.error);
      } else {
        window.alert(error.message);
      }
    }
  };
}

export function getMyPets(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/mascotas/mispublicaciones/${id}`);
      return dispatch({
        type: "GET_MY_PETS",
        payload: response.data,
      });
    } catch (error) {
      return error.message;
    }
  };
}
export function getAllUsers() {
  return async function (dispatch) {
    try {
      const response = await axios.get("/usuario/users");
      return dispatch({
        type: GET_ALL_USERS,
        payload: response.data,
      });
    } catch (error) {
      return error.message;
    }
  };
}

export function deleteUser(id) {
  return async function (dispatch) {
    try {
      const response = await axios.delete(`/usuario/deleteUser?id=${id}`);
      return dispatch({
        type: DELETE_USER,
        payload: response.data,
      });
    } catch (error) {
      return error.message;
    }
  };
}

export function getAllReviws() {
  return async function (dispatch) {
    try {
      const response = await axios.get("/review");
      return dispatch({
        type: GET_ALL_REVIEWS,
        payload: response.data,
      });
    } catch (error) {
      return error.message;
    }
  };
}

export function changeUserType(id) {
  return async function (dispatch) {
    try {
      const response = await axios.put("/usuario/changeType", { id });
      if (response.status === 200) {
        return dispatch({
          type: CHANGE_USER_TYPE,
          payload: "Tipo de usuario cambiado",
        });
      } else {
        return dispatch({
          type: CHANGE_USER_TYPE,
          payload: "Error al cambiar tipo de usuario",
        });
      }
    } catch (error) {
      return error.message;
    }
  };
}

export function getAllUserData(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/usuario/dataOfUser`, {
        params: { id },
      });
      return dispatch({
        type: GET_ALL_USER_DATA,
        payload: response.data,
      });
    } catch (error) {
      return error.message;
    }
  };
}

export function deletePetDb(id) {
  return async function (dispatch) {
    try {
      const response = await axios.delete(`/mascotas/delete/${id}`);
      if (response.status === 200) {
        return dispatch({
          type: DELETE_PET_DB,
          payload: response.data,
        });
      } else {
        return dispatch({
          type: DELETE_PET_DB,
          payload: "Ocurrio un problema",
        });
      }
    } catch (error) {
      return error.message;
    }
  };
}

export function getAllDonations() {
  return async function (dispatch) {
    try {
      const response = await axios.get("/donations/all");
      return dispatch({
        type: GET_ALL_DONATIONS,
        payload: response.data,
      });
    } catch (error) {
      return error.message;
    }
  };
}

export function clearAlerts() {
  return {
    type: CLEAR_ALERTS_STATE,
  };
}

export function clearAux() {
  //para limpiar AuxState al desmontar el detail
  return {
    type: "CLEAR_AUX_STATE",
  };
}

// Reviews

export const createReview = ({ puntuacion, comentario, userName }) => {
  return async function (dispatch) {
    try {
      const response = await axios.post("/review", {
        puntuacion,
        comentario,
        userName,
      });
      return dispatch({
        type: CREATE_REVIEW,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUserReviews = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/review/${id}`);
      return dispatch({
        type: GET_USER_REVIEWS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllReviews = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/review/`);
      return dispatch({
        type: GET_REVIEWS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
