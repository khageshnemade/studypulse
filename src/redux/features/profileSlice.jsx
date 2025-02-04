import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profileData: {},
    loading: false,
    error: null,
};

const profilSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        fetchProfileStart: (state) => {
            state.loading = true;
        },
        fetchProfileSuccess: (state, action) => {
            state.loading = false;
            state.profileData = action.payload;
        },
        fetchProfileFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateProfile: (state, action) => {
            state.profileData = { ...state.profileData, ...action.payload };
        },
    },
})

export const {
    fetchProfileStart,
    fetchProfileSuccess,
    fetchProfileFailure,
    updateProfile,
} = profilSlice.actions;

export default profilSlice.reducer;