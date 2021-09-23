import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "@fortawesome/fontawesome-free/css/all.css";
import "../node_modules/mdbootstrap/css/bootstrap.css";
import "../node_modules/mdbootstrap/css/mdb.css";
import "../node_modules/mdbootstrap/css/style.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "redux/store";

ReactDOM.render(
   <React.StrictMode>
      <Provider store={store}>
         <App />
      </Provider>
   </React.StrictMode>,
   document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
