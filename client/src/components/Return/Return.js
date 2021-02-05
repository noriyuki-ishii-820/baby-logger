import React from 'react'
import { Link } from "react-router-dom";

import "./Return.css"


function Return() {
    return (
        <div className="return">
            <Link to="/dashboard">
                <button className="btn-sm active">Return</button>
            </Link>
        </div>
    )
}

export default Return
