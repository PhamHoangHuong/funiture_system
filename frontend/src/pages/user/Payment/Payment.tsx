import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Payment: React.FC = () => {
    const navigate = useNavigate();

    const handlePayment = () => {
        // Giả lập xử lý thanh toán
        const isSuccessful = Math.random() < 0.5; // 50% cơ hội thành công
        if (isSuccessful) {
            navigate('/payment/success');
        } else {
            navigate('/payment/failure');
        }
    };

    return (
        <>
            <h1>Payment</h1>
            <p>Choose your payment method:</p>
            <ul>
                <li>Credit Card</li>
                <li>PayPal</li>
                <li>Bank Transfer</li>
            </ul>
            <Link to="/checkout">Back to Checkout</Link>
            <button onClick={handlePayment}>Complete Payment</button>
        </>
    );
};

export default Payment;
