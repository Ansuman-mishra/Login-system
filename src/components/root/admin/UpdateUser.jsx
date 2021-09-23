import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchUser, updateUser, updateUserForm } from "redux/userAdmin/userAdmin.actions";
import { ADMIN_USER_KEY } from "redux/userAdmin/userAdmin.reducer";

export default function UpdateUser() {
   let dispatch = useDispatch();
   let history = useHistory();

   // @ts-ignore
   let [userId, setUserId] = useState(useParams().id);

   // get selected User from REDUX Store
   let selectedUserInfo = useSelector((state) => {
      return state[ADMIN_USER_KEY];
   });

   let [submitted, setSubmitted] = useState(false);
   let [errorMessage, setErrorMessage] = useState("");

   useEffect(() => {
      dispatch(fetchUser(userId));
   }, [userId]);

   // changeInput
   let changeInput = (event) => {
      let key = event.target.name;
      let value = event.target.value;
      dispatch(updateUserForm(key, value));
   };

   // submitUser
   let submitUser = (event) => {
      event.preventDefault();
      dispatch(updateUser(userId, selectedUserInfo.selectedUser, history));
   };
   return (
      <>
         <div className="container mt-3">
            <div className="row">
               <div className="col">
                  <p className="h3 text-secondary">Update a User</p>
                  <p className="lead">
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus corporis cumque, debitis, delectus
                     dignissimos distinctio expedita facere fugiat harum id iure, minus neque nesciunt odit officia perferendis
                     porro tempora ullam.
                  </p>
               </div>
            </div>
            <div className="row">
               <div className="col-md-5">
                  <div className="card">
                     <div className="card-header bg-secondary text-white">
                        <p className="h4">Update User</p>
                     </div>
                     <div className="card-body">
                        <form onSubmit={submitUser}>
                           <div className="form-group">
                              <input
                                 name="name"
                                 value={selectedUserInfo.selectedUser.name}
                                 onChange={changeInput}
                                 type="text"
                                 className="form-control"
                                 placeholder="Name"
                              />
                           </div>
                           <div className="form-group">
                              <input
                                 name="email"
                                 value={selectedUserInfo.selectedUser.email}
                                 onChange={changeInput}
                                 type="text"
                                 className="form-control"
                                 placeholder="email"
                              />
                           </div>
                           <div className="form-group">
                              <input
                                 name="phone"
                                 value={selectedUserInfo.selectedUser.phone}
                                 onChange={changeInput}
                                 type="text"
                                 className="form-control"
                                 placeholder="phone"
                              />
                           </div>
                           <div className="form-group">
                              <input type="submit" className="btn btn-secondary btn-sm" value="Update Product" />
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
