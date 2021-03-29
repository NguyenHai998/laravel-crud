import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../api/userApi";

export const login = createAsyncThunk("users/login", async (payload) => {
  const data = await userApi.login(payload);

  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("refresh_token", data.refresh_token);

  return data.user;
});

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    logout(state) {
      // clear local storage
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      state.current = {};
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;
