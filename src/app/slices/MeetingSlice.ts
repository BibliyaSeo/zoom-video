import { createSlice } from "@reduxjs/toolkit";
import { ToastType } from "../../utils/types";

interface MeetingInitialState {
  toasts: Array<ToastType>;
}

const initialState: MeetingInitialState = {
  toasts: [],
};

export const meetingSlice = createSlice({
  name: "meetings",
  initialState,
  reducers: {
    setToasts: (state, action) => {
      state.toasts = action.payload;
    },
  },
});

export const { setToasts } = meetingSlice.actions;
