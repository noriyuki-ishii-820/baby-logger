import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {deleteLog, getLogs} from "../Functions/logFunctions"

import Return from "../Return/Return"
 
function LogList(props) {
    const [list, setList] = useState([]);
    const [modalIsOpen,setIsOpen] = React.useState(false);
    const [editLog, setEditLog] = React.useState([]);
    
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
                    console.log(each)
                    setEditLog(each)
            })})
    }

    function closeModal(){
        setIsOpen(false);
      }

    // handle the delete button

    function handleDeleteLog(event) {
        alert("Are you sure to delete this log?")
        let logId = event.target.attributes.getNamedItem("value").value
        deleteLog(logId)
        window.location.reload(); 
    }

    //columns fo the table
    const columns = ["Date", "Time", "logCategory", "Actions"]

    //when loads, the log is displayed in the chronological order 
    const filteredList = list.sort((a,b) => (a.date > b.date) ? 1 : -1)

    //load the babyID from the localstorage to get the right set of data
    var thisBabyId = JSON.parse(localStorage.getItem("babyClicked"))._id
    
    return (
        <div>
            <table striped>
                 <thead>
                     {columns.map((each, i) => {
                       return <th key={i}>{each}</th>
                    })}
                </thead>

                <tbody>
                    {filteredList.map((each ,i) => {
                    
                     if (each.babyId === thisBabyId){
                           return <tr key={i}>
                                <td>{each.date}</td>
                                <td>{each.time}</td>
                                <td>{each.logCategory}</td>
                                <td>
                                    <button value={each._id} onClick={(e) => openModal(e)} >Edit</button>
                                    <button value={each._id} onClick={(e) => handleDeleteLog(e)}>delete</button>
                                </td>
                            </tr>
                    }})}
                </tbody>

            </table>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >
 
                <h2>Editing this Log:</h2>
                    <form>
                        <label>Date</label>
                        <input value={editLog.date}></input>
                        <br/>
                        <label>Time</label>
                        <input value={editLog.time}></input>
                        <br/>
                        <label>Category</label>
                        <input value={editLog.logCategory}></input>
                        <br/>
                        <label>Notes</label>
                        <input value={editLog.notes}></input>
                    </form>
                    <button>Re-Submit</button>
                    <button onClick={closeModal}>close</button>
            </Modal>

            <Return />
        </div>
    )
}

export default LogList
