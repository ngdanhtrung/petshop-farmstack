import React from "react";
import Navbar from "./screen/Navbar/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./screen/Home/index"
function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Switch>
        <Route path="/Home" exact ></Route>
      </Switch>
    </Router>
  );
}

export default App;
