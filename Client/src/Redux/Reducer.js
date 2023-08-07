import {
  GET_PETS,
  GET_PET_DETAIL,
  POST_PET_SUCCESS, 
  POST_PET_FAILURE,
  CLEAR_AUX_STATE,
  GET_PET_BY_NAME,
  SET_FILTER,
  SET_ORDEN,
  APPLY_FILTERS_SUCCESS,
  APPLY_FILTERS_FAILURE
} from "./Actions";

let initialState = { 
  allPets: [], 
  petsCopy: [], 
  auxState: [],
  filters: { //filtros
    name: "",
    gender: "",
  },
  orden: {
    orden_age: "",
    orden_name: "",
}, };

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PETS:
      return {
        //cargo con mascotas los estados
        ...state,
        allPets: action.payload,
        petsCopy: action.payload,
      };
    case GET_PET_DETAIL:
      return {
        ...state,
        auxState: action.payload,
      };
    case GET_PET_BY_NAME:
      return {
        ...state,
        petsCopy: action.payload,
      };

      case POST_PET_SUCCESS:
        return {
          ...state,
          petCreated: true,
          error: null,
        };
      case POST_PET_FAILURE:
        return {
          ...state,
          petCreated: false,
          error: action.payload,
        };
    case CLEAR_AUX_STATE: //limpio auxState al hacer unmount de un componente
      return {
        ...state,
        auxState: [], // el estado debe setearse como vacío y no como null, porque eso provoca que se rompa el detail
      };
      case SET_FILTER: // Nuevo caso para setear los filtros
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };
    case SET_ORDEN: // Nuevo caso para setear los parámetros de orden
      return {
        ...state,
        orden: {
          ...state.orden,
          ...action.payload,
        },
      };
      case APPLY_FILTERS_SUCCESS:
      return {
        ...state,
        petsCopy: action.payload, // Actualiza petsCopy con los datos filtrados y ordenados del servidor
      };
    case APPLY_FILTERS_FAILURE:
      return {
        ...state,
        error: action.payload, // Maneja el error en caso de fallo
      };

    default:
      return {
        ...state,
      };
  }
}