import React, { Component } from 'react';
import Login from '../login/login';
import Register from '../register/register';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginClick: true
        }
    }
    componentDidMount() {
        localStorage.clear();
    }
    showRegisterPage = () => {
        this.setState({ loginClick: false });
    }
    showLoginPage = () => {
        this.setState({ loginClick: true });
    }
    render() {
        const { loginClick } = this.state;
        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="login100-more" style={{ backgroundImage: 'images/bg-01.jpg' }} ></div>
                    {
                        (loginClick)
                            ? <Login accessParent={this} ref={'login'} />
                            : <Register accessParent={this} ref={'register'} />
                    }
                </div>
            </div >
        );
    }
}

export default Home;