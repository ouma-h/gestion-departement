import axios from "axios";
import { toast } from "react-toastify";

import { BASE_URL, getApiOptions } from "../store";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCTS_FETCH = "GET_PRODUCTS_FETCH";
export const GET_PRODUCTS_PER_CATEGORY = "GET_PRODUCTS_PER_CATEGORY";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const getProducts = () => (dispatch, getState) => {
  console.log("called");
  dispatch({
    type: GET_PRODUCTS_FETCH,
  });
  axios
    .get(BASE_URL + "/produits")
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data.products,
        total: res.data.total,
        outOfStock: res.data.outOfStock,
        purchases: res.data.purchases,
      });
    })
    .catch((error) => {
      toast.error(
        "Une erreur est survenue lors de la récupération des produits!"
      );
    });
};
export const addProduct = (produits) => (dispatch) => {
  //HEADERS
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // REQUEST BODY
  const body = JSON.stringify({ produits: produits });
  axios
    .post(BASE_URL + "/produits", body, config)
    .then((res) => {
      dispatch({
        type: ADD_PRODUCT,
        length: produits.length,
      });
      toast.success(res.data.message);
      dispatch(getProducts());
    })
    .catch((err) => {
      console.log(err);
      toast.error("Une erreur est survenue!");
    });
};

export const getProductsPerCategory = (id) => (dispatch, getState) => {
  axios
    .get(BASE_URL + `/produits/${id}`)
    .then((res) => {
      dispatch({
        type: GET_PRODUCTS_PER_CATEGORY,
        payload: res.data,
      });
    })
    .catch((error) => {
      toast.error("Une erreur est survenue!");
    });
};

export const editProduct = (id, dataField, newValue, oldValue) => (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let product = {};
  product[dataField] = newValue;
  const body = JSON.stringify({ produit: product });
  axios
    .put(BASE_URL + `/produits/${id}`, body, config)
    .then((res) => {
      dispatch({
        type: EDIT_PRODUCT,
        payload: res.data,
        newValue: newValue,
        oldValue: oldValue,
        dataField: dataField,
      });
      toast.success(res.data);
    })
    .catch((error) => {
      toast.error("Une erreur est survenue lors de la mise à jour du produit!");
    });
};

export const deleteProduct = (id) => (dispatch) => {
  console.log("delete", id);
  axios
    .delete(BASE_URL + `/produits/${id}`)
    .then((res) => {
      dispatch({
        type: DELETE_PRODUCT,
        payload: res.data,
        id: id,
      });
      toast.success(res.data);
    })
    .catch((error) => {
      toast.error("Une erreur est survenue!");
    });
};
