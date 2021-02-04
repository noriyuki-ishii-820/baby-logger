import React, {Component} from 'react'
import Return from "../../Return/Return"
import DayPickerInput from 'react-day-picker/DayPickerInput';
import {addNewBaby } from "../../Functions/babyFunctions"
import {formatDate,parseDate,} from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';

class addBaby extends Component {
    constructor(props) {
        super(props)

        this.state = {
            baby_first_name: "",
            baby_last_name: "",
            dob:"",
            gender: "Boy",
            tagNumber: "",
            parentUserId: localStorage.getItem("userId"),
            error:false,
            added:false,
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.DateofBirthChange = this.DateofBirthChange.bind(this);
        this.onGenderChange = this.onGenderChange.bind(this);
    }

    // dob input from the calender
    DateofBirthChange(day){
        this.setState({ dob  : day })
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

        if(!babyData.baby_first_name || !babyData.baby_last_name || !babyData.dob){
            this.setState({error:true})
            return
        }

        addNewBaby(babyData).then(res => {
            this.setState({added:true})
        })
        
    }

    render(){

    return (
        <div>
             <div className='container'>
                 <h1>Adding a Baby</h1>
                <div className='row'>
                    <div className='col-md-6 mt-5 mx-auto'>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className='form-group'>
                                <label htmlFor='baby_first_name'>First Name <span>*Required</span></label>
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
                                <label htmlFor='baby_last_name'>Last Name <span>*Required</span></label>
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
                                <label htmlFor='email'>Date of Birth <span>*Required</span></label>
                                <br />
                                <DayPickerInput
                                format="M/D/YYYY"
                                formatDate={formatDate}
                                parseDate={parseDate} 
                                    refs='dob'
                                    className='form-control'
                                    name='dob'
                                    placeholder='Choose the birthday'
                                    value={this.state.dob} 
                                    onDayChange={this.DateofBirthChange}
                                    dayPickerProps= {{
                                        todayButton: 'Today',
                                    }}
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='email'>Gender <span>*Required</span></label>
                                <select type='text'
                                    refs='gender'
                                    className='form-control'
                                    name='gender'
                                    placeholder='Enter Gender'
                                    value={this.state.gender}
                                    onChange={this.onGenderChange} 
                                >
                                    <option value="Boy">Boy</option>
                                    <option value="Girl">Girl</option>
                                    <option value="N/A">Prefer not to mention</option>
                                </select>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='password'>Tag Number <span>*optional</span></label>
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
                        {this.state.error ? 
                            <div>
                            <h5>Error</h5>
                            <h6>please make sure all the required fields are filled.</h6>
                            </div> 
                            : 
                            null
                        }
                        {this.state.added ? 
                            <div>
                            <h5>Successfull Added!</h5>
                            <h6>You can now start adding information from the Dashboard.</h6>
                            </div> 
                            : 
                            null
                        }
                    </div>
                </div>
            </div>
            <Return />
        </div>
    )
}}

export default addBaby