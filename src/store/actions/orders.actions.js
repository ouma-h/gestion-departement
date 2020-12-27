import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL, getApiOptions } from "../store";
export const ADD_ORDER = "ADD_ORDER";
export const ADD_SALE = "ADD_SALE";
export const ADD_PAYMENT_TO_ORDER = "ADD_PAYMENT_TO_ORDER";
export const GET_ORDERS = "GET_ORDERS";
export const GET_ORDERS_FETCH = "GET_ORDERS_FETCH";
export const GET_ORDER_BY_ID = "GET_ORDER_BY_ID";
export const GET_PAYMENTS_BY_ORDER = "GET_PAYMENTS_BY_ORDER";
export const ADD_PAYMENT_TO_ORDER_BEGIN = "ADD_PAYMENT_TO_ORDER_BEGIN";
export const EDIT_ORDER = "EDIT_ORDER";
export const EDIT_PRODUCT_ORDER = "EDIT_PRODUCT_ORDER";
export const EDIT_PAYMENT = "EDIT_PAYMENT";
export const DELETE_ORDER = "DELETE_ORDER";
export const DELETE_PRODUCT_ORDER = "DELETE_PRODUCT_ORDER";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const addOrder = (commande, produits, paiements, order_id) => (
  dispatch
) => {
  // REQUEST BODY
  const body = JSON.stringify({
    commande,
    produits,
    paiements,
    order_id: order_id,
  });

  axios
    .post(BASE_URL + "/commandes", body, config)
    .then((res) => {
      if (res.status == 200) {
        console.log(res.data);
        dispatch({
          type: ADD_ORDER,
          payload: res.data.order,
          products: produits,
          payment: res.data.payment,
        });
        toast.success(res.data.message);
      } else {
        toast.warn(res.data.message);
      }
    })
    .catch((err) => {
      toast.error("Erreur lors de l'ajout de votre commande. Réessayer");
    });
};

export const getOrders = () => (dispatch) => {
  dispatch({
    type: GET_ORDERS_FETCH,
  });
  axios
    .get(BASE_URL + "/commandes")
    .then((res) => {
      dispatch({
        type: GET_ORDERS,
        payload: res.data,
      });
    })
    .catch((error) => {
      toast.error("Une erreur est survenue!");
    });
};

export const getOrderById = (id) => (dispatch, getState) => {
  axios
    .get(BASE_URL + `/commandes/${id}`)
    .then((res) => {
      dispatch({
        type: GET_ORDER_BY_ID,
        payload: res.data,
      });
      toast.success(res.data);
    })
    .catch((error) => {
      toast.error("Erreur ");
    });
};

export const addPaymentToOrder = (payments, orderId, deliveryId) => (
  dispatch
) => {
  dispatch({
    type: ADD_PAYMENT_TO_ORDER_BEGIN,
  });
  let body = null;

  console.log(body);
  axios
    .post(BASE_URL + `/paiement`, body, config)
    .then((res) => {
      if (res.status == 200) {
        dispatch({
          type: ADD_PAYMENT_TO_ORDER,
          payload: res.data,
          order_id: orderId,
          livraison_id: deliveryId,
          payed: res.data.payed,
          is_immediate: payments[0]["is_immediate"],
        });
        toast.success(res.data.message);
      } else {
        toast.warn(res.data.message);
      }
    })
    .catch((error) => {
      console.log(error);
      toast.error("Erreur lors de l'ajout de paiement. Réessayer");
    });
};
export const getPaymentsByOrder = (id) => (dispatch) => {
  axios
    .get(BASE_URL + `/paiement/${id}`)
    .then((res) => {
      dispatch({
        type: GET_PAYMENTS_BY_ORDER,
        payload: res.data,
      });
      toast.success(res.data);
    })
    .catch((error) => {
      toast.error("Erreur get payment by order");
    });
};

export const editOrder = (id, dataField, value) => (dispatch) => {
  let vcommande = {};
  vcommande[dataField] = value;
  const body = JSON.stringify({ commande: vcommande });
  axios
    .put(BASE_URL + `/commandes/${id}`, body, config)
    .then((res) => {
      dispatch({
        type: EDIT_PRODUCT_ORDER,
        payload: res.data,
      });
      toast.success(res.data);
    })
    .catch((error) => {
      toast.error("Erreur: edition de la commande. Réessayer");
    });
};
export const editPayment = (id, paiement) => (dispatch) => {
  const body = JSON.stringify({ paiement: paiement });
  console.log(body);
  axios
    .put(BASE_URL + `/paiement/${id}`, body, config)
    .then((res) => {
      dispatch({
        type: EDIT_PAYMENT,
        payload: paiement,
        order_id: res.data.order_id,
        id: id,
        bill: res.data.payment,
        total: paiement.solde,
      });
      toast.success(res.data.message);
    })
    .catch((error) => {
      toast.error("Erreur lors de l'effection du paiement. Réessayer");
    });
};

export const editProductOrder = (id, dataField, value) => (dispatch) => {
  let vproduit = {};
  vproduit[dataField] = value;
  const body = JSON.stringify({ produit: vproduit });

  axios
    .put(BASE_URL + `/commandes/produit/${id}`, body, config)
    .then((res) => {
      dispatch({
        type: EDIT_ORDER,
        payload: res.data,
      });
      console.log(res);
      toast.success(res.data);
    })
    .catch((error) => {
      toast.error("Erreur: edition du produit de cette commande. Réessayer");
    });
};

export const deleteOrder = (id) => (dispatch) => {
  axios
    .delete(BASE_URL + `/commandes/${id}`)
    .then((res) => {
      dispatch({
        type: DELETE_ORDER,
        payload: res.data,
        id: id,
      });
      toast.success(res.data);
    })
    .catch((error) => {
      console.log(error);
      toast.error("Erreur: suppression de la commande. Réessayer");
    });
};
export const deleteProductOrder = (id) => (dispatch) => {
  axios
    .delete(BASE_URL + `/commandes/produit/${id}`)
    .then((res) => {
      dispatch({
        type: DELETE_PRODUCT_ORDER,
        payload: res.data,
        id: id,
      });
      toast.success(res.data);
    })
    .catch((error) => {
      toast.error(
        "Erreur: suppression du produit de cette commande. Réessayer"
      );
    });
};
