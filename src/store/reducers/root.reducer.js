import { combineReducers } from "redux";
import productsReducer from "./products.reducer";
import orderReducer from "./orders.reducer";
import clientsReducer from "./clients.reducer";

const rootReducers = combineReducers({
  products: productsReducer,
  orders: orderReducer,
  clients: clientsReducer,
});

export default rootReducers;
