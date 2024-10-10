import React from 'react';

interface AdminButtonProps {
    label: string;
    onClick: () => void;
}

const AdminButton: React.FC<AdminButtonProps> = ({ label, onClick }) => {
    return (
        <button onClick={onClick}>{label}</button>
    );
};

export default AdminButton;
