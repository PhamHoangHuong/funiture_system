import React from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminFooter from '../../components/admin/AdminFooter';
import AdminMenu from '../../components/admin/AdminMenu';
import AdminActivity from '../../components/admin/AdminActivity';
import AdminSidebar from '../../components/admin/AdminSidebar';
// import AdminPageContent from '../../components/admin/AdminPageContent';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    return (
        <body>
            <div className="wrapper">
                <AdminHeader />
                <AdminActivity />
                <AdminSidebar />
                <AdminMenu />
                <div className="page-content">
                    {children}
                    <AdminFooter />
                </div>
            </div>
        </body>
    );
};

export default AdminLayout;