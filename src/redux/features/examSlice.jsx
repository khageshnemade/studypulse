import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    examId: null
}

const examSlice = createSlice({
    name: 'exam',
    initialState,
    reducers: {
        setExamId: (state, action) => {
            state.examId = action.payload;
        }
    }
})

export const { setExamId } = examSlice.actions;
export default examSlice.reducer;