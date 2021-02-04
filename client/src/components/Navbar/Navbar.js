import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./navbar.css";

class Navbar extends Component {
    logOut(e) {
        e.preventDefault();
        localStorage.removeItem('usertoken');
        localStorage.removeItem('userId');
        localStorage.removeItem('babyClicked');
        this.props.history.push('/');
    }
    render() {
        const loginRegLink = (
            <ul className='navbar-nav list-group '>
                <li className="nav-item">
                    <Link className='btn btn-sm active mr-1 mb-1' to='/login'>
                        Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className='btn btn-sm active' to='/register'>
                        Register
                    </Link>
                </li>
            </ul>
        )
        const userLink = (
            <ul className=' navbar-nav list-group'>　
                <li className="nav-item">
                    <Link className='btn btn-sm active mr-1 mb-1' to='/dashboard'>
                        Dashboard
                    </Link>
                </li>
                <li className="nav-item">
                    <button className="btn btn-sm active" id="logoutBtn" data-toggle="modal" data-target="#logoutModal" onClick={this.logOut.bind(this)}>
                        <div>Logout</div>
                    </button>
                </li>
            </ul>
        )
        return (
            <nav className='navbar navbar-light navbar-expand-lg'>
               <div className="container-fluid">
                    <div className="appName">
                        <span className="material-icons">child_care</span>
                        <h1>Baby Logger</h1>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                         <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    <div className='collapse navbar-collapse justify-content-end' id="navbarSupportedContent">
                        {localStorage.usertoken ? userLink : loginRegLink}
                    </div>
                </div>
            </nav>
        )
    }
}

export default withRouter(Navbar);