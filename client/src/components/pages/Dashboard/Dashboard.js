import React, { Component } from "react";
import jwt_decode from 'jwt-decode';
import { Link } from "react-router-dom";

class DashBoard extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        }
    }

    componentDidMount() {
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        this.setState({
            first_name: decoded.first_name,
            last_name: decoded.last_name,
            email: decoded.email
        })
    }
    
    render() {
        return (
            <div className="container-fluid pl-0">
             
                    <div>
                        <h1>
                             Welcome { this.state.first_name } { this.state.last_name }
                        </h1>
                        <div>
                            <h3>Choose Baby...</h3>
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