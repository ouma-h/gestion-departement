import {
  GET_STUDENT,
  GET_STUDENT_FETCH,
  EDIT_STUDENT,
  ADD_STUDENT,
  DELETE_STUDENT,
} from "../actions/students.actions";

const initialStates = {
  students: [],
  isLoaded: false,
};

function studentsReducer(state = initialStates, action) {
  switch (action.type) {
    case ADD_STUDENT: {
      return {
        ...state,
        students: [...state.students, action.payload],
      };
    }
    case GET_STUDENT_FETCH: {
      return {
        ...state,
        isLoaded: false,
      };
    }

    case GET_STUDENT: {
      return {
        ...state,
        students: action.payload,
        isLoaded: true,
      };
    }

    case EDIT_STUDENT: {
      return {
        ...state,
      };
    }

    case DELETE_STUDENT: {
      return {
        ...state,
        students: state.students.filter((pr) => pr.cin !== action.cin),
      };
    }
    default:
      return state;
  }
}

export default studentsReducer;
