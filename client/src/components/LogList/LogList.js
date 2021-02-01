import React from 'react'
import Return from "../Return/Return"
 
function LogList(props) {
    console.log(props.results)
    
    const columns = ["Date", "Time", "logCategory", "Actions"]
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
                    {props.results.map((each ,i) => {
                     if (each.babyId === thisBabyId){
                           return <tr key={i}>
                                <td>{each.date}</td>
                                <td>{each.time}</td>
                                <td>{each.logCategory}</td>
                                <td><button>Edit</button><button>delete</button></td>
                            </tr>
                    }})}
                </tbody>

            </table>



            <Return />
        </div>
    )
}

export default LogList
