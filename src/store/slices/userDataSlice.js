import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    userData: {},
    error: "Error",

};

const userData = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setDataUser: (state,action) => {
        const obj = JSON.stringify(action.payload)
        sessionStorage.setItem("user",obj)
        const objStorage = sessionStorage.getItem('user')
        state.userData = JSON.parse(objStorage)
    }
  },

});

export const {setDataUser} = userData.actions
export default userData.reducer;
