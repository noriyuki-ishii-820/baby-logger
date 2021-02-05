import React, {Component} from 'react'
import { Link } from "react-router-dom";
import { getLogs } from "../../Functions/logFunctions"
import LogList from "../../LogList/LogList"
import ReturnToBabyActions from '../../Return/ReturnToBabyActions'

import "./AllRecords.css"

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

        const sortedList = this.state.logs.filter((item) => {
            let values = item.date + item.time + item.logCategory + item.notes;
            values = JSON.stringify(values).toLowerCase();
            return values.indexOf(this.state.search.toLowerCase()) !== -1
          })

        return (
            <div>
                <h1 className="top-header">All Records</h1>
                <div className="AllRecordsSearchBtn">
                    <input 
                        className="form-control" 
                        id="searchBar"
                        type="text"
                        placeholder="Search by date, time, category or notes." 
                        value={this.state.search}
                        onChange={this.handleInputChange}
                    />
                    <button className="btn-sm"><Link to="/addLog">Add New</Link></button>
                </div>
                <div>
                    <LogList results={sortedList}/>    
                </div>
                <ReturnToBabyActions />
            </div>
        )
}}

export default AllRecords
