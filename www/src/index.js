import React from "react";
import ReactDOM from "react-dom";
import { Router, Link } from "@reach/router";
import * as serviceWorker from "./serviceWorker";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Project from "./pages/Project";

ReactDOM.render(
  <Router>
    <Landing path="/" />
    <Login path="/login" />
    <Search path="/search" />
    <Project path="/project/:bid"/>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
