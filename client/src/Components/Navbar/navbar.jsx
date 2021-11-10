import React, { Component } from "react";
import './navbar.scss';

class DynamicNavbar extends Component {
    state = {
        isAdmin: false
    }

    componentDidMount() {
        if (this.props.roleType === 'Admin') {
            this.setState({ isAdmin: true });
        }
    }
    render() {
        return (
            <nav className="navbar navbar-expand-sm bg-dark fixed-top headernav">
                <ul className="navbar-nav">
                   
                </ul>
            </nav>
        );
    }
}

export default DynamicNavbar;