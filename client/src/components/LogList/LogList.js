import React, {useState, useEffect} from 'react'
import {deleteLog} from "../Functions/logFunctions"

import Return from "../Return/Return"
 
function LogList(props) {
    const [list, setList] = useState([])
    console.log(props.results)
    
    useEffect(() => {
        setList(props.results)
    })

    function handleDeleteLog(event) {
        alert("Are you sure to delete this log?")
        let logId = event.target.attributes.getNamedItem("value").value
       
        deleteLog(logId).then(data => {
            console.log(data)
        })
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
                                <td><button>Edit</button><button value={each._id} onClick={(e) => handleDeleteLog(e)}>delete</button></td>
                            </tr>
                    }})}
                </tbody>

            </table>



            <Return />
        </div>
    )
}

export default LogList
