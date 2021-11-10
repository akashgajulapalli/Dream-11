import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Sidebar from '../Sidebar/sidebar';
import DynamicNavbar from '../Navbar/navbar';
import adminDashboardRoutes from './adminRoutes';

class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    getRoutes = (routesData) => {
        return routesData.map((route, key) => {
            if (route.layout === "/admin") {
                return (
                    <Route key={key} path={route.layout + route.path} />
                );
            } else {
                return null
            }
        });
    };

    render() {
        return (
            <div className='row main-panel'>
                <div className='col-sm-3'>
                    <Sidebar
                        routesData={adminDashboardRoutes}
                        image={this.state.image}
                        color={'black'} />
                </div>
                <div className='col-sm-8 right'>
                    <DynamicNavbar roleType={'Admin'} />
                    <Switch>{this.getRoutes(adminDashboardRoutes)}</Switch>
                </div>
            </div>
        );
    }
}

export default Admin;