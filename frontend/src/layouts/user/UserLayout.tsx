import React from "react";
import UserHeader from "../../components/user/UserHeader";


interface Props {
    children: React.ReactNode;
}
export default function UserLayout({ children }: Props) {
    return (
        <>
            <UserHeader />
            <main>{children}</main>
        </>
    );
}
