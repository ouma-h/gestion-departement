import {
  GET_ORDERS_FETCH,
  ADD_ORDER,
  DELETE_ORDER,
  ADD_PAYMENT_TO_ORDER,
  ADD_PAYMENT_TO_ORDER_BEGIN,
  GET_ORDER_BY_ID,
  EDIT_ORDER,
  EDIT_PAYMENT,
  GET_ORDERS,
  EDIT_PRODUCT_ORDER,
  GET_PAYMENTS_BY_ORDER,
  ADD_SALE,
} from "../actions/orders.actions";

const initialStates = {
  orders: [],
  order: {},
  receivedPayments: [],
  plannedPayments: [],
  paidDeliveries: [],
  sales: [],
  bills: [],
  object: {},
  instantBill: {},
  isLoaded: false,
  successOrder: false,
  successPayment: false,
};

function orderReducer(state = initialStates, action) {
  switch (action.type) {
    case ADD_ORDER: {
      return {
        ...state,
        orders: [...state.orders, action.payload],
        instantBill: action.payment,
      };
    }
    case GET_ORDERS_FETCH: {
      return {
        ...state,
        isLoaded: false,
      };
    }

    case ADD_SALE: {
      return {
        ...state,
        sales: [...state.sales, action.payload],
      };
    }
    case ADD_PAYMENT_TO_ORDER_BEGIN: {
      return {
        ...state,
        successOrder: false,
      };
    }
    case ADD_PAYMENT_TO_ORDER: {
      return {
        ...state,
      };
    }
    case GET_ORDERS: {
      return {
        ...state,
        orders: action.payload,
        isLoaded: true,
      };
    }
    case GET_ORDER_BY_ID: {
      return {
        ...state,
        order: action.payload,
      };
    }
    case EDIT_ORDER: {
      return {
        ...state,
      };
    }
    case GET_PAYMENTS_BY_ORDER: {
      return {
        ...state,
        plannedPayments: action.payload.payments.filter((pr) => pr.payed == 0),
        receivedPayments: action.payload.payments.filter((pr) => pr.payed == 1),
        paidDeliveries: action.payload.paidDeliveries,
        object: action.payload,
      };
    }

    case EDIT_PAYMENT: {
      if (state.plannedPayments.length == 1) {
        let i = state.orders.findIndex(
          (obj) =>
            obj.id ==
            state.orders.find((element) => element.id == action.order_id).id
        );
        state.orders[i].payed = 1;
        return {
          ...state,
          plannedPayments: state.plannedPayments.filter(
            (pr) => pr.id !== action.id
          ),
          receivedPayments: [...state.receivedPayments, action.payload],
          orders: [...state.orders],
          successPayment: true,
          instantBill: action.bill,
        };
      } else {
        return {
          ...state,
          plannedPayments: state.plannedPayments.filter(
            (pr) => pr.id !== action.id
          ),
          receivedPayments: [...state.receivedPayments, action.payload],
          successPayment: true,
        };
      }
    }
    case EDIT_PRODUCT_ORDER: {
      return {
        ...state,
      };
    }
    case DELETE_ORDER: {
      let i = state.orders.findIndex(
        (obj) =>
          obj.id == state.orders.find((element) => element.id == action.id).id
      );
      state.orders[i].etat = "annulée";
      return {
        ...state,
        orders: [...state.orders],
      };
    }
    default:
      return state;
  }
}

export default orderReducer;
