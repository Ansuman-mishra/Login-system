import Axios from "axios";
import {
   DELETE_USER_FAILURE,
   DELETE_USER_REQUEST,
   DELETE_USER_SUCCESS,
   FETCH_ALL_USER_FAILURE,
   FETCH_ALL_USER_REQUEST,
   FETCH_ALL_USER_SUCCESS,
   FETCH_USER_FAILURE,
   FETCH_USER_REQUEST,
   FETCH_USER_SUCCESS,
   UPDATE_USER_FAILURE,
   UPDATE_USER_FORM,
   UPDATE_USER_REQUEST,
   UPDATE_USER_SUCCESS,
} from "./userAdmin.actionsType";

// FETCH all User
export let fetchAllUsers = () => {
   return (dispatch) => {
      dispatch({ type: FETCH_ALL_USER_REQUEST });
      let dataURL = `http://127.0.0.1:5000/admin/alluser`;
      Axios.get(dataURL)
         .then((response) => {
            dispatch({ type: FETCH_ALL_USER_SUCCESS, payload: response.data });
         })
         .catch((error) => {
            dispatch({ type: FETCH_ALL_USER_FAILURE, payload: error });
         });
   };
};

// fetch a single user
export let fetchUser = (userId) => {
   return (dispatch) => {
      dispatch({ type: FETCH_USER_REQUEST });
      let dataURL = `http://127.0.0.1:5000/admin/alluser/${userId}`;
      Axios.get(dataURL)
         .then((response) => {
            dispatch({ type: FETCH_USER_SUCCESS, payload: response.data });
         })
         .catch((error) => {
            dispatch({ type: FETCH_USER_FAILURE, payload: error });
         });
   };
};

// update user Form
export let updateUserForm = (key, value) => {
   return (dispatch) => {
      dispatch({ type: UPDATE_USER_FORM, payload: { key, value } });
   };
};

// update User
export let updateUser = (userId, selectedUser, history) => {
   return (dispatch) => {
      dispatch({ type: UPDATE_USER_REQUEST });
      let dataURL = `http://127.0.0.1:5000/admin/alluser/${userId}`;
      Axios.put(dataURL, selectedUser)
         .then((response) => {
            dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data });
            history.push("admin");
         })
         .catch((error) => {
            dispatch({ type: UPDATE_USER_FAILURE, payload: error });
         });
   };
};

// delete User
export let deleteUser = (userId) => {
   return (dispatch) => {
      dispatch({ type: DELETE_USER_REQUEST });
      let dataURL = `http://127.0.0.1:5000/admin/alluser/${userId}`;
      Axios.delete(dataURL)
         .then((response) => {
            dispatch({ type: DELETE_USER_SUCCESS, payload: response.data });
            dispatch(fetchAllUsers()); // fetch all users once delete is done
         })
         .catch((error) => {
            dispatch({ type: DELETE_USER_FAILURE, payload: error });
         });
   };
};
