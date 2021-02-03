import React from 'react'
import { Link } from "react-router-dom";
import Return from "../../Return/Return"

function BabyActions() {
    
    var babyInfo = JSON.parse(localStorage.getItem("babyClicked"));

    return (
        <div>
            <h1>Say Hello to {babyInfo.baby_first_name} !</h1>
            <h3>Baby Information</h3>
                    <ul>
                        <li>First Name: {babyInfo.baby_first_name}</li>
                        <li>Last Name: {babyInfo.baby_last_name}</li>
                        <li>Date of Birth: {babyInfo.dob.slice(0,10)}</li>
                        <li>Gender: {babyInfo.gender}</li>
                        <li>Tag Number: {babyInfo.tagNumber ? babyInfo.tagNumber : "N/A"}</li>
                    </ul>
            <div>
            <h3>Actions</h3>
                <button><Link to="/allRecords">View All Records</Link></button>
                <button><Link to="/addLog">Add a new Log</Link></button>
            </div>
        <Return />
        </div>
    )
}

export default BabyActions
