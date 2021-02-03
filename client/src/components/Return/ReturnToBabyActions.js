import React from 'react'
import { Link } from "react-router-dom";

function ReturnToBabyActions() {
    return (
        <div>
            <Link to="/BabyActions">
                <button>Return</button>
            </Link>
        </div>
    )
}

export default ReturnToBabyActions
