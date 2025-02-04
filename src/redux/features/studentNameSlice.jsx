import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    studentName: ''
}

const studentNameSlice = createSlice({
    name: 'studentName',
    initialState,
    reducers: {
        setStudentName: (state, action) => {
            state.studentName = action.payload
        }
    }
})

export const { setStudentName } = studentNameSlice.actions;

export default studentNameSlice.reducer;