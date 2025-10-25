import { createAsyncThunk } from "@reduxjs/toolkit";
import { addEmployeeApi, deleteEmployeeApi, getEmployeesApi, updateEmployeeApi } from "../services/employeeApi"

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
    const response = await getEmployeesApi()
    return response.data
})

export const updateEmployee = createAsyncThunk('employees/updateEmployee', async ({ id, updatedData }) => {
    const response = await updateEmployeeApi(id, updatedData)
    console.log(response)
    return response.data
})

export const addEmployee = createAsyncThunk('employees/addEmployee', async (data) => {
    const response = await addEmployeeApi(data)
    console.log(response)
    return response.data
})

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id) => {
    await deleteEmployeeApi(id)
    return id
})
