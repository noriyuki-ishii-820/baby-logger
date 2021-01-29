import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Register/register";
import Login from "./components/Login/login";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import Profile from "./components/Profile/profile";
import AddBaby from "./components/pages/AddBaby/addBaby";
import BabyActions from "./components/pages/BabyActions/BabyActions";
import addLog from "./components/pages/AddLog/AddLog";
import LogData from "./components/pages/LogData/LogData";
import allRecords from "./components/pages/AllRecords/AllRecords"

import "./App.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from './Auth';

class App extends Component {
    render() {
        return (
                <Router>
                    <div className="container-fluid pl-0 pr-0 m-0">
                        <Navbar />
                        <Route exact path="/" component={Login} />
                        <div className='container-fluid m-0 p-0'>
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/profile" component={Profile} />
                            <Route exact path="/dashboard" component={Auth(Dashboard)} />
                            <Route exact path="/addBaby" component={AddBaby} />
                            <Route exact path="/babyActions" component={BabyActions} />
                            <Route exact path="/addLog" component={addLog} />
                            <Route exact path="/LogData" component={LogData} />
                            <Route exact path="/allRecords" component={allRecords} />
                        </div>
                    </div>
                </Router>
        );
    }
}
export default App;
