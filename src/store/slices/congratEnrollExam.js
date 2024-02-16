import { createSlice } from "@reduxjs/toolkit";
import { m } from "framer-motion";


const congratEnrollExamSlice =  createSlice({
    name: "congratEnrollExamSlice",
    initialState: {
        isAdd: null,
    },
    reducers: {
        toggleIsAdd: (state,action) => {
            state.isAdd = action.payload    
        }
    }
})

export const {toggleIsAdd} = congratEnrollExamSlice.actions
export default congratEnrollExamSlice.reducer