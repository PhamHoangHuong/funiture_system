import React from "react";
import { Outlet } from "react-router-dom";
import UserHeader from "../../components/user/UserHeader";
import UserFooter from "../../components/user/UserFooter";

export default function UserLayout() {
    return (
        <>
            <UserHeader />
            <main>
                <Outlet />
            </main>
            <UserFooter />
        </>
    );
}