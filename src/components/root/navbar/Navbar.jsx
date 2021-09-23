import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logOut } from "redux/user/user.actions";
import { USER_KEY } from "redux/user/user.reducer";
import logo from "../../../assets/logo.png";
export default function Navbar() {
   let history = useHistory();
   let dispatch = useDispatch();
   let userInfo = useSelector((state) => {
      return state[USER_KEY];
   });

   let { isAuthenticated, loading, user } = userInfo;
   let logoutUser = () => {
      dispatch(logOut(history));
   };
   let isNotSignedIn = (
      <>
         <li className="nav-item">
            <Link to="/user/login" className="nav-link font-weight-bold">
               Login
            </Link>
         </li>
         <li className="nav-item">
            <Link to="/user/register" className="nav-link font-weight-bold">
               Register
            </Link>
         </li>
      </>
   );

   let isSignedIn = (
      <>
         {user ? (
            <>
               <li className="nav-item">
                  <Link to="/" className="nav-link font-weight-bold">
                     {user.name}
                  </Link>
               </li>
            </>
         ) : null}
         <li className="nav-item">
            <Link to="#" className="nav-link font-weight-bold" onClick={logoutUser}>
               Logout
            </Link>
         </li>
      </>
   );
   return (
      <>
         <nav className="navbar navbar-light bg-light navbar-expand-sm">
            <div className="container-fluid">
               <Link to="/" className="navbar-brand">
                  <img src={logo} alt="LOGO" className="img-fluid" width="50" height="50" />
               </Link>
               <div className="collapse navbar-collapse">
                  <ul className="navbar-nav ml-auto">
                     {!loading && <>{isAuthenticated ? isSignedIn : isNotSignedIn}</>}
                     {isAuthenticated && (
                        <>
                           <li className="nav-item">
                              <Link to="/user/admin" className="nav-link font-weight-bold">
                                 Admin
                              </Link>
                           </li>
                        </>
                     )}
                  </ul>
               </div>
            </div>
         </nav>
      </>
   );
}
