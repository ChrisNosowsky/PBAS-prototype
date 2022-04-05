import React from 'react'
import { Link } from 'react-router-dom';

function Error() {
    document.body.style.backgroundColor = "#fff";
    return (
        <div>
            <div className="container">
                <div className="col-md-12">
                    <div className="row mt-5">
                        <h1>Error. Could not find the webpage you were looking for!</h1>
                        <p>Return to prototype <Link to="/PBAS/Prototype">here.</Link></p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Error
