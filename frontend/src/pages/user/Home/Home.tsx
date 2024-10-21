import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to the home page!</p>
            <Link to="/dashboard">Go to Dashboard</Link>
        </div>
    );
}
