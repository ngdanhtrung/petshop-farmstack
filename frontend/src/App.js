import React from "react";
import Navbar from "./screen/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Switch>
        <Route path="/" exact ></Route>
      </Switch>
    </Router>
  );
}

export default App;
