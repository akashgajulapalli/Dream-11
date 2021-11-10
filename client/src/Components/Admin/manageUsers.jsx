import React, { Component } from 'react';
import { getService } from "../../Utils/restApi";
import SingleInput from "../../Utils/singleInput/singleInput";
import { Button, MessageField } from "../../Utils/shared/dependencies";
class ManageUsers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersData: [],
            name: '',
            email: '',
            selectedUser: {},
            showForm: false,
            message: ''
        }
    }

    componentDidMount() {
        this.getAllUsers();
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleAction = (user, e) => {
        this.setState({ message: '' });
        let tempArray = [...this.state.usersData];
        tempArray.forEach(item => {
            if (item.email === user.email) {
                item.checked = e.target.checked
            } else {
                item.checked = false
            }
        })
        if (user.checked) {
            this.setState({
                usersData: tempArray,
                selectedUser: user,
                name: user.name,
                email: user.email
            });
        } else {
            this.setState({
                usersData: tempArray,
                selectedUser: {},
                name: '',
                email: ''
            });
        }

    }

    getAllUsers = async () => {
        const getUsers = {
            method: 'GET',
            url: 'http://localhost:8000/api/users'
        };
        const response = await getService(getUsers);
        if (response && response.status === 200) {
            response.data.userData.forEach(item => {
                item.checked = false
            });
            this.setState({ usersData: response.data.userData });
        } else {

        }
    }

    deleteUser = async (user) => {
        const deleteUser = {
            method: 'DELETE',
            url: `http://localhost:8000/api/users/${user.email}`
        };
        const response = await getService(deleteUser);
        if (response && response.status === 200) {
            this.setState({ selectedUser: {}, message: response.data.message });
            this.getAllUsers();
        } else {

        }
    }

    updateUser = async () => {
        const updateUserDetails = {
            method: 'PUT',
            url: `http://localhost:8000/api/users`,
            data: {
                name: this.state.name,
                email: this.state.email
            }
        };
        const response = await getService(updateUserDetails);
        if (response && response.status === 200) {
            this.setState({ selectedUser: {}, message: response.data.message });
            this.getAllUsers();
        } else {

        }
    }

    render() {
        const { usersData, selectedUser, name, email, message } = this.state;
        return (
            <div className="content profile">
                {
                    (message.length > 0)
                        ? <div className="m-l-30">
                            <MessageField text={message} />
                        </div>
                        : null
                }
                <div className="row">
                    <div className="col-sm-7">
                        <table id="usertable">
                            <tbody>
                                <tr>
                                    <th></th>
                                    <th>Username</th>
                                    <th>Email</th>
                                </tr>
                                {
                                    (usersData && usersData.length)
                                        ? usersData.map((user, index) => {
                                            return <tr key={index}>
                                                <td className="contact100-form-checkbox">
                                                    <input
                                                        className="input-checkbox100"
                                                        id={index}
                                                        type="checkbox"
                                                        name="ckbox"
                                                        checked={user.checked}
                                                        onChange={this.handleAction.bind(this, user)} />
                                                    <label className="label-checkbox100 ckbox" htmlFor={index}></label>
                                                </td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                            </tr>
                                        })
                                        : <tr>
                                            <td colSpan="3" style={{ textAlign: "center" }}>No users</td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="col-sm-4">
                        {
                            (Object.keys(selectedUser).length)
                                ? <div className="wrap-login70 p-l-50 p-r-50 p-t-50 p-b-50 m-l-30">
                                    <span className="login100-form-title p-b-20">Edit User</span>
                                    <SingleInput
                                        title={'Username'}
                                        type={'text'}
                                        placeholder={'Enter Name...'}
                                        name={'name'}
                                        content={name}
                                        controlFunc={this.handleChange} />
                                    <SingleInput
                                        title={'Email  [Editing Disabled]'}
                                        type={'email'}
                                        placeholder={'Email address...'}
                                        name={'email'}
                                        disabled={true}
                                        content={email}
                                        controlFunc={this.handleChange} />
                                    <div className="container-login100-form-btn p-l-60">
                                        <Button name={'Submit'} controlFunc={this.updateUser} />
                                    </div>
                                    <div className="container-login100-form-btn p-t-20 p-l-60">
                                        <Button name={'Delete User'} controlFunc={() => this.deleteUser(selectedUser)} />
                                    </div>
                                </div>
                                : null
                        }
                    </div>
                </div>
            </div >
        );
    }
}

export default ManageUsers;