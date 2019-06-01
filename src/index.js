import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Nutshell from "./Nutshell";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";

ReactDOM.render(
  <Router>
    <CssBaseline />
    <Nutshell />
  </Router>,
  document.getElementById("root")
);
