import React from "react";
import Navbar from "./screen/Navbar/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
function App() {
  return (
    <Router>
      <Navbar></Navbar>
    </Router>
  );
}

export default App;
