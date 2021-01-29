import React, {Component} from 'react'
import { getLogs } from "../../Functions/logFunctions"
import LogList from "../../LogList/LogList"

class AllRecords extends Component {
    constructor() {
        super()
        this.state = {
            logs:[""]
        }
    }

    componentDidMount() {
        getLogs().then(data => {
            this.setState ({
                logs: data
            })
        })
    }

    render(){

        const babyInfo = JSON.parse(localStorage.getItem("babyClicked"));
        const logList = this.state.logs

        return (
            <div>
                <h1>All Records</h1>
                <div>
                    <h3>Baby Information</h3>
                    <ul>
                        <li>First Name: {babyInfo.baby_first_name}</li>
                        <li>Last Name: {babyInfo.baby_last_name}</li>
                        <li>Date of Birth: {babyInfo.dob.slice(0,10)}</li>
                        <li>Gender: {babyInfo.gender}</li>
                        <li>Tag Number: {babyInfo.tagNumber ? babyInfo.tagNumber : "N/A"}</li>
                    </ul>
                    <h3>Records</h3>
                    <LogList results={logList}/>    
                </div>
            </div>
        )
}}

export default AllRecords
