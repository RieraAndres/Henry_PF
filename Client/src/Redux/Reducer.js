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
  APPLY_FILTERS_FAILURE,
  UPDATE_PET,
  UPDATE_PET_STATUS,
  DISABLE_PET_SUCCESS,
  DISABLE_PET_FAILURE,
  POST_USER_SUCCESS,
  POST_USER_FAILURE,
  USER_LOGIN_SUCCESS,
  GET_USER_DATA,
  LOGIN_USER_GOOGLE,
  LOGIN_USER_FACEBOOK,
  USER_LOGOUT,
  POST_DONATION,
  POST_DONATION_SUCCESS,
  POST_DONATION_FAILURE,
  USER_UPDATE,
  CREATE_USER_PASSWORD,
  GET_ALL_USERS,
  DELETE_USER,
  CLEAR_ALERTS_STATE,
  GET_ALL_REVIEWS,
  CHANGE_USER_TYPE,
  GET_ALL_USER_DATA,
  CLEAR_USER_ALL_DATA,
} from "./Actions";

let initialState = {
  allPets: [],
  petsCopy: [],
  auxState: [],
  filters: { size: "", gender: "" },
  userCreated: false,
  orden: { orden_age: "", orden_name: "" },
  userData: {},
  userLogedIn: null,
  donations: [],
  allUsers: [],
  alerts: "",
  allReviews: [],
};

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
        allPets: action.payload,
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

    case UPDATE_PET:
      const updatedAllPets = state.allPets.map((pet) => {
        if (pet.id === action.payload.id) {
          return {
            ...pet,
            ...action.payload.updatedFields,
          };
        }
        return pet;
      });

      return {
        ...state,
        allPets: updatedAllPets,
      };

    case DISABLE_PET_SUCCESS:
    case DISABLE_PET_FAILURE:
      const updatedAllPetsAfterDisable = state.allPets.map((pet) => {
        if (pet.id === action.payload.id) {
          return {
            ...pet,
            status: false,
          };
        }
        return pet;
      });

      return {
        ...state,
        allPets: updatedAllPetsAfterDisable,
      };

    case UPDATE_PET_STATUS:
      return {
        ...state,
        petsCopy: state.petsCopy.map((pet) =>
          pet.id === action.payload.id
            ? { ...pet, status: action.payload.status }
            : pet
        ),
      };

    case POST_USER_SUCCESS:
      return {
        ...state,
        userCreated: true, //al ser creado con exito seteo en true el estado
      };
    case POST_USER_FAILURE:
      return {
        ...state, // al haber error seteo en false el estado
        userCreated: false,
      };

    case POST_DONATION_SUCCESS:
      return {
        ...state,
        donationCreated: true,
        error: null,
        donations: action.payload,
      };

    case POST_DONATION:
      return {
        ...state,
        donationCreated: true,
        error: null,
        donations: action.payload,
      };

    case POST_DONATION_FAILURE:
      return {
        ...state,
        donationCreated: false,
        error: action.payload,
        donations: [],
      };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        userLogedIn: true,
        userData: action.payload,
      };

    case GET_USER_DATA:
      return {
        ...state,
        userLogedIn: true,
        userData: action.payload,
      };

    case LOGIN_USER_GOOGLE:
      return {
        ...state,
        userLogedIn: true,
        userData: action.payload,
      };

    case LOGIN_USER_FACEBOOK:
      return {
        ...state,
        userLogedIn: true,
        userData: action.payload,
      };

    case USER_LOGOUT:
      return {
        ...state,
        userLogedIn: false,
        userData: {},
      };
    case USER_UPDATE:
      return {
        ...state,
        userData: action.payload,
      };
    case CREATE_USER_PASSWORD: {
      return {
        ...state,
        userData: action.payload,
      };
    }
    case GET_ALL_USERS: {
      return {
        ...state,
        allUsers: action.payload,
      };
    }
    case DELETE_USER: {
      return {
        ...state,
        alerts: action.payload,
      };
    }
    case GET_ALL_REVIEWS: {
      return {
        ...state,
        allReviews: action.payload,
      };
    }
    case CHANGE_USER_TYPE: {
      return {
        ...state,
        alerts: action.payload,
      };
    }

    case GET_ALL_USER_DATA: {
      return {
        ...state,
        auxState: action.payload,
      };
    }
    case CLEAR_ALERTS_STATE: {
      return {
        ...state,
        alerts: "",
      };
    }
    default:
      return {
        ...state,
      };
  }
}
