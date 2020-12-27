import axios from "axios";
import { toast } from "react-toastify";

import { BASE_URL } from "../store";
export const GET_CLIENTS = "GET_CLIENTS";
export const GET_CLIENTS_FETCH = "GET_CLIENTS_FETCH";
export const ADD_CLIENT = "ADD_CLIENT";
export const EDIT_CLIENT = "EDIT_CLIENT";
export const DELETE_CLIENT = "DELETE_CLIENT";

export const addClient = (client) => (dispatch) => {
  //HEADERS
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // REQUEST BODY
  const body = JSON.stringify({ client });
  console.log(body);

  axios
    .post(BASE_URL + "/clients", body, config)
    .then((res) => {
      dispatch({
        type: ADD_CLIENT,
        payload: res.data.client,
      });
      toast.success(res.data.message);
    })
    .catch((err) => {
      console.log("err", err);
      toast.error("Une erreur est survenue!");
    });
};

export const getClients = () => (dispatch) => {
  dispatch({
    type: GET_CLIENTS_FETCH,
  });
  axios
    .get(BASE_URL + "/clients")
    .then((res) => {
      dispatch({
        type: GET_CLIENTS,
        payload: res.data.clients,
        total: res.data.total,
      });
    })
    .catch((error) => {
      toast.error("Une erreur est survenue!");
    });
};

export const editClient = (id, dataField, value) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let vclient = {};
  vclient[dataField] = value;
  const body = JSON.stringify({ client: vclient });

  console.log("body", body);
  axios
    .put(BASE_URL + `/clients/${id}`, body, config)
    .then((res) => {
      dispatch({
        type: EDIT_CLIENT,
        payload: res.data,
      });
      toast.success(res.data);
    })
    .catch((error) => {
      toast.error("Une erreur est survenue!");
    });
};

export const deleteClient = (id) => (dispatch) => {
  axios
    .delete(BASE_URL + `/clients/${id}`)
    .then((res) => {
      dispatch({
        type: DELETE_CLIENT,
        payload: res.data,
        id: id,
      });
      toast.success(res.data);
    })
    .catch((error) => {
      toast.error("Une erreur est survenue!");
    });
};
