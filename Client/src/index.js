import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { store } from "./Redux/Store";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";

const { DEPLOY_BACK } = process.env;
// axios.defaults.baseURL = "http://localhost:3001";

axios.defaults.baseURL = DEPLOY_BACK;

ReactDOM.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="933461258445-6obss3psoedlvnceq9d6d1kt0fa47tfm.apps.googleusercontent.com">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
