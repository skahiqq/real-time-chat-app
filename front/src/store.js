// src/app/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/AuthSlice';
import userReducer from './features/users/UserSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer,
    },
});

export default store;
