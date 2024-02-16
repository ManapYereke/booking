import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    departmentList: [],
    isLoading: false,
    error: ""
}


const departmentListSlice = createSlice({
    name: "departmentList",
    initialState,
    reducers: {
        setDepartmentDataList: (state, action) => {
            state.departmentList = action.payload
            // console.log(action.payload)
            sessionStorage.setItem("department",JSON.stringify(action.payload))
        }
    }
}) 

export const { setDepartmentDataList } = departmentListSlice.actions
export default departmentListSlice.reducer;
