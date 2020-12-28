import { combineReducers } from "redux";
import staffReducer from "./staff.reducer";
import studentsReducer from "./students.reducer";
import professorsReducer from "./professors.reducer";

const rootReducers = combineReducers({
  professors: professorsReducer,
  students: studentsReducer,
  staff: staffReducer,
});

export default rootReducers;
