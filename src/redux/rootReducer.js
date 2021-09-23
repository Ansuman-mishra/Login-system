import { adminReducer, ADMIN_USER_KEY } from "./userAdmin/userAdmin.reducer";

const { combineReducers } = require("redux");
const { userReducer, USER_KEY } = require("./user/user.reducer");

export let rootReducer = combineReducers({
   [USER_KEY]: userReducer,
   [ADMIN_USER_KEY]: adminReducer,
});
