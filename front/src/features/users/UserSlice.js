import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

export const getAllUsers = createAsyncThunk(
    'user/getAllUser',
    async (params, { rejectWithValue }) => {
        try {
            const response = await axios.get('/users/all', {
                params
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message || 'Getting all users failed');
        }
    }
);


const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default userSlice.reducer;
