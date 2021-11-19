import router from "@/router/router"
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios" 
import { ElMessage } from "element-plus"
 
type requestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

const baseAxios:AxiosInstance = axios.create({
    timeout: 10000,
})
baseAxios.interceptors.request.use((config:AxiosRequestConfig) => {
    if(config.headers){
        config.headers.Authorization  = localStorage.getItem('token') || ''
        return config
    }  
})
baseAxios.interceptors.response.use((res:AxiosResponse) => {
    const ret = res.data
    if(ret.code == 200 || !ret.error) {
        return ret
    }else {
        return Promise.reject(ret.msg || ret.error)
    }
},(err) => {
    // if(err.response.data.code == 10003 || err.response.data.code == 10005) {
    //     router.push({name:'Login'})
    // }
    return Promise.reject(err.response.data ? err.response.data.msg : err.response.statusText)
})

interface paramsType {
    [key:string]:any
}
const myAxios = (method:requestMethod, url:string, params?:paramsType, payload?:unknown):Promise<any> => {

    /**异常处理 */
    const errorHandler = (err:any) => {
        ElMessage({
            message: err || '网络异常~',
            type: 'error'
        })
    }
    /**成功执行 */
    const successHandler = (res:any) => {
        return res
    }

    if(method == 'GET' ){
        return baseAxios.get(url,{ params }).then((res:unknown)=>{
                    return successHandler(res)
                }).catch((err)=>{
                    errorHandler(err)
                })
    }else {
        let base = '?'
        for(let key in params) {
            base = base + key + '=' + params[key] + '&'
        }
        let resUrl = (url + base).substring(0,(url + base).length-1)
        return baseAxios.post(resUrl, payload).then((res:unknown)=>{
                    return successHandler(res)
                }).catch((err)=>{
                    errorHandler(err)
                })
    }

}

export default myAxios