import {
  ADD_PROFESSOR,
  GET_PROFESSORS,
  GET_PROFESSORS_FETCH,
  DELETE_PROFESSOR,
  EDIT_PROFESSOR,
  editProfessor,
} from "../actions/professors.actions";

const initialState = {
  professors: [],
  isLoaded: false,
};

function professorsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PROFESSOR: {
      return {
        ...state,
      };
    }
    case GET_PROFESSORS: {
      return {
        ...state,
        professors: action.payload,
        isLoaded: true,
      };
    }
    case GET_PROFESSORS_FETCH: {
      return {
        ...state,
        isLoaded: false,
      };
    }
    case EDIT_PROFESSOR: {
      return {
        ...state,
      };
    }
    case DELETE_PROFESSOR: {
      return {
        ...state,
        professors: state.professors.filter((pr) => pr.id !== action.id),
      };
    }

    default:
      return state;
  }
}

export default professorsReducer;
