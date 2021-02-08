import React from 'react'
import { Link } from "react-router-dom";

import "./Return.css"

function ReturnToBabyActions() {
    return (
        <div className="return">
            <Link to="/BabyActions">
                <button className="btn-sm active">Return</button>
            </Link>
        </div>
    )
}

export default ReturnToBabyActions
