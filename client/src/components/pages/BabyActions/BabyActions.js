import React from 'react'
import Return from "../../Return/Return"

function BabyActions() {

    var babyInfo = JSON.parse(localStorage.getItem("babyClicked"));
    console.log(babyInfo)

    return (
        <div>
            <h1>With {babyInfo.baby_first_name}, I would like to...</h1>
            <div>
                <button>View All Records</button>
                <button>Add a new Log</button>
            </div>

            <Return />
        </div>
    )
}

export default BabyActions
