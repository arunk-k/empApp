import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from './employeeSlice'


const store = configureStore({
    reducer:{
        employeeSlice
    }
})

export default store