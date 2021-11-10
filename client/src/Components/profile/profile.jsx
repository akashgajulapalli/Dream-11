import React, { Component } from 'react';
import { getService } from "../../Utils/restApi";
import './profile.scss';
class MyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userEmail: '',
            userTeam: [],
            clic: false
        }
    }
    componentDidMount() {
        this.getProfileDetails();
    }

    createTeam = () => {
        this.setState({ clic: true });
    }

    getProfileDetails = async () => {
        const getProfile = {
            method: 'GET',
            url: 'http://localhost:8000/api/users/me'
        };
        const response = await getService(getProfile);
        if (response && response.status === 200) {
            this.setState({
                userName: response.data.userDetails.name,
                userEmail: response.data.userDetails.email,
                userTeam: response.data.userDetails.team
            });
        } else {

        }
    }

    render() {
        const { userName, userEmail, userTeam, clic } = this.state;
        return (
            <div className="content profile">
                <div className="row">
                    <div className="col-sm-7">
                        {
                            (clic)
                                ? null
                                : <p className="card-text">Create a team.Hurry up!!!<span className="create_link" onClick={this.createTeam}>Create</span></p>
                        }
                    </div>
                    <div className="col-sm-4">
                        <div className="card profile-card">
                            <div className="card-img-block">
                                <img className="card-img-top" src="https://images.unsplash.com/photo-1517832207067-4db24a2ae47c" alt="Card image cap" />
                            </div>
                            <div className="card-body pt-0">
                                <h5 className="card-title">{userName}</h5>
                                <h5 className="card-title">{userEmail}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MyProfile;