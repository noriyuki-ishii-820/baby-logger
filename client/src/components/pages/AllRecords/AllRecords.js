import React, {Component} from 'react'
import { getLogs } from "../../Functions/logFunctions"
import LogList from "../../LogList/LogList"
import ReturnToBabyActions from '../../Return/ReturnToBabyActions'

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
            let values = item.date + item.time + item.logCategory;
            values = JSON.stringify(values).toLowerCase();
            return values.indexOf(this.state.search.toLowerCase()) !== -1
          })

        return (
            <div>
                <h1>All Records</h1>
                <div>
                   
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
                <ReturnToBabyActions />
            </div>
        )
}}

export default AllRecords
