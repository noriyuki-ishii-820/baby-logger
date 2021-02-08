import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import ReactModal from 'react-modal';
import "./BabyList.css"
import { deleteBaby, getBabyList, updateBaby } from "../Functions/babyFunctions"
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import {formatDate,parseDate,} from 'react-day-picker/moment';

function BabyList(props) {
    const [list, setList] = useState([]);
    const [modalIsOpen,setIsOpen] = useState(false);
    const [editError, setEditError] = useState(false);
    const [editBaby, setEditBaby] = useState([
        {
            baby_first_name: "",
            baby_last_name: "",
            dob: "",
            gender: "",
            tagNumber: "",
            parentUserId: "",
            _id:""
        }
    ])

    //get the ID of the current user in the local storage
    var currentId = localStorage.getItem("userId")

    //filter the list of baby with this user's ID upon load
    useEffect(() => {
        const thisUserBaby = props.results.filter(result => result.parentUserId === currentId);
        return setList(thisUserBaby)
    },[props.results])


    //store the baby's ID in the local storage
    function storeBaby(each) {
        localStorage.removeItem("babyClicked")
        localStorage.setItem("babyClicked", JSON.stringify(each))
    }

    //column for the baby table
    const columns = ["Name", "Date of Birth (D-M-Y)", "Gender", "Tag Number", "Actions" ]

    //delete baby info
    function handleDelete(event) {
        if(!window.confirm("Are you sure to delete this log?")){
           return false 
        }
        let babyId = event.target.attributes.getNamedItem("value").value
        deleteBaby(babyId)
        window.location.reload(); 
    }

    // modal handling for editing baby info
    function openModal(event) {
        setIsOpen(true);
        let babyId = event.target.attributes.getNamedItem("value").value;
        getBabyList().then(data => {
            data.map((each) => {
                if (each._id === babyId)
                    setEditBaby(each)
            })})
        }

    function closeModal(){
        setIsOpen(false);
    }

    // edit handling 
     function updateBabyInfo(event){
        setEditBaby({... editBaby, [event.target.name] : event.target.value });
        console.log(editBaby)
    }

    //date handling
    function DateofBirthChange(day){
        let dayFormatted = day.toLocaleString().slice(0,10)
        console.log(dayFormatted)
        setEditBaby({... editBaby, dob : dayFormatted});

    }

    //submit baby info
    function onSubmit(e){
        e.preventDefault();
      
        const babyData = {
            baby_first_name: editBaby.baby_first_name,
            baby_last_name: editBaby.baby_last_name,
            dob: editBaby.dob,
            gender: editBaby.gender,
            tagNumber: editBaby.tagNumber,
            _id: editBaby._id
        }

        if (!babyData.baby_first_name || !babyData.baby_last_name || !babyData.dob || !babyData.dob){
            setEditError(true)
            return false
        }
        updateBaby(babyData)
        alert("Success!")
        window.location.reload(); 
    }

    return (
        <div>

            <table className="table babyList">
            
                <thead>
                    <tr>
                        {columns.map((each, i) => {
                            return <th className="tableHead" key={i}>{each}</th>
                        })}
                    </tr>
                </thead>
        
                <tbody>
                    {list.map((each, i) => {
                           return <tr key={i}>
                                    <td>
                                        <Link to="/babyActions" 
                                              onClick={() => storeBaby(each)}>
                                            {each.baby_first_name} {each.baby_last_name}
                                        </Link>
                                    </td>
                            
                                    <td>{each.dob.toLocaleString().slice(0,10)}</td>
                                    <td>{each.gender}</td>
                                    <td>{each.tagNumber}</td>
                                    <td className="babyList-actions">
                                        <button value={each._id} onClick={(e) => openModal(e)} className="edit-btn btn-sm active">edit</button>
                                        <button value={each._id} onClick={(e) => handleDelete(e)} className="delete-btn btn-sm active">delete</button>
                                       
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
 
                <h2>Editing this Baby:</h2>
         
                <form onSubmit={(e) => onSubmit(e)}>
                    <label>First Name   </label>
                    <input value={editBaby.baby_first_name || ""} name ="baby_first_name" onChange={updateBabyInfo}></input>
                    <br/>
                    <label>Last Name</label>
                    <input value={editBaby.baby_last_name || ""} name="baby_last_name" onChange={updateBabyInfo}></input>
                    <br/>
                    <label>Date of Birth</label>                    
                    <DayPickerInput
                        format="M/D/YYYY"
                        formatDate={formatDate}
                        parseDate={parseDate} 
                            refs='dob'
                            className='form-control'
                            name='dob'
                            placeholder='Choose the birthday'
                            value={editBaby.dob} 
                            onDayChange={DateofBirthChange}
                            dayPickerProps= {{
                                todayButton: 'Today',
                            }}
                     />
                    <br/>
                    <label htmlFor="gender">Gender</label>
                    <select value={editBaby.gender} name="gender" onChange={updateBabyInfo}>
                        <option value="Boy">Boy</option>
                        <option value="Girl">Girl</option>
                        <option value="N/A">Prefer not to say</option>
                    </select>
                    <br/>
                    <label>Tag Number</label>
                    <input value={editBaby.tagNumber|| ""} name="tagNumber" onChange={updateBabyInfo}></input>
                    <br />
                    <button value={editBaby._id || ""} type='submit' className="edit-btn btn-sm active">Submit</button>
                    <button onClick={closeModal} className="delete-btn btn-sm active">close</button>
                </form>
                {editError ? 
                <div className="ErrorDiv babyListErrorMsg">
                    <h5>Error: please check that all fields are fulfilled  (Tag Number is optional)</h5>
                </div>
                :
                null }
            </ReactModal>
        </div>
    )
}

export default BabyList