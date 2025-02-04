import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    studentId : null
}

const studentIdSlice = createSlice({
    name : 'student',
    initialState,
    reducers : {
        setStudentId : (state, action) => {
            state.studentId = action.payload
        }
    }
})

export const { setStudentId} = studentIdSlice.actions;

export default studentIdSlice.reducer;