import { baseUrl } from './baseUrl'
import apiClient from './apiClient'

export const registerUserApi = async (data) => {
    return await apiClient(`${baseUrl}register`, "POST", "", data)
}

export const loginUserApi = async (data) => {
    return await apiClient(`${baseUrl}login`, "POST", "", data)
}







