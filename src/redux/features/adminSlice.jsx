// src/features/idsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  adminDetails: {
    classId: null,
    subjectId: null,
    isPassed: false,
    page:null,
    passedStatus:null,
    isp:false
  }
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminDetails: (state, action) => {
      // Update the class details object with the action payload
      state.adminDetails = { ...state.adminDetails, ...action.payload };
    },
    resetAdminDetails: (state) => {
      // Reset the class details to their initial state
      state.adminDetails = {
        classId: null,
        subjectId: null,
        isPassed: false,
        passedStatus:null,
        page:null,
        isp:false
      };
    },
  },
});

// Export the actions
export const { setAdminDetails, resetAdminDetails } = adminSlice.actions;

// Export the reducer
export default adminSlice.reducer;
