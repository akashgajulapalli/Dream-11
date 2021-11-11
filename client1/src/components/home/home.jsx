import React, { Component } from "react";
import "./home.css";
import { Redirect } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token:"",
      status: true
    };
  }
  componentDidMount() {
    let temptoken = localStorage.getItem("token");
    this.setState({
      token: temptoken
    })
  }
  
  goToProfile = () => {
    if(this.state.token !== ""){
      this.setState({
        status: false
      })
    }
  }
  render() {
    const {token,status}=this.state;
    if(!status){
      return <Redirect to="/profile" />
    }
    return (
      <div>
        <div class="container-fluid p-1 bg-primary text-white text-center">
          <button class="btn btn-success btn-lg float-right" onClick={this.goToProfile}>Profile</button>
        </div>

        <div class="container mt-5">
          <div class="row">
            <div class="col-sm-3">
              <h3>Column 1</h3>
              
            </div>
            <div class="col-sm-6">
            </div>
            <div class="col-sm-3">
              <h3>Column 3</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
              <p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris...
              </p>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Home;
