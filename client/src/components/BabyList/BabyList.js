import React from 'react'
import { Link } from "react-router-dom";
import "./BabyList.css"
import { deleteBaby } from "../Functions/babyFunctions"


function BabyList(props) {
    //get the ID of the current user in the local storage
    var currentId = localStorage.getItem("userId")

    //filter the list of baby with this user's ID
    const thisUserBaby = props.results.filter(result => result.parentUserId === currentId);

    //store the baby's ID in the local storage
    function storeBaby(each) {
        localStorage.removeItem("babyClicked")
        localStorage.setItem("babyClicked", JSON.stringify(each))
    }

    //column for the baby table
    const columns = ["Name", "Date of Birth (YYYY-MM-DD)", "Gender", "Tag Number", "Actions" ]

    //delete baby info
    function handleDeleteLog(event) {
        alert("Are you sure to delete this log?")
        let logId = event.target.attributes.getNamedItem("value").value
        console.log(logId)
        deleteBaby(logId)
        window.location.reload(); 
    }
    
    return (
        <div>

            <table className="table babyList">
            
                <thead>
                    <tr>
                        {columns.map((each, i) => {
                            return <th className="tableHead" key={i}>{each}</th>
                        })}
                    </tr>
                </thead>
            

                <tbody>
                    {thisUserBaby.map((each, i) => {
                           return <tr key={i}>
                                    <td>
                                        <Link to="/babyActions" 
                                              onClick={() => storeBaby(each)}>
                                            {each.baby_first_name} {each.baby_last_name}
                                        </Link>
                                    </td>
                            
                                    <td>{each.dob.toLocaleString().slice(0,10)}</td>
                                    <td>{each.gender}</td>
                                    <td>{each.tagNumber}</td>
                                    <td>
                                        <button>Edit</button>
                                        <button value={each._id} onClick={(e) => handleDeleteLog(e)}>Delete</button>
                                    </td>
                            
                                  </tr>
                        
                    })}
                </tbody>     
            </table>                   
        </div>
    )
}

export default BabyList