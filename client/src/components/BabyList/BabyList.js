import React from 'react'

function BabyList(props) {
    console.log(props)

    var currentId = localStorage.getItem("userId")
    return (
        <div>

            <p>current Id: {currentId}</p>
            <ul>
            {props.results.map((each ,i) => {
                if (each.parentUserId === currentId){
                return <li key={i}>{each.baby_first_name} {each.parentUserId}</li>
                }
            })}
            </ul>
        </div>
    )
}

export default BabyList
