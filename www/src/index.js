import React from "react";
import ReactDOM from "react-dom";
import { Router, Link } from "@reach/router";
import * as serviceWorker from "./serviceWorker";
import Landing from "./pages/Landing";

ReactDOM.render(
  <Router>
    <Landing path="/" />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
