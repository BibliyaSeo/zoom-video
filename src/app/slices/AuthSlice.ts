import { createSlice } from "@reduxjs/toolkit";

export interface AuthInitialState {
  userInfo:
    | {
        uid: string;
        email: string;
        name: string;
      }
    | undefined;
  isDarkTheme: boolean;
}

const initialState: AuthInitialState = {
  userInfo: undefined,
  isDarkTheme: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
    changeTheme: (state, action) => {
      state.isDarkTheme = action.payload.isDarkTheme;
    },
  },
});

export const { setUser, changeTheme } = authSlice.actions;
