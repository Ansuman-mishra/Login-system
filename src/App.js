import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/root/navbar/Navbar";
import { store } from "./redux/store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "components/root/home/Home";
import Login from "components/user/login/Login";
import Register from "components/user/register/Register";
import { getUserInfo } from "redux/user/user.actions";
import Admin from "components/root/admin/Admin";
import { PrivateRoute } from "router/PrivateRouter";
import { useSelector } from "react-redux";
import { USER_KEY } from "redux/user/user.reducer";
import UpdateUser from "components/root/admin/UpdateUser";
function App() {
   let { isAuthenticated } = useSelector((state) => {
      return state[USER_KEY];
   });
   useEffect(() => {
      if (isAuthenticated) {
         store.dispatch(getUserInfo());
      }
   }, [isAuthenticated]);
   return (
      <Router>
         <Navbar />

         <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/user/login" component={Login} />
            <Route exact path="/user/register" component={Register} />
            <PrivateRoute exact path="/user/admin" component={Admin} />
            <PrivateRoute exact path="/user/:id" component={UpdateUser} />
         </Switch>
      </Router>
   );
}

export default App;
