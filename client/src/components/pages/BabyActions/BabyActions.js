import React from 'react'
import { Link } from "react-router-dom";
import Return from "../../Return/Return"

import "./BabyActions.css"

function BabyActions() {
    
    var babyInfo = JSON.parse(localStorage.getItem("babyClicked"));

    return (
        <div className="container">
            <h1 className="top-header">Say Hello to {babyInfo.baby_first_name} !</h1>
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
                <div className="BabyActionsBtnDiv">
                    <button className="btn-sm active baby-actions-view-btn"><Link to="/allRecords">View All Records</Link></button>
                    <button className="btn-sm active baby-actions-add-btn"><Link to="/addLog">Add a new Log</Link></button>
                </div>
            </div>
        <Return />
        </div>
    )
}

export default BabyActions
