import {
    ADD_CLIENT,
    GET_CLIENTS,
    DELETE_CLIENT,
    EDIT_CLIENT,
    GET_CLIENTS_FETCH
} from "../actions/clients.action";

const initialState = {
    clients: [],
    isLoaded: false,
    total: 0
};

function clientsReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_CLIENT: {
            return {
                ...state,
                clients: [...state.clients, action.payload]
            };
        }
        case GET_CLIENTS_FETCH: {
            return {
                ...state,

                isLoaded: false
            };
        }
        case GET_CLIENTS: {
            return {
                ...state,
                clients: action.payload,
                isLoaded: true,
                total: action.total
            };
        }
        case EDIT_CLIENT: {
            return {
                ...state
            };
        }
        case DELETE_CLIENT: {
            return {
                ...state,
                clients: state.clients.filter(pr => pr.id !== action.id)
            };
        }
        default:
            return state;
    }
}

export default clientsReducer;
