import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    paymentData: null,  // Store payment data here
};

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        setPaymentData: (state, action) => {
            state.paymentData = action.payload;  // Store payment data
        },
        clearPaymentData: (state) => {
            state.paymentData = null;  // Clear payment data
        },
    },
});

export const { setPaymentData, clearPaymentData } = paymentSlice.actions;
export default paymentSlice.reducer;
