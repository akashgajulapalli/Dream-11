import React, { Component } from 'react';
import { getService } from "../../Utils/restApi";

class ManageTeams extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teamsData: []
        }
    }

    componentDidMount() {
        this.getAllTeams();
    }

    getAllTeams = async () => {
        const getTeams = {
            method: 'GET',
            url: 'http://localhost:8000/api/iplTeams'
        };
        const response = await getService(getTeams);
        if (response && response.status === 200) {
            this.setState({ teamsData: response.data.teamDetails });
        } else {

        }
    }

    render() {
        const { teamsData } = this.state;
        return (
            <div className="content profile">
                <div className="row">

                </div>
            </div>
        );
    }
}

export default ManageTeams;