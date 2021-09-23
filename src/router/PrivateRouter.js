import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { USER_KEY } from "redux/user/user.reducer";

export let PrivateRoute = ({ component: Component, ...rest }) => {
   let { isAuthenticated, loading } = useSelector((state) => {
      return state[USER_KEY];
   });
   return (
      <Route
         {...rest}
         render={(props) => {
            return !loading && !isAuthenticated ? <Redirect to="/user/login" /> : <Component {...props} />;
         }}
      />
   );
};
