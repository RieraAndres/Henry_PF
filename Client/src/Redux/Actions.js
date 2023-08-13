import axios from "axios";



export const GET_PETS = "GET_PETS";
export const GET_PET_DETAIL = "GET_PET_DETAIL";
export const GET_PET_BY_NAME = "GET_PET_BY_NAME";
export const POST_PET_SUCCESS = "POST_PET_SUCCESS";
export const POST_PET_FAILURE = "POST_PET_FAILURE";
export const CLEAR_AUX_STATE = "CLEAR_AUX_STATE";
export const SET_ORDEN = "SET_ORDEN"
export const SET_FILTER = "SET_FILTER"
export const APPLY_FILTERS_SUCCESS = "APPLY_FILTERS_SUCCESS"
export const APPLY_FILTERS_FAILURE = "APPLY_FILTERS_FAILURE"
export const POST_USER_SUCCESS = 'POST_USER_SUCCES'
export const POST_USER_FAILURE = 'POST_USER_FAILURE'
export const GET_USER_DATA = 'GET_USER_DATA'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE'




export function getPets() {
  return async function (dispatch) {
    try {
      const response = await axios(`http://localhost:3001/mascotas`); //traigo todas las mascotas
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
      const response = await axios.get(`http://localhost:3001/mascotas/${id}`);
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
      const response = await axios.get(
        `http://localhost:3001/mascotas?name=${name}`
      );
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
      await axios.post("http://localhost:3001/mascotas", formData);
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
      const queryString = `specie=${filters.specie}&size=${filters.size}&gender=${filters.gender}&orden=${orden}`;
      const response = await axios.get(`http://localhost:3001/mascotas/filter?${queryString}`, {
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


export function postUser(user) {
  return async function (dispatch) {
    try {
      const response = await axios.post("http://localhost:3001/usuario/userLog", user);
      
      // Si el servidor devuelve un código de estado 201 (creado), muestra el mensaje de éxito
      if (response.status === 201) {
        dispatch({
          type: POST_USER_SUCCESS, //para setear userCreated en true y redireccionar a la view login
        })
        window.alert(response.data.message); // Accedemos al mensaje en response.data
        
      }
      
    } catch (error) {
      if (error.response && error.response.status === 409) {
        dispatch({
          type: POST_USER_FAILURE,// para setear userCreated en false y mantenerme en la view de registro
        })
        window.alert(error.response.data.error); // Muestra el mensaje personalizado del servidor en caso de un error 409
      } else {
        window.alert(error.message);
      }
    }
  };
}

export function logInUser(userName,password){
  return async function (dispatch){
    try {
      const response = await axios.get(`http://localhost:3001/usuario/userLogin?userName=${userName}&password=${password}`)
      if(response.status === 200){
        dispatch({
          type:USER_LOGIN_SUCCESS,
          payload:response.data
        })
        window.alert("TE LOGUEASTE CON EXITO")
      }
    } catch (error) {
      if(error.response && error.response.status === 400 ){
        window.alert(error.response.data.error)
      }else{
        window.alert(error.message)
      }
    }
  }
}

export const submitAdoptionRequest = (formData, petId) => async (dispatch) => {
  try {
    await axios.post(`http://localhost:3001/mascotas/${petId}/adopt`, formData);
    // Puedes realizar cualquier lógica adicional aquí después de enviar la solicitud
  } catch (error) {
    throw error;
  }
};

export function getUserData (userName){
  return async function(dispatch){
    try {
      const response = await axios.get(`http://localhost:3001/usuario/userData?userName=${userName}`)
      return dispatch({
        type: GET_USER_DATA,
        payload: response.data
      })
    } catch (error) {
      
    }
  }
}

export function clearAux() {
  //para limpiar AuxState al desmontar el detail
  return {
    type: "CLEAR_AUX_STATE",
  };
}