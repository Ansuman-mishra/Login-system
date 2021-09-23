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

export const ADMIN_USER_KEY = "adminUser";

let initialState = {
   loading: false,
   users: [],
   selectedUser: {},
   errorMessage: "",
};

export let adminReducer = (state = initialState, action) => {
   let { type, payload } = action;
   switch (type) {
      case FETCH_ALL_USER_REQUEST:
      case FETCH_USER_REQUEST:
      case UPDATE_USER_REQUEST:
      case DELETE_USER_REQUEST:
         return {
            ...state,
            loading: true,
         };
      case FETCH_ALL_USER_SUCCESS:
         return {
            ...state,
            loading: false,
            users: payload,
         };
      case FETCH_ALL_USER_FAILURE:
      case FETCH_USER_FAILURE:
      case UPDATE_USER_FAILURE:
      case DELETE_USER_FAILURE:
         return {
            ...state,
            loading: false,
            errorMessage: payload,
         };
      // Fetch a single User
      case FETCH_USER_SUCCESS:
         return {
            ...state,
            loading: false,
            selectedUser: payload,
         };
      // Update User Form
      case UPDATE_USER_FORM:
         return {
            ...state,
            loading: false,
            selectedUser: {
               ...state.selectedUser,
               [payload.key]: payload.value,
            },
         };
      // UPDATE USER
      case UPDATE_USER_SUCCESS:
         return {
            ...state,
            loading: false,
         };
      // DELETE USER
      case DELETE_USER_SUCCESS:
         return {
            ...state,
            loading: false,
         };
      default:
         return state;
   }
};
