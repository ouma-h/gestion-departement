import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL_STAFF, SUCCESS } from "../store";
export const ADD_STAFF = "ADD_STAFF";
export const GET_STAFF = "GET_STAFF";
export const GET_STAFF_FETCH = "GET_STAFF_FETCH";
export const EDIT_STAFF = "EDIT_STAFF";
export const DELETE_STAFF = "DELETE_STAFF";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const addStaff = (staff) => (dispatch) => {
  // REQUEST BODY
  const body = JSON.stringify(staff);

  axios
    .post(BASE_URL_STAFF, body, config)
    .then((res) => {
      dispatch({
        type: ADD_STAFF,
      });
      toast.success(SUCCESS);
    })
    .catch((err) => {
      toast.error("Erreur lors de l'ajout d'un membre. Réessayer");
    });
};

export const getStaff = () => (dispatch) => {
  dispatch({
    type: GET_STAFF_FETCH,
  });
  axios
    .get(BASE_URL_STAFF)
    .then((res) => {
      dispatch({
        type: GET_STAFF,
        payload: res.data,
      });
    })

    .catch((error) => {
      toast.error("Une erreur est survenue!");
    });
};

export const editStaff = (id, dataField, value) => (dispatch) => {
  let vcommande = {};
  vcommande[dataField] = value;
  const body = JSON.stringify({ commande: vcommande });
  axios
    .put(BASE_URL_STAFF + `/${id}`, body, config)
    .then((res) => {
      dispatch({
        type: EDIT_STAFF,
        payload: res.data,
      });
      toast.success(SUCCESS);
    })
    .catch((error) => {
      toast.error("Erreur: edition d'un membre d'admin. Réessayer");
    });
};

export const deleteStaff = (id) => (dispatch) => {
  axios
    .delete(BASE_URL_STAFF + `/${id}`)
    .then((res) => {
      dispatch({
        type: DELETE_STAFF,
        id: id,
      });
      toast.success(SUCCESS);
    })
    .catch((error) => {
      console.log(error);
      toast.error("Erreur: suppression d'un membre d'admin. Réessayer");
    });
};
