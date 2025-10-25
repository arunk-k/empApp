import { createSlice } from "@reduxjs/toolkit";
import { addEmployee, deleteEmployee, fetchEmployees, updateEmployee } from "./employeeThunks";

const employeeSlice = createSlice({
    name: 'employees',
    initialState: {
        employees: [],
        loading: false,
        error: ""
    },
    extraReducers: (builder) => {

        builder.addCase(fetchEmployees.pending, state => {
            state.loading = true
            state.error = ""
        })

        builder.addCase(fetchEmployees.fulfilled, (state, action) => {
            state.employees = action.payload
            state.loading = false
        })

        builder.addCase(fetchEmployees.rejected, state => {
            state.employees = []
            state.loading = false
            state.error = "Failed to fetch employees"
        })

        builder.addCase(updateEmployee.pending, state => {
            state.loading = true
        })

        builder.addCase(updateEmployee.fulfilled, (state, action) => {
            state.loading = false
            state.employees = state.employees.map(item => item._id == action.payload._id ? action.payload : item)
        })

        builder.addCase(updateEmployee.rejected, state => {
            state.loading = false
            state.error = "Failed to update employees"
        })

        builder.addCase(addEmployee.pending, state => {
            state.loading = true
        })

        builder.addCase(addEmployee.fulfilled, (state, action) => {
            state.loading = false
            state.employees.push(action.payload)
        })

        builder.addCase(addEmployee.rejected, state => {
            state.loading = false
            state.error = "Failed to add employees"
        })

        builder.addCase(deleteEmployee.pending, state => {
            state.loading = true
        })

        builder.addCase(deleteEmployee.fulfilled, (state, action) => {
            state.employees = state.employees.filter(emp => emp._id !== action.payload)
            state.loading = false;
        })

        builder.addCase(deleteEmployee.rejected, state => {
            state.loading = false
            state.error = "Failed to delete employees"
        })


    }
})

export default employeeSlice.reducer