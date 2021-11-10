import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import SingleInput from "../../Utils/singleInput/singleInput";
import { Button, MessageField } from "../../Utils/shared/dependencies";
import { getService } from "../../Utils/restApi";
import './login.scss';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            message: '',
            isAdmin: false,
            showNextPage: false
        }
    }

    handleChange = (e) => {
        this.setState({ message: '' });
        this.setState({ [e.target.name]: e.target.value });
    }

    doLogin = async () => {
        this.setState({ message: '' });
        const { email, password } = this.state;
        const loginUser = {
            method: 'POST',
            url: 'http://localhost:8000/api/auth/login',
            data: {
                email: email,
                password: password
            }
        };
        const response = await getService(loginUser);
        if (response && response.status === 200) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("isAdmin", response.data.isAdmin);
            this.setState({ showNextPage: true, isAdmin: response.data.isAdmin });
        } else {
            this.setState({ message: response.data.message });
        }
    }

    render() {
        const { email, password, message, isAdmin, showNextPage } = this.state;
        if (showNextPage) {
            if (isAdmin) {
                return <Redirect to="/admin" />
            } else {
                return <Redirect to="/user" />
            }
        }
        return (
            <div className="wrap-login100 p-l-50 p-r-50 p-t-72 p-b-50">
                <span className="login100-form-title p-b-20">Sign In</span>
                {
                    (message.length > 0)
                        ? <MessageField text={message} />
                        : null
                }
                <SingleInput
                    title={'Email'}
                    type={'email'}
                    placeholder={'Email address...'}
                    name={'email'}
                    content={email}
                    controlFunc={this.handleChange} />
                <SingleInput
                    title={'Password'}
                    type={'password'}
                    placeholder={'***********'}
                    content={password}
                    name={'password'}
                    controlFunc={this.handleChange} />
                <div className="container-login100-form-btn">
                    <Button name={'Submit'} controlFunc={this.doLogin} />
                    <p className="dis-block txt3 hov1 p-r-30 p-t-10 p-b-10 p-l-30" onClick={() => this.props.accessParent.showRegisterPage()}> Register</p>
                </div>
            </div>
        );
    }
}

export default Login;