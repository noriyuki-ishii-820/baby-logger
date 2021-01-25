import React, { Component } from 'react';
import Login from "./components/Login/login"
export default function(ComposedComponent) {
  class Authentication extends Component {
    render() {
        if (localStorage.getItem('usertoken')) {
            return <ComposedComponent {...this.props} />

        } else {
            return <Login />
        }
    }
  }


  return Authentication;
}