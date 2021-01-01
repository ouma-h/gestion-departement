import { combineReducers } from "redux";
import staffReducer from "./staff.reducer";
import studentsReducer from "./students.reducer";
import professorsReducer from "./professors.reducer";

const rootReducers = combineReducers({
  students: studentsReducer,
  professors: professorsReducer,
  staff: staffReducer,
});

export default rootReducers;
