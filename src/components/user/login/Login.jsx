import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { loginUser } from "redux/user/user.actions";

export default function Login() {
   let history = useHistory();
   let dispatch = useDispatch();
   let [emptyForm, setEmptyForm] = useState(false);
   let [user, setUser] = useState({
      email: "",
      password: "",
   });
   let [userError, setUserError] = useState({
      emailError: "",
      passwordError: "",
   });
   let handleEmail = (e) => {
      setUser({ ...user, email: e.target.value });
      let regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
      if (regExp.test(e.target.value)) {
         setUserError({ ...userError, emailError: "" });
      } else {
         setUserError({ ...userError, emailError: "Enter a proper Email" });
      }
   };

   // handle password
   let handlePassword = (e) => {
      setUser({ ...user, password: e.target.value });
      let regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (regExp.test(e.target.value)) {
         setUserError({ ...userError, passwordError: "" });
      } else {
         setUserError({
            ...userError,
            passwordError: "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number",
         });
      }
   };
   let submitLogin = (e) => {
      e.preventDefault();
      if (user.password != "" && user.email != "") {
         dispatch(loginUser(user, history));
      } else {
         setEmptyForm(true);
      }
   };
   return (
      <>
         <div className="container mt-5">
            <div className="row">
               <div className="col-md-4 m-auto animated flipInY">
                  {emptyForm && (
                     <>
                        <div className="alert alert-danger alert-dismissible">
                           <button className="close" onClick={(e) => setEmptyForm(false)}>
                              <i className="fa fa-times-circle" />
                           </button>
                           <small>Field can't be empty</small>
                        </div>
                     </>
                  )}
                  <div className="card">
                     <div className="card-header bg-primary text-white font-weight-bold h1 text-center">Login Here</div>
                     <div className="card-body">
                        <form action="" onSubmit={submitLogin}>
                           <div className="form-group">
                              <input
                                 name="email"
                                 value={user.email}
                                 onChange={handleEmail}
                                 type="email"
                                 className={`form-control ${userError.emailError ? "is-invalid" : ""}`}
                                 placeholder="Email"
                                 required
                                 autoComplete="off"
                              />
                              {userError.emailError ? <small className="text-danger">{userError.emailError}</small> : null}
                           </div>
                           <div className="form-group">
                              <input
                                 name="password"
                                 value={user.password}
                                 onChange={handlePassword}
                                 type="Password"
                                 className={`form-control ${userError.passwordError ? "is-invalid" : ""}`}
                                 placeholder="password"
                                 required
                                 autoComplete="off"
                              />
                              {userError.passwordError ? <small className="text-danger">{userError.passwordError}</small> : null}
                           </div>
                           <div className="text-center">
                              <input
                                 type="submit"
                                 className="btn btn-primary btn-sm"
                                 value="Login"
                                 style={{ fontSize: "25px" }}
                              />
                           </div>
                        </form>
                        <small>
                           Don't have an Account ? <Link to="/user/register"> Register</Link>
                        </small>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
