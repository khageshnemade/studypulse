// src/features/teacher/teacherSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentTeacher: null, // Initialize currentTeacher as null or an empty object
};

const teacherSlice = createSlice({
  name: 'currentTeacher',
  initialState,
  reducers: {
    setCurrentTeacher: (state, action) => {
      state.currentTeacher = action.payload;
    },
    clearCurrentTeacher: (state) => {
      state.currentTeacher = null;
    },
  },
});

export const { setCurrentTeacher, clearCurrentTeacher } = teacherSlice.actions;

export default teacherSlice.reducer;