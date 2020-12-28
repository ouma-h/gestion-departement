import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL_STUDENTS, SUCCESS } from "../store";
export const ADD_STUDENT = "ADD_STUDENT";
export const GET_STUDENT = "GET_STUDENT";
export const GET_STUDENT_FETCH = "GET_STUDENT_FETCH";
export const EDIT_STUDENT = "EDIT_STUDENT";
export const DELETE_STUDENT = "DELETE_STUDENT";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const addStudent = (student) => (dispatch) => {
  // REQUEST BODY
  const body = JSON.stringify(student);

  axios
    .post(BASE_URL_STUDENTS, body, config)
    .then((res) => {
      dispatch({
        type: ADD_STUDENT,
      });
      toast.success(SUCCESS);
    })
    .catch((err) => {
      toast.error("Erreur lors de l'ajout d'un membre. Réessayer");
    });
};

export const getStudents = () => (dispatch) => {
  dispatch({
    type: GET_STUDENT_FETCH,
  });
  axios
    .get(BASE_URL_STUDENTS)
    .then((res) => {
      dispatch({
        type: GET_STUDENT,
        payload: res.data,
      });
    })

    .catch((error) => {
      toast.error("Une erreur est survenue!");
    });
};

export const editStudent = (id, dataField, value) => (dispatch) => {
  let vcommande = {};
  vcommande[dataField] = value;
  const body = JSON.stringify({ commande: vcommande });
  axios
    .put(BASE_URL_STUDENTS + `/${id}`, body, config)
    .then((res) => {
      dispatch({
        type: EDIT_STUDENT,
        payload: res.data,
      });
      toast.success(SUCCESS);
    })
    .catch((error) => {
      toast.error("Erreur: edition d'un membre d'admin. Réessayer");
    });
};

export const deleteStudent = (id) => (dispatch) => {
  axios
    .delete(BASE_URL_STUDENTS + `/${id}`)
    .then((res) => {
      dispatch({
        type: DELETE_STUDENT,
        id: id,
      });
      toast.success(SUCCESS);
    })
    .catch((error) => {
      console.log(error);
      toast.error("Erreur: suppression d'un membre d'admin. Réessayer");
    });
};