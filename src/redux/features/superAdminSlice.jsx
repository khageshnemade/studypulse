// src/features/idsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  superAdminDetails: {
    districtId: null,
    talukaId: null,
    cityId: null,
    orgId: null,
    classId:null,
    class:null,
  }
};

const superAdminSlice = createSlice({
  name: 'superAdmin',
  initialState,
  reducers: {
    setSuperAdminDetails: (state, action) => {
      console.log('Updating superAdminDetails with payload:', action.payload); // optional for debugging
      state.superAdminDetails = { ...state.superAdminDetails, ...action.payload };
    },
    resetSuperAdminDetails: (state) => {
      state.superAdminDetails = {
        districtId: null,
        talukaId: null,
        cityId: null,
        orgId: null,
        classId:null,
        class:null,
      };
    },
  },
});

export const { setSuperAdminDetails, resetSuperAdminDetails } = superAdminSlice.actions;

export default superAdminSlice.reducer;
