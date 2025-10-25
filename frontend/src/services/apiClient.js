import axios from "axios"

const apiClient=async(reqUrl,reqMethod,reqHeader,reqBody)=>{
    const config={
        url:reqUrl,
        method:reqMethod,
        headers:reqHeader?reqHeader:"Content-Type:application/json",
        data:reqBody
    }
    return await axios(config)
}

export default apiClient