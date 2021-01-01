import axios from "axios";
import { toast } from "react-toastify";

import { BASE_URL_PROFESSORS, SUCCESS } from "../constants";
export const GET_PROFESSORS = "GET_PROFESSORS";
export const GET_PROFESSORS_FETCH = "GET_PROFESSORS_FETCH";
export const ADD_PROFESSOR = "ADD_PROFESSOR";
export const EDIT_PROFESSOR = "EDIT_PROFESSOR";
export const DELETE_PROFESSOR = "DELETE_PROFESSOR";

export const getProfessors = () => (dispatch, getState) => {
  dispatch({
    type: GET_PROFESSORS_FETCH,
  });
  axios
    .get(BASE_URL_PROFESSORS)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: GET_PROFESSORS,
        payload: res.data.products,
      });
    })
    .catch((error) => {
      toast.error(
        "Une erreur est survenue lors de la récupération des produits!"
      );
    });
};
export const addProfessor = (produits) => (dispatch) => {
  //HEADERS
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // REQUEST BODY
  const body = JSON.stringify({ produits: produits });
  axios
    .post(BASE_URL_PROFESSORS, body, config)
    .then((res) => {
      dispatch({
        type: ADD_PROFESSOR,
        length: produits.length,
      });
      toast.success(SUCCESS);
    })
    .catch((err) => {
      console.log(err);
      toast.error("Une erreur est survenue!");
    });
};

export const editProfessor = (id, dataField, newValue, oldValue) => (
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
    .put(BASE_URL_PROFESSORS + `/${id}`, body, config)
    .then((res) => {
      dispatch({
        type: EDIT_PROFESSOR,
        payload: res.data,
        newValue: newValue,
        oldValue: oldValue,
        dataField: dataField,
      });
      toast.success(SUCCESS);
    })
    .catch((error) => {
      toast.error("Une erreur est survenue lors de la mise à jour du produit!");
    });
};

export const deleteProfessor = (id) => (dispatch) => {
  console.log("delete", id);
  axios
    .delete(BASE_URL_PROFESSORS + `/${id}`)
    .then((res) => {
      dispatch({
        type: DELETE_PROFESSOR,
        payload: res.data,
        id: id,
      });
      toast.success(SUCCESS);
    })
    .catch((error) => {
      toast.error("Une erreur est survenue!");
    });
};
