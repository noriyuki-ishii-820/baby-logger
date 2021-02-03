import React from 'react'
import { Link } from "react-router-dom";
import ReturnToBabyActions from '../../Return/ReturnToBabyActions';

//this page is where the user picks what category of log he/she wishes to add.

function AddLog() {
    var babyInfo = JSON.parse(localStorage.getItem("babyClicked"));

    const category = ["Meal", "Nap", "Doctor's Appointment", "Vaccination"]

    function storeAction(each) {
        localStorage.removeItem("actionClicked")
        console.log(each)
        localStorage.setItem("actionClicked", each)
    }


    return (
        <div>
        <h1>With {babyInfo.baby_first_name}, I would like to add...</h1>
        <div>
            <ul>
                {category.map((each ,i) =>{
                    return <li key={i}><button><Link to="/logData" onClick={() => storeAction(each)}>{each}</Link></button></li>
                })}
           </ul>
        </div>


         <ReturnToBabyActions />
        </div>
    )
}

export default AddLog
