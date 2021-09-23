import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { registerUser } from "redux/user/user.actions";

export default function Register() {
   let history = useHistory();
   let dispatch = useDispatch();
   let [user, setUser] = useState({
      name: "",
      email: "",
      phone: "",
      password: "",
      cpassword: "",
   });
   let [userError, setUserError] = useState({
      nameError: "",
      emailError: "",
      phoneError: "",
      passwordError: "",
      cpasswordError: "",
   });
   let [emptyForm, setEmptyForm] = useState(false);
   let [isMatch, setIsMatch] = useState(false);

   // handle username
   let handleUsername = (e) => {
      setUser({ ...user, name: e.target.value });
      let regExp = /^[a-zA-Z\s]{4,20}$/;
      if (regExp.test(e.target.value)) {
         setUserError({ ...userError, nameError: "" });
      } else {
         setUserError({ ...userError, nameError: "Enter a proper Name" });
      }
   };

   // handle phone
   let handlePhone = (e) => {
      setUser({ ...user, phone: e.target.value });
      let regExp = /^[0-9]{10,10}$/;
      if (regExp.test(e.target.value)) {
         setUserError({ ...userError, phoneError: "" });
      } else {
         setUserError({ ...userError, phoneError: "Enter a proper Phone Number" });
      }
   };

   // handle Email
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
   let handleCPassword = (e) => {
      setUser({ ...user, cpassword: e.target.value });
      let regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (regExp.test(e.target.value)) {
         setUserError({ ...userError, cpasswordError: "" });
      } else {
         setUserError({
            ...userError,
            cpasswordError: "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number",
         });
      }
   };

   let submitRegister = (e) => {
      e.preventDefault();
      if (user.name != "" && user.password != "" && user.email != "" && user.phone && user.cpassword != "") {
         if (user.password == user.cpassword) {
            console.log(user);
            dispatch(registerUser(user, history));
         } else {
            setIsMatch(true);
         }
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
                  {isMatch && (
                     <>
                        <div className="alert alert-danger alert-dismissible">
                           <button className="close" onClick={(e) => setIsMatch(false)}>
                              <i className="fa fa-times-circle" />
                           </button>
                           <small>confirm password is not matching with password</small>
                        </div>
                     </>
                  )}
                  <div className="card">
                     <div className="card-header bg-primary text-white font-weight-bold h2 text-center">Registration Here</div>
                     <div className="card-body">
                        <form action="" onSubmit={submitRegister}>
                           <div className="form-group">
                              <input
                                 name="name"
                                 value={user.name}
                                 onChange={handleUsername}
                                 type="text"
                                 className={`form-control ${userError.nameError ? "is-invalid" : ""}`}
                                 placeholder="Full Name"
                                 required
                                 autoComplete="off"
                              />
                              {userError.nameError ? <small className="text-danger">{userError.nameError}</small> : null}
                           </div>
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
                                 name="phone"
                                 value={user.phone}
                                 onChange={handlePhone}
                                 type="tel"
                                 className={`form-control ${userError.phoneError ? "is-invalid" : ""}`}
                                 placeholder="1234567895"
                                 pattern="[0-9]{10}"
                                 required
                                 autoComplete="off"
                              />

                              {userError.phoneError ? <small className="text-danger">{userError.phoneError}</small> : null}
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
                           <div className="form-group">
                              <input
                                 name="cpassword"
                                 value={user.cpassword}
                                 onChange={handleCPassword}
                                 type="Password"
                                 className={`form-control ${userError.cpasswordError ? "is-invalid" : ""}`}
                                 placeholder="Confirm password"
                                 required
                                 autoComplete="off"
                              />
                              {userError.cpasswordError ? (
                                 <small className="text-danger">{userError.cpasswordError}</small>
                              ) : null}
                           </div>
                           <div className="text-center">
                              <input
                                 type="submit"
                                 className="btn btn-primary btn-sm font-weight-bold"
                                 value="Register"
                                 style={{ fontSize: "25px" }}
                              />
                           </div>
                        </form>
                        <small>
                           Have an Account ? <Link to="/user/login"> Login</Link>
                        </small>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
