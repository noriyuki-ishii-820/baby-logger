import React, { Component } from "react";
import { loginUser } from '../Functions/userFunctions';
import DisplayImage from "./displayImage"
import "./css/login.css"

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            login:true,
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        loginUser(user).then(res => {
            if(res) {
                this.props.history.push('/dashboard');
            }
            else {
                this.setState({ login : false });
                // alert("Incorrect email or password")
                // console.log("Incorrect email or password");
            }
        })
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 mt-5 mx-auto'>
                        <form noValidate onSubmit={ this.onSubmit }>
                            <div className="pleaseSignIn">
                                <h1 className='h3 mb-3 font-weight normal'>Welcome to Baby Logger!</h1>
                                <h1 className='h3 mb-3 font-weight normal'>Please Log in</h1>
                            </div>
                            <DisplayImage />
                            {this.state.login ? null :
                            <div className="ErrorDiv">
                                <h5>Error: please check the following:</h5>
                                <h6>- Incorrect email or password.</h6>
                                <h6>- The account does not exist.</h6>
                            </div>
                            }
                            <div className='form-group'>
                                <label htmlFor='email'>Email Address</label>
                                <input type='email'
                                className='form-control'
                                name='email'
                                placeholder='Enter Email'
                                value={ this.state.email }
                                onChange={ this.onChange }
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='password'>Password</label>
                                <input type='password'
                                className='form-control'
                                name='password'
                                placeholder='Enter Password'
                                value={ this.state.password }
                                onChange={ this.onChange }
                                />
                            </div>
                            <button type='submit' className='btn btn-lg btn-primary btn-block'>
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;