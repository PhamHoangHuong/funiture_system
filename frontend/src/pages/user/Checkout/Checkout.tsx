import React from 'react';
import { Link } from 'react-router-dom';

const Checkout: React.FC = () => {
    return (
        <>
            <h1>Checkout</h1>
            <Link to="/cart">Back to Cart</Link>
            <Link to="/payment">Proceed to Payment</Link>
        </>
    );
};

export default Checkout;
