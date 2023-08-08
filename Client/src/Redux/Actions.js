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


export function clearAux() {
  //para limpiar AuxState al desmontar el detail
  return {
    type: "CLEAR_AUX_STATE",
  };
}