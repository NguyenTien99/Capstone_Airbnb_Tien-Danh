import { configureStore } from '@reduxjs/toolkit';
import locationSlice from './slices/locationSlice';
import authSlice from './slices/authSlice';
const store = configureStore({
    reducer: {
        locationSlice,
        authSlice,
    }
})

export default store