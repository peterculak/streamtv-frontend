import React from 'react';
import {Link} from 'react-router-dom';

const Error404 = () => (
    <div className="page-error-container">
        <div className="page-error-content">
            <div className="error-code mb-4">404</div>
            <h2 className="text-center fw-regular title">
                Page not found
            </h2>
            <p className="text-center">
                <Link className="btn btn-primary" to="/">Home</Link>
            </p>
        </div>
    </div>
);

export default Error404;
