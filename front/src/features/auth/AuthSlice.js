import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post('/users', userData);
            localStorage.setItem('authToken', response.data.token); // save token to local storage temporary dev
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message || 'Registration failed');
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post('/users/login', userData);
            localStorage.setItem('authToken', response.data.token); // save token to local storage temporary dev
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message || 'Registration failed');
        }
    }
);

export const me = createAsyncThunk(
    'auth/me',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.get('/users', {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('authToken')
                }
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message || 'Registration failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: null,
        token: localStorage.getItem('authToken') || null,
    },
    reducers: {
        logout(state) {
            state.token = null;
            localStorage.removeItem('authToken');
        },
        login(state, action) {
            state.token = action.payload;
            localStorage.setItem('authToken', action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(me.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(me.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(me.rejected, (state, action) => {
                state.loading = false;
                state.token = null;
                localStorage.setItem('authToken', null);
                state.error = null;
            })
    },
});

export const selectIsUserAuth = (state) => !!state.auth.token; // check if user is authenticated
export const { logout, login } = authSlice.actions;

export default authSlice.reducer;
