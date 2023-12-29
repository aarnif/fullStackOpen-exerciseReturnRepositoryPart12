import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: null, type: "info" };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state, action) {
      return { message: action.payload.message, type: action.payload.type };
    },
    removeNotification() {
      return { message: null, type: null };
    },
  },
});

export const setNotification = (notification) => {
  const { showNotification, removeNotification } = notificationSlice.actions;
  return (dispatch) => {
    console.log("Show notification:", notification.message);
    dispatch(showNotification(notification));
    setTimeout(() => {
      console.log("Remove notification", notification.message);
      dispatch(removeNotification());
    }, 3000);
  };
};

export default notificationSlice.reducer;
