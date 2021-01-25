import React from 'react'
import { Link } from "react-router-dom";

function Return() {
    return (
        <div>
            <Link to="/dashboard">
                <button>Return</button>
            </Link>
        </div>
    )
}

export default Return
