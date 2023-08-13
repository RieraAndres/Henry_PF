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
export const UPDATE_PET = "UPDATE_PET";
export const UPDATE_PET_STATUS = "UPDATE_PET_STATUS";

export const DISABLE_PET_SUCCESS = "DISABLE_PET_SUCCESS";
export const DISABLE_PET_FAILURE = "DISABLE_PET_FAILURE";

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
      const queryString = `size=${filters.size}&gender=${filters.gender}&orden_age=${orden.orden_age}&orden_name=${orden.orden_name}`
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



export function updatePet(id, updatedFields) {
  return async function (dispatch) {
    try {
      await axios.put(`http://localhost:3001/mascotas/${id}`, updatedFields);
      console.log("Pet updated successfully"); // Add this line
      // Puedes realizar cualquier lógica adicional aquí después de la actualización
    } catch (error) {
      console.log("Error updating pet:", error); // Add this line
      throw error;
    }
  };
}

export function disablePet(id) {
  return async function (dispatch) {
    try {
      await axios.put(`http://localhost:3001/mascotas/disable/${id}`);
      dispatch(disablePetSuccess(id)); // Pasar el id como argumento

      // Cambiar el estado de status a false en el Redux Store
      dispatch(updatePetStatus(id, false));
    } catch (error) {
      dispatch(disablePetFailure(error)); // Despachar fallo
      throw error;
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

// Agregar una nueva acción para actualizar el estado de status en el Redux Store
export function updatePetStatus(id, status) {
  return {
    type: UPDATE_PET_STATUS,
    payload: {
      id,
      status,
    },
  };
}


export function clearAux() {
  //para limpiar AuxState al desmontar el detail
  return {
    type: "CLEAR_AUX_STATE",
  };
}