import React, {Component} from 'react'
import Return from "../../Return/Return"
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';
import { TimePicker } from 'antd';
import { addLog } from "../../Functions/logFunctions"
import 'antd/dist/antd.css';

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
            parentUserId: JSON.parse(localStorage.getItem("babyClicked")).parentUserId
            //fileAttached: ""
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

        console.log(logData)

        addLog(logData).then(data => {
            console.log(data)
        })
    }

    render(){

        const format = 'HH:mm';

        var actionInfo = JSON.parse(localStorage.getItem("actionClicked"));
    
        return (
        <div>
            <h1>I would like to add a {actionInfo} :</h1>

            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 mt-5 mx-auto'>
                        <form onSubmit={this.onSubmit}>
                            <div className='form-group'>
                                    <label htmlFor='text'>Date</label>
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
                                    <label htmlFor='text'>Time</label>
                                    <h6>default would be "00:00"</h6>
                                    <br />

                                    <TimePicker 
                                        defaultValue={moment("00:00", format)} 
                                        //value={this.state.time} 
                                        onChange={this.setTime}
                                        format={format} />;
                            </div>

                            <div className='form-group'>
                                    <label htmlFor='text'>Notes</label>
                                    <br />
                                    <input
                                        refs='notes'
                                        //className='form-control'
                                        name='notes'
                                        placeholder='Enter any notes (e.g. reference numbers, extra information, future references, etc.)'
                                        value={this.state.notes} 
                                        onChange={this.setNotes}
                                        
                                    />
                            </div>

                            
                            <div>
                                <h4>add file uploads if time allows</h4>
                            </div>

                            <button type='submit'>Submit!</button>
                        </form>



                    </div>
                </div>
            </div>

            <Return />
        </div>
    )
    }
}

export default LogData
