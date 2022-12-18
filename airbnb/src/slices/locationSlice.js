import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import locationAPI from '../services/locationAPI';

const initialState = {
    locations : [],
    loading : false,
    error : null,
}

export const getlocations = createAsyncThunk(
    "getlocations",
    async (value) => {
        try {
            const locations = await locationAPI.getLocation();
            return locations;
        } catch (error) {
            throw error;
        }
    }
)


const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getlocations.pending, (state,action) => {
            return {...state, loading: true};
        });
        builder.addCase(getlocations.fulfilled, (state,action) => {
            return {...state, loading: false, locations: action.payload};
        });
        builder.addCase(getlocations.rejected, (state,action) => {
            return {...state, loading: false, error: action.error.message};
        });
    }
})


export default locationSlice.reducer;

