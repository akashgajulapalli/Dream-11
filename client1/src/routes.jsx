import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Home from "./components/home/home";

const RouteComponent = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/home" component={Home}/>
      </Switch>
    </BrowserRouter>
  );
};

export default RouteComponent;
