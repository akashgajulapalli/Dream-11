import axios from "axios";
import React, { Component } from "react";
import "./login.css";
import { Redirect ,Link } from "react-router-dom"

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showlogin:true
    };
  }
  getEvent = (e) => {
    if (e.target.name === "mailid") {
      this.setState({
        email: e.target.value,
      });
    } else if (e.target.name === "pwd") {
      this.setState({
        password: e.target.value,
      });
    }
  };
  doLogin = () => {
    let newObj = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post("http://localhost:8000/api/auth/login", newObj)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("token", response?.data?.token);
          this.setState({
            showlogin:false
          })
          localStorage.setItem("mailId", this.state.email);

        }
      });
  };
  render() {
    const { email, password , showlogin } = this.state;
    if(!showlogin){
      return <Redirect to="/home" />
    }
    return (
      <div>
        <div class="col-sm-8"></div>
        <div class = "col-sm-4           ">
          <div className="container">
            <label htmlFor="mailid">
              <b>E-mail </b>
            </label>
            <br />
            <input
              type="text"
              defaultValue={email}
              placeholder="Enter Email"
              name="mailid"
              id="mailid"
              onChange={this.getEvent}
              required
            />
            <br />
            <label htmlFor="pwd">
              <b>Password: </b>
            </label>
            <br />
            <input
              type="password"
              defaultValue={password}
              placeholder="Enter Password"
              name="pwd"
              onChange={this.getEvent}
              required
            />
            <br />
            <button type="submit" onClick={this.doLogin}>
              Login
            </button>
              <p>Click here to <Link to="/register">Sign up</Link> </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
