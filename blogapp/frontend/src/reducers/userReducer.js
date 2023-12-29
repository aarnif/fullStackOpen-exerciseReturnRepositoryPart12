import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import storageService from "../services/storage";

const initialState = [];

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

const { setUser } = userSlice.actions;

export const loadUser = () => {
  return async (dispatch) => {
    const user = storageService.loadUser();
    dispatch(setUser(user));
  };
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      storageService.saveUser(user);
      dispatch(setUser(user));
    } catch (e) {
      throw e;
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    storageService.removeUser();
    dispatch(setUser(null));
  };
};

export default userSlice.reducer;
