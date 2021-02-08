import React, {useState, useEffect} from 'react'
import ReactModal from 'react-modal';
import {deleteLog, getLogs, updateLog} from "../Functions/logFunctions"
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { TimePicker } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
import "./LogList.css"

function LogList(props) {
    const format = 'HH:mm';
    const [list, setList] = useState([]);
    const [modalIsOpen,setIsOpen] = React.useState(false);
    const [editLog, setEditLog] = React.useState([
        {
        babyId: "",
        date: "",
        logCategory: "",
        notes: "",
        parentUserId: "",
        time: "",
        _id: ""
        }
    ]);
    
    useEffect(() => {
        return setList(props.results)
    },[props.results])

    //load the babyID from the localstorage to get the right set of data
    var thisBabyId = JSON.parse(localStorage.getItem("babyClicked"))._id

    // Modal handling
    function openModal(event) {
        setIsOpen(true);
        let logId = event.target.attributes.getNamedItem("value").value;
        getLogs().then(data => {
            data.map((each) => {
                if (each._id === logId)
                    setEditLog(each)
            })})
    }

    function closeModal(){
        setIsOpen(false);
      }

    // edit handling 

    function updateEditLog(event){
        setEditLog({...editLog, [event.target.name] : event.target.value });
    }

    function setTime(time, timeString){
        console.log(timeString)
        setEditLog({...editLog, time:timeString})
    }

    function setDate(day){
        let date = day.toLocaleString().split(",")
        setEditLog({...editLog, date : date[0]})
    }

    // edit log info
    function onSubmit(e){
        e.preventDefault();
        const logData = {
            date: editLog.date,
            time: editLog.time,
            logCategory: editLog.logCategory,
            notes: editLog.notes,
            _id: editLog._id,
        }
        updateLog(logData)
        window.location.reload(); 
    }

    // handle the delete button
    function handleDeleteLog(event) {
        alert("Are you sure to delete this log?")
        let logId = event.target.attributes.getNamedItem("value").value
        deleteLog(logId)
        window.location.reload(); 
    }

    //array for table and editing
    const columns = ["Date", "Time", "Category", "Notes","Actions"]
    const category = ["Meal", "Nap", "Doctor's Appointment", "Vaccination"]

    //sorts the list in chronological order 
    const sortedList = list.sort((a,b) => (a.date > b.date) ? 1 : -1)

    //filter in the babies with the user's ID
    const filteredList = sortedList.filter(each => each.babyId === thisBabyId)
    
    return (
        <div>
            <table className="table LogList">
                 <thead>
                     <tr>
                        {columns.map((each, i) => {
                        return <th key={i}>{each}</th>
                        })}
                    </tr>
                </thead>

                <tbody>
                    {filteredList.length === 0 ?
                        <tr><td colSpan="5" className="noDataAvailable"> No data available </td></tr>
                    :
                    filteredList.map((each ,i) => {
                    
                           return <tr key={i}>
                                <td>{each.date}</td>
                                <td>{each.time}</td>
                                <td>{each.logCategory}</td>
                                <td>{each.notes}</td>
                                <td className="logList-Actions">
                                    <button value={each._id} onClick={(e) => openModal(e)} className="edit-btn btn-sm active">Edit</button>
                                    <button value={each._id} onClick={(e) => handleDeleteLog(e)} className="delete-btn btn-sm active">delete</button>
                                </td>
                            </tr>
                    })}
                </tbody>

            </table>

            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
            >
 
                <h2>Editing this Log:</h2>
                <form onSubmit={(e) => onSubmit(e)}>
                    <label>Date</label>
                         <DayPickerInput
                            refs='date'
                            className='form-control'
                            name='date'
                            placeholder='Enter the date of this event'
                            value={editLog.date} 
                            onDayChange={setDate}
                        />
                    <br/>
                    <label>Time</label>
                        <TimePicker 
                            value={moment("'" + editLog.time + "'", format)} 
                            onChange={setTime}
                            format={format} 
                        />
                    <br/> 
                    <label htmlFor="logCategory">Category</label>
                    <select value ={editLog.logCategory} name="logCategory" onChange={updateEditLog}>
                        {category.map((each, i) => {
                            return <option value={each} key={i}>{each}</option>
                        })}
                    </select>
                    <br/>
                    <label>Notes</label>
                    <textarea className="LogEditNotesInput" value={editLog.notes || ""} name="notes" onChange={updateEditLog} />
                    <br />
                    <button value={editLog._id || ""} type='submit' className="edit-btn btn-sm active">Edit this Log</button>
                    <button onClick={closeModal} className="delete-btn btn-sm active">close</button>
                </form>
            </ReactModal>

        
        </div>
    )
}

export default LogList
