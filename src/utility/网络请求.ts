import router from "@/route"
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios" 
import { message } from "ant-design-vue"
import { ResponseType } from "@/types/common"

const baseAxios:AxiosInstance = axios.create({
    timeout: 10,
})
baseAxios.interceptors.request.use((config:AxiosRequestConfig) => {
    if(config.headers){
        config.headers.Authorization  = localStorage.getItem('token') || ''
        return config
    }     
})
baseAxios.interceptors.response.use((res:AxiosResponse) => {
    const ret = res.data as any
    if(ret.code == 200) {
        return ret
    }else {
        return Promise.reject(ret.msg)
    }
},(err) => {
    if([10003, 10005, 11000].indexOf(err.response?.data?.code) != -1 || [401].indexOf(err.response?.status) != -1) {
        router.push({name:'Login'})
    }
    return Promise.reject(err.response? err.response.data ? err.response.data.msg : err.response.statusText : '网络异常~')
})

const myAxios = (method:string, url:string, data?:unknown, config?:any):Promise<void | ResponseType> => {
    if(method.toUpperCase() == 'GET'){

        return baseAxios.get(url, Object.assign({}, { params: data}, config)).then((res:unknown)=>{
            return res as ResponseType
        }).catch((err)=>{
            message.error(err || '网络异常~')
        })
    }else if(method.toUpperCase() == 'POST') {
        return baseAxios.post(url, data, config).then((res:unknown)=>{
            return res as ResponseType
        }).catch((err)=>{
            message.error(err || '网络异常~')
        })
    }else if(method.toUpperCase() == 'DELETE') {
        return baseAxios.delete(url, { data }).then((res:unknown)=>{
            return res as ResponseType
        }).catch((err)=>{
            message.error(err || '网络异常~')
        })
    }else if(method.toUpperCase() == 'PUT'){
        return baseAxios.put(url, data ).then((res:unknown)=>{
            return res as ResponseType
        }).catch((err)=>{
            message.error(err || '网络异常~')
        })
    }else {
        return Promise.reject('请求方法错误')
    }
}

export default myAxios