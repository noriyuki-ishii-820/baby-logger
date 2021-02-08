import React from 'react'
import Footer from "../../Footer/Footer"
import { Link } from "react-router-dom";
import ReturnToBabyActions from '../../Return/ReturnToBabyActions';

import "./AddLog.css"

//this page is where the user picks what category of log he/she wishes to add.

function AddLog() {
    var babyInfo = JSON.parse(localStorage.getItem("babyClicked"));

    const category = ["Meal", "Nap", "Doctor's Appointment", "Vaccination"]

    function storeAction(each) {
        console.log(each)
        localStorage.removeItem("actionClicked")
        localStorage.setItem("actionClicked", each)
    }


    return (
        <div>
            <div className='container'>
                <h1 className="top-header">With {babyInfo.baby_first_name}, I would like to add...</h1>
                <div>
                    <ul className="AddLogBtn-List">
                        {category.map((each ,i) =>{
                            return <li key={i}>
                                        <button className="active">
                                            <Link to="/logData" onClick={() => storeAction(each)}>{each}</Link>
                                        </button>
                                    </li>
                        })}
                    </ul>
                </div>
                <ReturnToBabyActions />
            </div>
            <Footer />
        </div>
    )
}

export default AddLog
