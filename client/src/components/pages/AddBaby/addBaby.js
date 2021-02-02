import React, {Component} from 'react'
import Return from "../../Return/Return"
import DayPickerInput from 'react-day-picker/DayPickerInput';
import {addNewBaby } from "../../Functions/babyFunctions"

class addBaby extends Component {
    constructor(props) {
        super(props)

        this.state = {
            baby_first_name: "",
            baby_last_name: "",
            dob:undefined,
            gender: "boy",
            tagNumber: "",
            parentUserId: localStorage.getItem("userId"),
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.DateofBithChange = this.DateofBithChange.bind(this);
        this.onGenderChange = this.onGenderChange.bind(this);
    }

    //dob input from the calender
    DateofBithChange(day){
        this.setState({ dob  : day.toLocaleString()})
    }

    //gender input from options
    onGenderChange(event){
        this.setState({ gender: event.target.value})
    }

    //inputs of the rest of information
    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    //submit to Mongo
    onSubmit = (e) => {
        e.preventDefault();

        const babyData = {
            baby_first_name: this.state.baby_first_name,
            baby_last_name: this.state.baby_last_name,
            dob: this.state.dob,
            gender: this.state.gender,
            tagNumber: this.state.tagNumber,
            parentUserId: this.state.parentUserId,
        }

        addNewBaby(babyData)
    }


    render(){

    return (
        <div>
             <div className='container'>
                <div className='row'>
                    <div className='col-md-6 mt-5 mx-auto'>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className='form-group'>
                                <label htmlFor='baby_first_name'>First Name</label>
                                <input type='text'
                                    refs='baby_first_name'
                                    className='form-control'
                                    name='baby_first_name'
                                    placeholder='Enter First Name'
                                    value={this.state.baby_first_name}
                                    onChange={this.onChange}

                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='baby_last_name'>Last Name</label>
                                <input type='text'
                                    refs='baby_last_name'
                                    className='form-control'
                                    name='baby_last_name'
                                    placeholder='Enter Last Name'
                                    value={this.state.baby_last_name}
                                    onChange={this.onChange}
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
                                    value={this.state.dob} 
                                    onDayChange={this.DateofBithChange}
                                    dayPickerProps= {{
                                        todayButton: 'Today',
                                    }}
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='email'>Gender</label>
                                <select type='text'
                                    refs='gender'
                                    className='form-control'
                                    name='gender'
                                    placeholder='Enter Gender'
                                    value={this.state.gender}
                                    onChange={this.onGenderChange} 
                                >
                                    <option value="boy">Boy</option>
                                    <option value="girl">Girl</option>
                                    <option value="N/A">Prefer not to mention</option>
                                </select>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='password'>Tag Number(if relevant)</label>
                                <input type='number'
                                    refs='number'
                                    className='form-control'
                                    name='tagNumber'
                                    placeholder="Enter the baby's tag number"
                                    value={this.state.tagNumber}
                                    onChange={this.onChange}
                            
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
}}

export default addBaby