import React, { Component } from 'react';
import { getService } from "../../Utils/restApi";
import SingleInput from "../../Utils/singleInput/singleInput";
import Select from "../../Utils/select/select";
import { Button } from "../../Utils/shared/dependencies";

class ManagePlayers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playersData: [],
            rolesData: [],
            countriesData: [],
            name: '',
            sel_country: '',
            sel_role: '',
            age: '',
            rating: '',
            searchName: ''
        }
    }

    componentDidMount() {
        this.getAllRoles();
        this.getAllCountries();
        this.getAllPlayers();
    }

    getAllPlayers = async () => {
        const getUsers = {
            method: 'GET',
            url: 'http://localhost:8000/api/players'
        };
        const response = await getService(getUsers);
        if (response && response.status === 200) {
            this.setState({ playersData: response.data.playersList });
        } else {

        }
    }

    getAllRoles = async () => {
        const getUsers = {
            method: 'GET',
            url: 'http://localhost:8000/api/roles'
        };
        const response = await getService(getUsers);
        if (response && response.status === 200) {
            this.setState({ rolesData: response.data.rolesList });
        } else {

        }
    }

    getAllCountries = async () => {
        const getUsers = {
            method: 'GET',
            url: 'http://localhost:8000/api/countries'
        };
        const response = await getService(getUsers);
        if (response && response.status === 200) {
            this.setState({ countriesData: response.data.countriesList });
        } else {

        }
    }

    handleChange = (e) => {
        if (e.target.name === 'country') {
            this.setState({ sel_country: e.target.value });
        } else if (e.target.name === 'role') {
            this.setState({ sel_role: e.target.value });
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    // filterPlayers = (e) => {
    //     this.setState({ searchName: e.target.value });
    //     const tempArray = [...this.state.playersData];
    //     this.setState({
    //         playersData: tempArray.filter(function (player) {
    //             return player.name == e.target.value;
    //         })
    //     })
    // }

    addPlayer = async () => {
        const { name, age, rating, sel_country, sel_role } = this.state;
        if (rating >= 6 && rating <= 11) {
            const player = {
                method: 'POST',
                url: 'http://localhost:8000/api/players',
                data: {
                    name: name,
                    countryName: sel_country,
                    age: +age,
                    role: sel_role,
                    rating: +rating,
                }
            };
            const response = await getService(player);
            if (response && response.status === 200) {
                this.setState({
                    name: '',
                    sel_country: '',
                    sel_role: '',
                    age: '',
                    rating: ''
                })
                this.getAllPlayers();
            } else {
                console.log(response.data);
            }
        } else {
            alert("please enter valid rating");
        }
    }

    render() {
        const { playersData, rolesData, countriesData, name, age, rating, sel_country, sel_role, searchName } = this.state;
        console.log(playersData);
        return (
            <div className="content profile" >
                <div className="row">
                    <div className="col-sm-7">
                        <div className="p-l-50 p-r-50 m-l-30 m-l-30">
                            <SingleInput
                                type={'text'}
                                placeholder={'Search Player . . . . .'}
                                name={'searchName'}
                                content={searchName}
                                controlFunc={this.filterPlayers} />
                        </div>
                        <table id="usertable">
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <th>Country</th>
                                    <th>Role</th>
                                    <th>Rating</th>
                                </tr>
                                {
                                    (playersData && playersData.length)
                                        ? playersData.map((player, index) => {
                                            return <tr key={index}>
                                                <td>{player.name}</td>
                                                <td>{player.countryName}</td>
                                                <td>{player.role}</td>
                                                <td>{player.rating}</td>
                                                {/* <td>
                                                    <span className="create_link" onClick={() => this.deleteUser(user)}>Delete</span>
                                                    <span className="create_link" onClick={() => this.showUpdate(user)}>Update</span>
                                                </td> */}
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
                        <div className="wrap-login70 p-l-50 p-r-50 p-t-50 p-b-50 m-l-30 m-l-30">
                            <span className="login100-form-title p-b-10">Add Player</span>
                            <SingleInput
                                title={'Name'}
                                type={'text'}
                                placeholder={'Enter name...'}
                                name={'name'}
                                content={name}
                                controlFunc={this.handleChange} />
                            <SingleInput
                                title={'Age'}
                                type={'text'}
                                placeholder={'Enter age...'}
                                name={'age'}
                                content={age}
                                controlFunc={this.handleChange} />
                            <Select
                                title={'Country'}
                                placeholder={'--select--'}
                                name={'country'}
                                selectedOption={sel_country}
                                options={countriesData}
                                controlFunc={this.handleChange} />
                            <Select
                                title={'Role'}
                                placeholder={'--select--'}
                                name={'role'}
                                selectedOption={sel_role}
                                options={rolesData}
                                controlFunc={this.handleChange} />
                            <SingleInput
                                title={'Rating'}
                                type={'text'}
                                placeholder={'player rating... [ 6 - 11 ]'}
                                name={'rating'}
                                content={rating}
                                controlFunc={this.handleChange} />
                            <div className="container-login100-form-btn p-l-60">
                                <Button name={'Submit'} controlFunc={this.addPlayer} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ManagePlayers;