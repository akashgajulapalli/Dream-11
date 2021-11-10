import React, { Component } from 'react';
import SingleInput from "../../Utils/singleInput/singleInput";
import { Button, MessageField } from "../../Utils/shared/dependencies";
import { getService } from "../../Utils/restApi";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            conf_password: '',
            message: ''
        }
    }

    handleChange = (e) => {
        this.setState({ message: '' });
        this.setState({ [e.target.name]: e.target.value });
    }

    doRegister = async () => {
        this.setState({ message: '' });
        const { username, email, password, conf_password } = this.state;
        if (password !== conf_password) {
            alert('passwords did not match');
        } else {
            const registerUser = {
                method: 'POST',
                url: 'http://localhost:8000/api/users/register',
                data: {
                    name: username,
                    email: email,
                    password: password
                }
            };
            const response = await getService(registerUser);
            if (response && response.status === 200) {
                this.setState({
                    email: '',
                    username: '',
                    password: '',
                    conf_password: ''
                })
            } else {
                this.setState({ message: response.data.message });
            }
        }
    }

    render() {
        const { username, email, password, conf_password, message } = this.state;
        return (
            <div class="wrap-login100 p-l-50 p-r-50 p-t-72 p-b-50">
                <span class="login100-form-title p-b-20">Sign Up</span>
                {
                    (message.length > 0)
                        ? <MessageField text={message} />
                        : null
                }
                <SingleInput
                    title={'Username'}
                    type={'text'}
                    placeholder={'Enter Name...'}
                    name={'username'}
                    content={username}
                    controlFunc={this.handleChange} />
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
                    name={'password'}
                    content={password}
                    controlFunc={this.handleChange} />
                <SingleInput
                    title={'Confirm Password'}
                    type={'password'}
                    placeholder={'***********'}
                    name={'conf_password'}
                    content={conf_password}
                    controlFunc={this.handleChange} />
                <div class="container-login100-form-btn">
                    <Button name={'Submit'} controlFunc={this.doRegister} />
                    <p className="dis-block txt3 hov1 p-r-30 p-t-10 p-b-10 p-l-30" onClick={() => this.props.accessParent.showLoginPage()}> Login</p>
                </div>
            </div>
        );
    }
}

export default Register;