import { createSlice } from "@reduxjs/toolkit";



const token =  createSlice({
    name: "tokenSlice",
    initialState: {
        token: {},
    },
    reducers: {
        setToken: (state,action) => {
            console.log(action.payload)
            state.token = action.payload   
        }
    }
})

export const {setToken} = token.actions
export default token.reducer