import React, {useState} from 'react'
import Return from "../../Return/Return"
import DayPickerInput from 'react-day-picker/DayPickerInput';

function addBaby() {
    //const [dob, setDob] = useState([]);
    // const [baby, setBaby] = useState([
    //     {
    //     first_name: "",
    //     last_name: "",
    //     dob: "",
    //     tagNumber: "",
    //     parentUserId: "",
    //     }
    // ])

    const onSubmit = (e) => {
        e.preventDefault();
        console.log({ [e.target.name]: e.target.value });
    }


    return (
        <div>
             <div className='container'>
                <div className='row'>
                    <div className='col-md-6 mt-5 mx-auto'>
                        <form noValidate onSubmit={onSubmit}>
                            <div className='form-group'>
                                <label htmlFor='first_name'>First Name</label>
                                <input type='text'
                                    refs='first_name'
                                    className='form-control'
                                    name='first_name'
                                    placeholder='Enter First Name'
                                    //value={this.state.first_name}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='last_name'>Last Name</label>
                                <input type='text'
                                    refs='last_name'
                                    className='form-control'
                                    name='last_name'
                                    placeholder='Enter Last Name'
                                    //value={this.state.last_name}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='email'>Date of Birth</label>
                                <br />
                                <DayPickerInput
                                    refs='dob'
                                    className='form-control'
                                    name='dob'
                                    placeholder='Choose the birthday'
                                    //value={this.state.email}            
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='email'>Gender</label>
                                <input type='text'
                                    refs='gender'
                                    className='form-control'
                                    name='gender'
                                    placeholder='Enter Email'
                                    //value={this.state.email}
                    
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='password'>Tag Number(if relevant)</label>
                                <input type='number'
                                    refs='number'
                                    className='form-control'
                                    name='tagNumber'
                                    placeholder="Enter the baby's tag number"
                                    //value={this.state.password}
                            
                                />
                            </div>
                            <button type='submit' className='btn btn-lg btn-primary btn-block'>
                                Add
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Return />
        </div>
    )
}

export default addBaby