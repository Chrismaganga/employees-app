import authSlice from "../features/authSlice";
import questionSlice from "../features/questionSlice";
import userSlice from "../features/userSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    question: questionSlice,
  },
  
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;