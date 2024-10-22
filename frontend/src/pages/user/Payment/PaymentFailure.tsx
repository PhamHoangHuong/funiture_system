import React from 'react';
import { Link } from 'react-router-dom';

const PaymentFailure: React.FC = () => {
    return (
        <>
            <h1>Payment Failed</h1>
            <p>We're sorry, but there was an issue processing your payment.</p>
            <p>Please try again or contact customer support if the problem persists.</p>
            <Link to="/payment">Try Again</Link>
            <Link to="/">Return to Home</Link>
        </>
    );
};

export default PaymentFailure;

