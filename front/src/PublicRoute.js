// PublicRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsUserAuth } from './features/auth/AuthSlice';

const PublicRoute = ({ element: Element, ...rest }) => {
    const isAuthenticated = useSelector(selectIsUserAuth);
    const location = useLocation();

    return !isAuthenticated ? (
        <Element {...rest} /> // Render the component if not authenticated
    ) : (
        <Navigate to="/" state={{ from: location }} replace /> // Redirect authenticated users to home
    );
};

export default PublicRoute;
