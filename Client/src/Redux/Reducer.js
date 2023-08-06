import {
  GET_PETS,
  GET_PET_DETAIL,
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
    case CLEAR_AUX_STATE: //limpio auxState al hacer unmount de un componente
      return {
        ...state,
        auxState: [], // cambié el null a [], para que se vacíe el estado en vez de establecerse en null, eso provocaba el error del detail
      };

    default:
      return {
        ...state,
      };
  }
}
