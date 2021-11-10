// npm dependencies
import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";

// components for routing
import Home from './Components/Home/home';
import Admin from './Components/Admin/admin';
import User from './Components/User/user';
import Logout from './Components/Logout/logout';
import MyProfile from './Components/profile/profile';
import AdminDashboard from "./Components/Admin/adminDashboard";
import ManageUsers from "./Components/Admin/manageUsers";
import ManageTeams from "./Components/Admin/manageTeams";
import ManagePlayers from "./Components/Admin/managePlayers";
import ManageAccess from "./Components/Admin/manageAccess";
/**
 * CLASS COMPONENT:This is the routes component 
 */
class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Route exact path="/" component={Home} />
          <Route exact path="/logout" component={Logout} />

          <Route path="/admin" component={Admin} />
          <Route exact path="/admin/profile" component={MyProfile} />
          <Route exact path="/admin/dashboard" component={AdminDashboard} />
          <Route exact path="/admin/users" component={ManageUsers} />
          <Route exact path="/admin/teams" component={ManageTeams} />
          <Route exact path="/admin/players" component={ManagePlayers} />
          <Route exact path="/admin/access" component={ManageAccess} />

          <Route path="/user" component={User} />
          <Route exact path="/user/profile" component={MyProfile} />

        </React.Fragment>
      </BrowserRouter>
    );
  }
}
export default Routes;