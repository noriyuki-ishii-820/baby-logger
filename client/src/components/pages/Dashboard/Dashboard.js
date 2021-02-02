import React, { Component } from "react";
import jwt_decode from 'jwt-decode';
import { Link } from "react-router-dom";
import BabyList from "../../../components/BabyList/BabyList"

import { getUserId, getBabyList } from "../../Functions/babyFunctions"


class DashBoard extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            babyset: [""],
        }
    }

    componentDidMount() {
        localStorage.removeItem("actionClicked")
        localStorage.removeItem('babyClicked');
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        this.setState({
            first_name: decoded.first_name,
            last_name: decoded.last_name,
            email: decoded.email
        })
        getUserId(decoded.email);
       
        
        getBabyList().then(data => {
            this.setState ({
                babyset: data
            })
        })
    }
    
    render() {

        const filteredBabyList = this.state.babyset

        return (
            <div className="container-fluid pl-0">
             
                    <div>
                        <h1>
                             Welcome { this.state.first_name } { this.state.last_name }
                        </h1>
                        <div>
                            <h3>Choose a Baby...</h3>
                            <BabyList results={filteredBabyList} />
                        </div>

                        <Link to="/addBaby">
                            <button>Add New Baby</button>
                        </Link>
                    </div>
            </div>
        );
    } 
}

export default DashBoard;