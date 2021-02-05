import React, {Component} from 'react'
import ReturnToBabyActions from "../../Return/ReturnToBabyActions"
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';
import { TimePicker } from 'antd';
import { addLog } from "../../Functions/logFunctions"
import 'antd/dist/antd.css';

import "./LogData.css"

//this page is where the user inputs the necessary information for logging a new record.

class LogData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: "",
            time: "00:00",
            logCategory: localStorage.getItem("actionClicked"),
            notes: "",
            babyId:JSON.parse(localStorage.getItem("babyClicked"))._id,
            parentUserId: JSON.parse(localStorage.getItem("babyClicked")).parentUserId,
            //fileAttached: ""
            error:false,
            success:false,
        }
        this.setDate = this.setDate.bind(this);
        this.setTime = this.setTime.bind(this);
        this.setNotes = this.setNotes.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    setDate(day){
        let date = day.toLocaleString().split(",")
        this.setState({ date : date[0]})
    }

    setTime(time, timeString){
        this.setState({time:timeString})
    }

    setNotes(e){
        this.setState({notes:e.target.value})
    }

    onSubmit =(e) => {
        e.preventDefault();

        const logData = {
            date: this.state.date,
            time: this.state.time,
            logCategory: this.state.logCategory,
            notes: this.state.notes,
            babyId: this.state.babyId,
            parentUserId:this.state.parentUserId
        }

        if (!logData.date){
            this.setState({error:true})
            return
        }

        addLog(logData).then(value => {
            this.setState({success:true})
        })
        
    }

    render(){

        const format = 'HH:mm';

        var actionInfo = (localStorage.getItem("actionClicked"));
        var babyName = JSON.parse(localStorage.getItem("babyClicked")).baby_first_name
        return (
        <div>
            <h1 className="top-header">I would like to add a {actionInfo} for {babyName}:</h1>

            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 mt-5 mx-auto'>
                        <form onSubmit={this.onSubmit}>
                            <div className='form-group'>
                                    <label htmlFor='text'>Date <span className="required">*Required</span></label>
                                    <br />
                                    <DayPickerInput
                                        refs='date'
                                        className='form-control'
                                        name='date'
                                        placeholder='Enter the date of this event'
                                        value={this.state.date} 
                                        onDayChange={this.setDate}
                                        dayPickerProps= {{
                                            todayButton: 'Today',
                                        }}
                                    />
                            </div>
                            <div className='form-group'>
                                    <label htmlFor='text'>Time <span>*Optional / default would be "00:00" </span></label>
                                    <br />

                                    <TimePicker 
                                        defaultValue={moment("00:00", format)} 
                                        //value={this.state.time} 
                                        onChange={this.setTime}
                                        format={format} 
                                    />
                            </div>

                            <div className='form-group'>
                                    <label htmlFor='text'>Notes <span>*Optional</span></label>
                                    <br />
                                    <textarea
                                        refs='notes'
                                        className='form-control'
                                        id="LogDataNoteInput"
                                        name='notes'
                                        placeholder='Enter any notes (e.g. any important things to remember, location, name of the doctor, reference numbers, extra information, future references, etc.)'
                                        value={this.state.notes} 
                                        onChange={this.setNotes}
                                        
                                    />
                            </div>

                            
                            <div>
                                <h4>add file uploads if time allows</h4>
                            </div>
                            <div className="submitBtnDiv">
                            <button type='submit' className="btn-sm active">Submit!</button>
                            </div>
                        </form>
                    
                        {this.state.error ? 
                         <div>
                             <h5>Error!</h5>
                             <h6>Please make sure the required field (Date) is filled.</h6>
                        </div>
                        :
                        null
                        }
                        {this.state.success ? 
                         <div>
                             <h5>Success!</h5>
                             <h6>The log has been successfull saved!</h6>
                        </div>
                        :
                        null
                        }

                    </div>
                </div>
            </div>

            <ReturnToBabyActions />
        </div>
    )
    }
}

export default LogData
