import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authAPI from '../services/authAPi';


const initialState = {
    user : JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error : null,
}

export const logIn = createAsyncThunk(
    "auth/logIn",
    async (value) => {
        try {
            const user = await authAPI.logIn(value);
            localStorage.setItem("user", JSON.stringify(user));
            return user;
        } catch (error) {
            throw error;
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state,action) => {
            localStorage.removeItem("user");
            return {...state, user: null};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(logIn.pending, (state, action) => {
            return {...state, loading: true}
        });
        builder.addCase(logIn.fulfilled, (state,action) => {
            return {...state, loading: false, user: action.payload}
        });
        builder.addCase(logIn.rejected, (state,action) => {
            return {...state, loading: false, error: action.error.message}
        })
    }
})

export const { logout } = authSlice.actions

export default authSlice.reducer;