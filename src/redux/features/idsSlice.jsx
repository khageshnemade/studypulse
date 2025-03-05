// src/features/idsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  classDetails: {
    chapter:null,
    classId: null,
    subjectId: null,
    chapterId: null,
    assignments:null,
    chapterName:null,
    subjectName:null,
  }
};

const idsSlice = createSlice({
  name: 'ids',
  initialState,
  reducers: {
    setClassDetails: (state, action) => {
      // Update the class details object with the action payload
      state.classDetails = { ...state.classDetails, ...action.payload };
    },
    resetClassDetails: (state) => {
      // Reset the class details to their initial state
      state.classDetails = {
        classId: null,
        subjectId: null,
        chapterId: null,
        assignments:null,
    chapterName:null,
    subjectName:null,
      };
    },
  },
});

// Export the actions
export const { setClassDetails, resetClassDetails } = idsSlice.actions;

// Export the reducer
export default idsSlice.reducer;
