import React from 'react';
import { Link } from 'react-router-dom';

const CartContent: React.FC = () => {


    return (
        <>
            <h1>Your Shopping Cart</h1>
            <Link to="/checkout">Checkout</Link>
        </>
    );
};


export default CartContent;
