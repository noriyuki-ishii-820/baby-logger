import React, {useState, useEffect} from 'react'
import ReactModal from 'react-modal';
import {deleteLog, getLogs, updateLog} from "../Functions/logFunctions"
 

function LogList(props) {
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
        setList(props.results)
    })

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

    function onSubmit(e){
       
        e.preventDefault();
        // console.log(e.target.attributes.getNamedItem("value").value)
        // const logId = e.target.attributes.getNamedItem("value").value;

        const logData = {
            date: editLog.date,
            time: editLog.time,
            logCategory: editLog.logCategory,
            notes: editLog.notes,
            _id: editLog._id,
        }

        console.log(logData)
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

    //columns fo the table
    const columns = ["Date", "Time", "Category", "notes","Actions"]

    //when loads, the log is displayed in the chronological order 
    const filteredList = list.sort((a,b) => (a.date > b.date) ? 1 : -1)

    //load the babyID from the localstorage to get the right set of data
    var thisBabyId = JSON.parse(localStorage.getItem("babyClicked"))._id
    
    return (
        <div>
            <table>
                 <thead>
                     <tr>
                        {columns.map((each, i) => {
                        return <th key={i}>{each}</th>
                        })}
                    </tr>
                </thead>

                <tbody>
                    {filteredList.map((each ,i) => {
                    
                     if (each.babyId === thisBabyId){
                           return <tr key={i}>
                                <td>{each.date}</td>
                                <td>{each.time}</td>
                                <td>{each.logCategory}</td>
                                <td>{each.notes}</td>
                                <td>
                                    <button value={each._id} onClick={(e) => openModal(e)} >Edit</button>
                                    <button value={each._id} onClick={(e) => handleDeleteLog(e)}>delete</button>
                                </td>
                            </tr>
                    }})}
                </tbody>

            </table>

            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
 
                <h2>Editing this Log:</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <label>Date</label>
                        <input value={editLog.date || ""} name ="date" onChange={updateEditLog}></input>
                        <br/>
                        <label>Time</label>
                        <input value={editLog.time || ""} name="time" onChange={updateEditLog}></input>
                        <br/>
                        <label>Category</label>
                        <input value={editLog.logCategory || ""} name="logCategory" onChange={updateEditLog} ></input>
                        <br/>
                        <label>Notes</label>
                        <input value={editLog.notes || ""} name="notes" onChange={updateEditLog}></input>
                    
                    <button value={editLog._id || ""} type='submit'>Edit this Log</button>
                    <button onClick={closeModal}>close</button>
                    </form>
            </ReactModal>

        
        </div>
    )
}

export default LogList
