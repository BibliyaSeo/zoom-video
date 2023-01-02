import { createSlice } from "@reduxjs/toolkit";

interface AuthInitialState {}

const initialState: AuthInitialState = {};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const {} = authSlice.actions;
