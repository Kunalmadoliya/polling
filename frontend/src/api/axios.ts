import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials : true , 
    headers : {
        "Content-Type" : 'application/json' , 
        'Accept' : 'application/json'
    }
})

api.interceptors.request.use((config)=> {


    let token 

    if(config.headers?.Authorization?.startsWith('Bearer')){
        token =  config.headers.Authorization.toString().split(' ')[1]
    }

    config.headers.Authorization = `Bearer ${token}`

    return config
})


api.interceptors.response.use((config) => {

    return config
})