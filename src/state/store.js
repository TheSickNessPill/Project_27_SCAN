import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "./userInfoSlice.js";

export const store = configureStore({
    reducer: {
        userInfo: userInfoReducer
    }
});