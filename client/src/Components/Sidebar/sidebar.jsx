import React, { Component } from 'react';
import { NavLink, Link } from "react-router-dom";
import './sidebar.scss';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    getActiveRoute(routeName) {
        return window.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    }

    render() {
        const { routesData, image, color } = this.props;
        return (
            <div className="sidebar" data-color={color} data-image={image}>
                <div className="sidebar-background" style={{ backgroundImage: "url(" + image + ")" }} />
                <div className="logo">
                    <Link to="/admin" className="simple-text logo-normal"><p>Dream 11</p></Link>
                </div>
                <div className="sidebar-wrapper">
                    <ul className="nav">
                        {
                            (routesData.length)
                                ? routesData.map((route, key) => {
                                    return (
                                        <li className={this.getActiveRoute(route.layout + route.path)} key={key} >
                                            <NavLink
                                                to={route.layout + route.path}
                                                className="nav-link"
                                                activeClassName="active" >
                                                <i className={route.icon} />
                                                <p >{route.name}</p>
                                            </NavLink>
                                        </li>
                                    );
                                })
                                : null
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sidebar;