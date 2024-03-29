import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSessionExists: false,
    usedCompanyCount: -1,
    companyLimit: -1,
    searchParamsData: {}
};

const userInfoSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        setLoginStatusReduser: (state, action) => {
            state.isLogged = action.payload;
        },
        setUsedCompanyCountReduser: (state, action) => {
            state.usedCompanyCount = action.payload;
        },
        setCompanyLimitReduser: (state, action) => {
            state.companyLimit = action.payload;
        },
        setSearchParamsDataReduser: (state, action) => {
            state.searchParamsData = action.payload;
        }
    }
});

export const {
    setLoginStatusReduser,
    setUsedCompanyCountReduser,
    setCompanyLimitReduser,
    setSearchParamsDataReduser,
    increment,
    decrement
} = userInfoSlice.actions;

export default userInfoSlice.reducer;