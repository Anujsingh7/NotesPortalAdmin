import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { FirebaseProvdier } from "./Firebase";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
  <FirebaseProvdier>
    <App />
    </FirebaseProvdier>  
  </>
);
