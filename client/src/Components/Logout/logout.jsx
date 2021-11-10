import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './logout.scss';
class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: false
        }
    }
    componentDidMount() {
        localStorage.clear();
    }

    login = () => {
        this.setState({ showLogin: true });
    }

    render() {
        const { showLogin } = this.state;
        if (showLogin) {
            return <Redirect to="/" />
        }
        return (
            <div className="logout m-l-200 p-t-200">
                <div className="logoutText">You are logged out. Press here to <span className="logoutLink" onClick={this.login}>login</span></div>
            </div>
        );
    }
}

export default Logout;