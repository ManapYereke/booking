import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    data: {},
    isLoading: false,
    error: "Error"
}


const reservationTheoryData = createSlice({
    name: "data",
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload
        }
    },
})


export const {setData} = reservationTheoryData.actions
export default reservationTheoryData.reducer;