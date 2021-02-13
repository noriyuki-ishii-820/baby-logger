import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getToken} from "../Functions/resetPasswordFunctions"
import { getUsers, updateUser} from "../Functions/userFunctions"
import Footer from "./../Footer/Footer"
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


// this is where the user actually resets the password;

function ResetPasswordPage() {
    const { token } = useParams();
    const [user, setUser] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        update: false,

    })

    useEffect(()=> {
        console.log(token)
       getToken(token).then(data => {
           const userToken = data.data
           getUsers().then(data => {
               console.log(data)
               const verifyToken = data.filter(each => each.resetPasswordToken === userToken)
               if(verifyToken.length === 0){
                   alert("verification was not successful. please try again")
               } else if (verifyToken.length === 1) {
                   setUser({update:true})
               }
         })
       })
    },[])

    function onSubmit(e){
        e.preventDefault();

        const userData = {
            email: user.email,
            password: user.password,
        }

        if (!user.email || !user.password || !user.confirmPassword){
            NotificationManager.warning('Fields are empty or invalid input', 'please try again.', 3000);
            return false
        }

        if (user.password !== user.confirmPassword){
            NotificationManager.warning('Passwords are not the same.', 'please try again.', 3000);
            return false
        }

        if (user.password.length < 6){
            NotificationManager.warning('Password needs to be more than 6 characters.', 'please try again.', 3000);
            return false
        }

        // email
        const inputEmail = user.email;
        const emailRegex = /^\w+([\.-]?\w+)*@[a-z]+([\.-]?[a-z]+)*(\.[a-z]{2,4})+$/;
        const emailResult = emailRegex.test(inputEmail);
        if (!emailResult) {
            NotificationManager.warning('Email is not in the right format.', 'please try again.', 3000);
            return false
        }
        else {}

        updateUser(userData).then(res => {
        if(res) {
            NotificationManager.info("Success! Please log-in.");
        }
        else {
            NotificationManager.warning('Please try again.', 'Error: Something went wrong!', 3000);
        }})
 
    }

    function onChange(e){
        setUser({... user, [e.target.name]: e.target.value });
    }

    return (
        <div>
        <div className='container'>
            <div className='row'>
                {user.update ? 
                <div className='col-md-6 mt-5 mx-auto loginSignUpDiv'>
                    <form noValidate onSubmit={onSubmit}>
                        <div className="pleaseSignIn">
                            <h1 className='h3 mb-3 font-weight normal'>Reset Your Password</h1>
                        </div>
            
                       <p>For validation, enter your details</p>
                        <div className='form-group'>
                            <label htmlFor='email'>Email Address</label>
                            <input type='email'
                            className='form-control'
                            name='email'
                            placeholder='Enter Email'
                            onChange={(e) => onChange(e)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='email'>New Password</label>
                            <input type='password'
                            className='form-control'
                            name='password'
                            placeholder='Enter Email'
                            onChange={(e) => onChange(e)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='email'>Confirm new Password</label>
                            <input type='password'
                            className='form-control'
                            name='confirmPassword'
                            placeholder='Re-enter Email'
                            onChange={(e) => onChange(e)}
                            />
                        </div>
                    
                        <button type='submit' className='btn btn-lg btn-primary btn-block'>
                            Reset
                        </button>

                    </form>
                </div>
                :
                <div>
                    <h6>Loading. If the loading is more than 5 seconds, the verification has failed. Please try again. </h6>
                </div>    
                    }
            </div>
         
        </div>
        <NotificationContainer />
        <Footer />
        </div>
    )
}

export default ResetPasswordPage
