import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducers from "./reducers/root.reducer";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = [thunk];
const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

store.subscribe(() => {});
export default store;
