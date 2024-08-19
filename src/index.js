import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {RecoilRoot,atom,selector, useRecoilState, useRecoilValue} from 'recoil';
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById("root")
);
