import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// State type
interface UserTokenState {
  token: string;
  user?: any | null; // Optional, যেহেতু তুমি `state.user = null` use করছো
}

// Initial state
const initialState: UserTokenState = {
  token: "",
  user: null,
};

// Slice
const userTokenAccessSlice = createSlice({
  name: "userAccessToken",
  initialState,
  reducers: {
    addUserAccessToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    removeUserAccessToken: (state) => {
      state.token = "";
      state.user = null;
    },
  },
});

// Export actions
export const { addUserAccessToken, removeUserAccessToken } =
  userTokenAccessSlice.actions;

// Export reducer
export default userTokenAccessSlice.reducer;
