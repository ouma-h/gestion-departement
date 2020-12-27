import {
    ADD_PRODUCT,
    GET_PRODUCTS,
    DELETE_PRODUCT,
    EDIT_PRODUCT,
    GET_PRODUCTS_FETCH,
    getProducts
} from "../actions/products.action";
import { ADD_ORDER } from "../actions/orders.actions";

const initialState = {
    products: [],
    product: {},
    total: 0,
    outOfStock: 0,
    isLoaded: false
};

function productsReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_PRODUCT: {
            return {
                ...state,
                total: state.total + action.length
            };
        }
        case GET_PRODUCTS: {
            return {
                ...state,
                products: action.payload,
                total: action.total,
                outOfStock: action.outOfStock,
                pagination: action.pagination,
                purchases: action.purchases,
                isLoaded: true
            };
        }
        case GET_PRODUCTS_FETCH: {
            return {
                ...state,
                isLoaded: false
            };
        }
        case EDIT_PRODUCT: {
            console.log(action.newValue);
            if (action.dataField == "quantite") {
                if (action.oldValue == 0 && action.newValue != 0) {
                    state.outOfStock -= 1;
                } else if (action.newValue == 0 && action.oldValue != 0) {
                    console.log("bloc 2");
                    state.outOfStock += 1;
                }
                return {
                    ...state,
                    outOfStock: state.outOfStock
                };
            } else {
                return {
                    ...state
                };
            }
        }
        case DELETE_PRODUCT: {
            if (state.products.find(pr => pr.id == action.id).quantite == 0) {
                state.outOfStock -= 1;
            }
            return {
                ...state,
                products: state.products.filter(pr => pr.id !== action.id),
                total: state.total - 1,
                outOfStock: state.outOfStock
            };
        }
        case ADD_ORDER: {
            return {
                ...state,
                products: [...state.products]
            };
        }
        default:
            return state;
    }
}

export default productsReducer;
