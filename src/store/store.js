import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducers from "./reducers/root.reducer";
import { composeWithDevTools } from "redux-devtools-extension";

export const BASE_URL_STUDENTS = "http://localhost:8090/students"
export const BASE_URL_STAFF = "http://localhost:8090/admins"
export const BASE_URL_PROFESSORS = "http://localhost:8090/enseignants"
export const SUCCESS = "Opération éffectuée avec succés!";

const middleware = [thunk];
const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

store.subscribe(() => {});
export default store;
