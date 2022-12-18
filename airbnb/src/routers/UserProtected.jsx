import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from "react-router-dom";

const UserProtected = ({children}) => {
    const { user } = useSelector(state => state.authSlice);

    const location = useLocation();

    if(!user){
        const url = `/login?redirectUrl=${location.pathname}`
        return <Navigate to={url} />
    }
  
    return children;
}

export default UserProtected;