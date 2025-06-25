import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orgId: null,
  orgName: null,
};

const orgSlice = createSlice({
  name: 'org',
  initialState,
  reducers: {
    setOrgData: (state, action) => {
      const { orgId, orgName } = action.payload;
      state.orgId = orgId;
      state.orgName = orgName;
    },
    // Optional: individual setters if needed
    setOrgId: (state, action) => {
      state.orgId = action.payload;
    },
    setOrgName: (state, action) => {
      state.orgName = action.payload;
    },
  },
});

export const { setOrgData, setOrgId, setOrgName } = orgSlice.actions;
export default orgSlice.reducer;
