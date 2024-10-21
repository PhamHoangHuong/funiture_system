import React from "react";
import { Link } from "react-router-dom";

export default function UserHeader() {
    return (
        <header>
            <h1>User Header</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                </ul>
            </nav>
        </header>
    );
}
