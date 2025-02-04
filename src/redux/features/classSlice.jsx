import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    classData: []
}
const classSlice = createSlice({
    name: 'class',
    initialState,
    reducers: {
        setClassess: (state, action) => {
            state.classData = action.payload;
        }
    }
})
export const { setClassess } = classSlice.actions;
export default classSlice.reducer;

        