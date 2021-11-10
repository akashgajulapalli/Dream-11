import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './header.scss';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div className="header-container">
                <div className='header'>
                    <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
                        <Link to="/" className="navbar-brand">Logo</Link>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/login" className="nav-link" >Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/register" className="nav-link">Register</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}

export default Header;