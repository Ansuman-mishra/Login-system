import Axios from "axios";
import { setAuthToken } from "util/setAuthToken";
import {
   REGISTER_USER_REQUEST,
   REGISTER_USER_SUCCESS,
   REGISTER_USER_FAILURE,
   LOGIN_USER_REQUEST,
   LOGIN_USER_SUCCESS,
   LOGIN_USER_FAILURE,
   GET_USER_INFO,
   LOGOUT,
} from "./user.actionsType";

// register a user
export let registerUser = (user, history) => {
   return async (dispatch) => {
      try {
         dispatch({ type: REGISTER_USER_REQUEST });
         let dataUrl = "http://127.0.0.1:5000/user/register";
         let response = await Axios.post(dataUrl, user);
         dispatch({ type: REGISTER_USER_SUCCESS, payload: response.data });
         history.push("/user/login");
      } catch (error) {
         dispatch({ type: REGISTER_USER_FAILURE, payload: error });
      }
   };
};

// login a user

export let loginUser = (user, history) => {
   return async (dispatch) => {
      try {
         dispatch({ type: LOGIN_USER_REQUEST });
         let dataUrl = "http://127.0.0.1:5000/user/login";
         let response = await Axios.post(dataUrl, user);
         dispatch({ type: LOGIN_USER_SUCCESS, payload: response.data });
         dispatch(getUserInfo());
         history.push("/");
      } catch (error) {
         dispatch({ type: LOGIN_USER_FAILURE, payload: error });
      }
   };
};

// get user information
export let getUserInfo = () => {
   return async (dispatch) => {
      if (localStorage.token) {
         setAuthToken(localStorage.getItem("token"));
      }
      try {
         let dataUrl = "http://127.0.0.1:5000/user";
         let response = await Axios.get(dataUrl);
         dispatch({ type: GET_USER_INFO, payload: response.data });
      } catch (error) {
         console.log(error);
      }
   };
};

//logout
export let logOut = (history) => {
   return async (dispatch) => {
      try {
         dispatch({ type: LOGOUT });
         history.replace("/user/login");
      } catch (error) {
         console.error(error);
      }
   };
};
