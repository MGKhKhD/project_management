import React, { useState, useContext, useEffect } from 'react';
import AdminContext from './AdminContext';
import AuthContext from './AuthContex';

const AdminProvider = (props) => {
    const auth = useContext(AuthContext);
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        const role = localStorage.getItem('role');
        if (auth.authenticated && role && role === 'admin') {
            setAdmin(true);
        } else {
            setAdmin(false);
        }
    },[auth, admin]);


    return (
        <AdminContext.Provider value={
            {admin: admin}
        }>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminProvider;