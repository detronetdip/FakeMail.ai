import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/scss/style.scss";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <Router>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </RecoilRoot>
  </React.StrictMode>
);
