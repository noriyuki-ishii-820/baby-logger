import React from 'react'
import Return from "../Return/Return"

function LogList(props) {
    console.log(props.results)
    
    var thisBabyId = JSON.parse(localStorage.getItem("babyClicked"))._id
    console.log(thisBabyId)

    return (
        <div>
            <ul>
            {props.results.map((each,i) => {
                if (each.babyId === thisBabyId){
                 return <li key={i}>{each.date} {each.logCategory}</li>
            }})}
            </ul>

            <Return />
        </div>
    )
}

export default LogList
