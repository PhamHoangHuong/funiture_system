import React from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccess: React.FC = () => {
    return (
        <>
            <h1>Payment Successful!</h1>
            <p>Thank you for your purchase. Your order has been processed successfully.</p>
            <p>Order number: #12345</p>
            <Link to="/">Return to Home</Link>
        </>
    );
};

export default PaymentSuccess;
