import React, {Component} from 'react'
import { getLogs } from "../../Functions/logFunctions"
import LogList from "../../LogList/LogList"

class AllRecords extends Component {
    constructor() {
        super()
        this.state = {
            logs:[""],
            search:"",
        }
    }

    componentDidMount() {
        getLogs().then(data => {
            this.setState ({
                logs: data
            })
        })
    }

    handleInputChange = event => {
        this.setState({search: event.target.value})
    }

    render(){

        const babyInfo = JSON.parse(localStorage.getItem("babyClicked"));

        const sortedList = this.state.logs.filter((item) => {
            let values = item.date + item.time + item.logCategory;
            values = JSON.stringify(values).toLowerCase();
            return values.indexOf(this.state.search.toLowerCase()) !== -1
          })

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
                    <input 
                        className="form-control" 
                        type="text"
                        placeholder="Default input" 
                        value={this.state.search}
                        onChange={this.handleInputChange}
                    
                    />
                    <LogList results={sortedList}/>    
                </div>
            </div>
        )
}}

export default AllRecords
