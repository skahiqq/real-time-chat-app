// ProtectedRoute.js
import React from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsUserAuth } from './features/auth/AuthSlice';

const ProtectedRoute = ({ element: Element, ...rest }) => {
    const isAuthenticated = useSelector(selectIsUserAuth);
    const location = useLocation();
    console.log('PrivateRoute: isAuthenticated', isAuthenticated);

    return isAuthenticated ? (
        <Element {...rest} />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default ProtectedRoute;
