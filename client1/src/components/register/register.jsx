import React, { Component } from "react";
import "./register.css";
import axios from "axios";
import { Link } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      mailid: "",
      pass: "",
      message: "",
    };
  }
  addEvent = (e) => {
    if (e.target.name === "newName") {
      this.setState({
        username: e.target.value,
      });
    } else if (e.target.name === "newEmail") {
      this.setState({
        mailid: e.target.value,
      });
    } else if (e.target.name === "pwd") {
      this.setState({
        pass: e.target.value,
      });
    }
  };
  createUser = () => {
    let url = "http://localhost:8000/api/users";
    const newObj = {
      name: this.state.username,
      email: this.state.mailid,
      password: this.state.pass,
    };
    axios
      .post(url, newObj)
      .then((response) => {
        this.setState({
          message: response.data.message,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    const { username, mailid, pass } = this.state;

    return (
      <div>
        <div class="col-sm-8"></div>
        <div class="col-sm-4">
          <div class="container">
            <h1>Register</h1>
            <hr />
            <label htmlFor="newName">
              <b>Name</b>
            </label>
            <br />
            <input
              type="text"
              defaultValue={username}
              placeholder="Enter Name"
              name="newName"
              id="newName"
              onChange={this.addEvent}
              required
            />
            <br />
            <label htmlFor="newEmail">
              <b>Email</b>
            </label>
            <br />
            <input
              type="text"
              defaultValue={mailid}
              placeholder="Enter Email"
              name="newEmail"
              id="newEmail"
              onChange={this.addEvent}
              required
            />
            <br />

            <label htmlFor="pwd">
              <b>Password</b>
            </label>
            <br />
            <input
              type="password"
              defaultValue={pass}
              placeholder="Enter Password"
              name="pwd"
              id="pwd"
              onChange={this.addEvent}
              required
            />
            <hr />

            <button type="submit" class="registerbtn" onClick={this.createUser}>
              Register
            </button>
            <p>
              Click here to <Link to="/">Login</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
