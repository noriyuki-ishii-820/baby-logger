import React from 'react'
import Return from "../../Return/Return"
import { Link } from "react-router-dom";

//this page is where the user picks what category of log he/she wishes to add.

function AddLog() {
    var babyInfo = JSON.parse(localStorage.getItem("babyClicked"));

    const category = ["Meal", "Nap", "Doctor's Appointment", "Vaccination"]

    function storeAction(each) {
        localStorage.removeItem("actionClicked")
        localStorage.setItem("actionClicked", JSON.stringify(each))
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


         <Return />
        </div>
    )
}

export default AddLog
