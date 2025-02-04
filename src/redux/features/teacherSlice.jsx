import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    teachersData: []
}

const teacherSlice = createSlice({
    name: 'teachers',
    initialState,
    reducers: {
        setTeacher: (state, action) => {
            state.teachersData = action.payload;
        }
    }
})

export const { setTeacher } = teacherSlice.actions;
export default teacherSlice.reducer;