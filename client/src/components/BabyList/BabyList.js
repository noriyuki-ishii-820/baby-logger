import React from 'react'
import { Link } from "react-router-dom";


function BabyList(props) {

    function storeBaby(each) {
        localStorage.removeItem("babyClicked")
        localStorage.setItem("babyClicked", JSON.stringify(each))
    }

    var currentId = localStorage.getItem("userId")
    return (
        <div>

            <p>current Id: {currentId}</p>
            <ul>
            {props.results.map((each ,i) => {
                if (each.parentUserId === currentId){
                return <li key={i} value={each}>
                            <Link 
                                to="/babyActions" 
                                onClick={() => storeBaby(each)}
                            >
                                {each.baby_first_name}
                            </Link> 
                            {each.parentUserId}
                        </li>
                }
            })}
            </ul>
        </div>
    )
}

export default BabyList