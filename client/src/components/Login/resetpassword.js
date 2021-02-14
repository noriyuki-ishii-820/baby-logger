// this is the page where the user requests the password reset email

import React, {useState} from 'react';
import Footer from "../Footer/Footer";
//import { Link } from "react-router-dom";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { getUsers } from '../Functions/userFunctions';
import { sendEmail } from "../Functions/resetPasswordFunctions"


function ResetPassword() {
    const [email, setEmail] = useState("");

    function onChange(e){  
        setEmail({email: e.target.value})
    }

    function onSubmit(e){
        e.preventDefault();

        if (!email){
            NotificationManager.warning('Email address is empty!', 'please try again.', 3000);
            return false
        }

        getUsers().then(data => {
            const user = data.filter(result => result.email === email.email)
            if (!user || user.length === 0){
                NotificationManager.warning('The email address does not exist.', 'please try again.', 3000);
            } else {
                sendEmail(user[0])
                NotificationManager.info('Success!', 'Reset email has been sent!');
            }
        })

    }

    return (
        <div>
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 mt-5 mx-auto loginSignUpDiv'>
                    <form noValidate onSubmit={onSubmit}>
                        <div className="pleaseSignIn">
                            <h1 className='h3 mb-3 font-weight normal'>Reset password</h1>
                        </div>
            
                       <p>We will send you a reset link on the following email :</p>
                        <div className='form-group'>
                            <label htmlFor='email'>Email Address</label>
                            <input type='email'
                            className='form-control'
                            name='email'
                            placeholder='Enter Email'
                            onChange={(e) => onChange(e)}
                            />
                        </div>
                    
                        <button type='submit' className='btn btn-lg btn-primary btn-block'>
                            Send Reset Link
                        </button>

                    </form>
                </div>
            </div>
         
        </div>
        <NotificationContainer />
        <Footer />
        </div>
    )
}

export default ResetPassword
