import {
  GET_STAFF,
  GET_STAFF_FETCH,
  EDIT_STAFF,
  ADD_STAFF,
  DELETE_STAFF,
} from "../actions/staff.actions";

const initialStates = {
  staff: [],
  isLoaded: false,
};

function staffReducer(state = initialStates, action) {
  console.log(action);
  switch (action.type) {
    case ADD_STAFF: {
      return {
        ...state,
        staff: [...state.staff, action.payload],
      };
    }
    case GET_STAFF_FETCH: {
      return {
        ...state,
        isLoaded: false,
      };
    }

    case GET_STAFF: {
      return {
        ...state,
        staff: action.payload,
        isLoaded: true,
      };
    }

    case EDIT_STAFF: {
      return {
        ...state,
      };
    }

    case DELETE_STAFF: {
      return {
        ...state,
        staff: state.staff.filter((pr) => pr.id !== action.id),
      };
    }
    default:
      return state;
  }
}

export default staffReducer;
