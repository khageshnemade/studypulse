import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orgId: null
}

const orgSlice = createSlice({
    name: 'org',
    initialState,
    reducers: {
        setOrgId: (state, action) => {
            state.orgId = action.payload;
        }
    }
})

export const { setOrgId } = orgSlice.actions;
export default orgSlice.reducer;