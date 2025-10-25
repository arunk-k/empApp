import { baseUrl } from './baseUrl'
import apiClient from './apiClient'


export const getEmployeesApi = async () => {
    const headers = {
        "Authorization": `Token ${sessionStorage.getItem('token')}`,
        "Content-Type": "application/json"
    }
    return await apiClient(`${baseUrl}employees`, "GET", headers, "")
}


export const updateEmployeeApi = async (id, data) => {
    const headers = {
        "Content-Type": "application/json",
    }
    return await apiClient(`${baseUrl}employees/${id}`, "PUT", headers, data)
}

export const addEmployeeApi = async (data) => {
    const headers = {
        "Content-Type": "application/json",
    }
    return await apiClient(`${baseUrl}employees`, "POST", headers, data)
}

export const deleteEmployeeApi = async (id) => apiClient(`${baseUrl}employees/${id}`, "DELETE", "")




