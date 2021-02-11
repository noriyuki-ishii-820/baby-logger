import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getToken} from "../Functions/resetPasswordFunctions"
import { getUsers} from "../Functions/userFunctions"
import Footer from "./../Footer/Footer"

// this is where the user actually resets the password;

function ResetPasswordPage() {
    const { token } = useParams();
    const [user, setUser] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        update: false,
        isLoading: true,
        error: false,
        token: "",
    })

    useEffect(()=> {
       getToken(token).then(data => {
           const userToken = data.data
           getUsers().then(data => {
               const verifyToken = data.filter(each => each.resetPasswordToken === userToken)
               console.log(verifyToken.length)
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
            confirmPassword: user.confirmPassword
        }

        console.log(userData)

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
        <Footer />
        </div>
    )
}

export default ResetPasswordPage
