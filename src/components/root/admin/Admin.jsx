import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { deleteUser, fetchAllUsers } from "redux/userAdmin/userAdmin.actions";
import { ADMIN_USER_KEY } from "redux/userAdmin/userAdmin.reducer";

export default function Admin() {
   let user = JSON.parse(localStorage.getItem("user"));
   console.log("user", user);
   let { isAdmin } = user;

   let dispatch = useDispatch();

   // fetch user info from the REDUX Store
   let userInfo = useSelector((state) => {
      return state[ADMIN_USER_KEY];
   });

   // dispatch an action to fetch all user from server & add to REDUX store
   useEffect(() => {
      dispatch(fetchAllUsers());
   }, []);

   // delete User
   let clickDeleteUser = (userId) => {
      dispatch(deleteUser(userId));
   };
   return (
      <>
         {isAdmin ? (
            <div className="container mt-4">
               <div className="row animated slideInLeft">
                  <div className="col">
                     <h2>User Details</h2>
                     <p className="lead">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus hic rem officiis omnis ab aut alias
                        magni maxime eos exercitationem. Nihil consectetur officia ex illo perspiciatis ea. Nihil, ab corporis.
                     </p>
                  </div>
               </div>
               <div className="row mt-4 animated zoomIn delay-1s">
                  <div className="col">
                     <table className="table table-hover text-center table-striped table-success">
                        <thead className="bg-dark text-white">
                           <tr>
                              <th>SNO</th>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Phone</th>
                              <th>Action</th>
                           </tr>
                        </thead>
                        <tbody>
                           {userInfo.users.length > 0 ? (
                              <>
                                 {userInfo.users.map((user) => {
                                    return (
                                       <tr key={user._id}>
                                          <td>{user._id.substr(user._id.length - 4)}</td>

                                          <td>{user.name}</td>
                                          <td>{user.email}</td>
                                          <td>{user.phone}</td>
                                          <td>
                                             <Link to={`/user/${user._id}`} className="btn btn-secondary btn-sm text-white">
                                                Update
                                             </Link>
                                             <button
                                                onClick={clickDeleteUser.bind(this, user._id)}
                                                className="btn btn-danger btn-sm text-white"
                                             >
                                                Delete
                                             </button>
                                          </td>
                                       </tr>
                                    );
                                 })}
                              </>
                           ) : (
                              <>
                                 <tr>
                                    <td
                                       // @ts-ignore
                                       colSpan="6"
                                       className="text-danger font-weight-bold"
                                    >
                                       ------------- No Users Available ------------
                                    </td>
                                 </tr>
                              </>
                           )}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         ) : (
            <>
               <div className="landing-page1 d-flex justify-content-center align-items-center">
                  <h1 className="display-2 text-center text-danger text-capitalize ">
                     You are not Authorized to visit this page Plz contact admin
                  </h1>
               </div>
            </>
         )}
      </>
   );
}
