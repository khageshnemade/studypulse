import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    studentsData: []
}
const studentSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        setStudent: (state, action) => {
            state.studentsData = action.payload;
        }
    }
})
export const { setStudent } = studentSlice.actions;
export default studentSlice.reducer;

        