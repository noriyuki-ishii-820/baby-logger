import React from 'react'
import Return from "../../Return/Return"
import { Link } from "react-router-dom";

function BabyActions() {

    var babyInfo = JSON.parse(localStorage.getItem("babyClicked"));

    return (
        <div>
            <h1>With {babyInfo.baby_first_name}, I would like to...</h1>
            <div>
                <button>View All Records</button>
                <button><Link to="/addLog">Add a new Log</Link></button>
            </div>

            <Return />
        </div>
    )
}

export default BabyActions
