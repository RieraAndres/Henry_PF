import {
  GET_PETS,
  GET_PET_DETAIL,
  POST_PET_SUCCESS, 
  POST_PET_FAILURE,
  CLEAR_AUX_STATE,
  GET_PET_BY_NAME,
} from "./Actions";

let initialState = { allPets: [], petsCopy: [], auxState: [] };

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

    default:
      return {
        ...state,
      };
  }
}