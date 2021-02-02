import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";


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
    const columns = ["Name", "Date of Birth", "Gender", "Tag Number" ]

    
    
    return (
        <div>

            <table>
                <thead>
                    <tr>
                        {columns.map((each, i) => {
                            return <th key={i}>{each}</th>
                        })}
                    </tr>
                </thead>
            </table>

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
                            
                                  </tr>
                        
                    })}
                </tbody>                        
        </div>
    )
}

export default BabyList