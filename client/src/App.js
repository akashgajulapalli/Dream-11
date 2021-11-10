// Npm dependencies
import React, { Component } from "react";

// routes for the main App module
import Routes from "./routes";
import './fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './fonts/Linearicons-Free-v1.0.0/icon-font.min.css';
import './fonts/iconic/css/material-design-iconic-font.min.css';
import './css/main.css';
import './css/util.css';
import './css/dashboard.scss';

/**
 * This class carries routes component.
 */
class App extends Component {
  render() {
    return (
      <div>
        <Routes />
      </div>
    );
  }
}

export default App;