import React, { Component } from 'react';
import { getService } from "../../Utils/restApi";
import { Button } from "../../Utils/shared/dependencies";
class ManageAccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: []
        }
    }

    componentDidMount() {
        this.getAllUsers();
    }

    getAllUsers = async () => {
        const getUsers = {
            method: 'GET',
            url: 'http://localhost:8000/api/users'
        };
        const response = await getService(getUsers);
        if (response && response.status === 200) {
            const tempArray = response.data.userData.filter(item => { return item.isAdmin === false });
            this.setState({ userList: tempArray });
        } else {

        }
    }

    giveAdminAccess = async (user) => {
        const alertResult = window.confirm(`Are you sure want to give admin access to ${user.email}`);
        if (alertResult) {
            const adminAccess = {
                method: 'POST',
                url: 'http://localhost:8000/api/users/adminAccess',
                data: {
                    email: user.email
                }
            };
            const response = await getService(adminAccess);
            if (response && response.status === 200) {
                console.log(response.data);
                this.getAllUsers();
            } else {

            }
        } else {

        }
    }

    render() {
        const { userList } = this.state;
        return (
            <div className="content profile" >
                <div className="row">
                    <div className="col-sm-12">
                        <div className="row">
                            {
                                (userList.length)
                                    ? userList.map((user, index) => {
                                        return <div className="card profile-card col-sm-3 m-l-20 m-b-30" key={index}>
                                            <div className="card-img-block">
                                                <img className="card-img-top" src="https://images.unsplash.com/photo-1517832207067-4db24a2ae47c" alt="Card image cap" />
                                            </div>
                                            <div className="card-body p-t-0">
                                                <h5 className="card-title">{user.name}</h5>
                                                <h5 className="card-title">{user.email}</h5>
                                            </div>
                                            <div className="container-login100-form-btn p-l-50 p-b-50">
                                                <Button name={'Give Admin Access'} controlFunc={()=>this.giveAdminAccess(user)} />
                                            </div>
                                        </div>
                                    })
                                    : <p>No Users</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ManageAccess;