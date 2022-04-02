/**
 * 官方文档
 * http://www.axios-js.com/zh-cn/docs/#axios
 */
import router from "@/route"
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios" 
import { message } from "ant-design-vue"
import { ResponseType } from "@/types/common"

interface ParamsType {
    [key:string]:any
}
type PromiseWithVoid<T> = Promise<void | T>
/**根据项目实际情况而定 */
interface ResponseType<T = any> {
    status: number;
    code: number;
    data: T
}

const baseAxios: AxiosInstance = axios.create({
    timeout: 10000,
})
baseAxios.interceptors.request.use((config: AxiosRequestConfig) => {
    if(config.headers){
        config.headers.Authorization  = localStorage.getItem('token') || ''
        return config
    }     
})
baseAxios.interceptors.response.use((res: AxiosResponse) => {
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
const CancelToken = axios.CancelToken;

function myAxios (method: 'GET' | 'DELETE', url: string, params?: ParamsType, config?: any, cancelSourceArray?: any[]): PromiseWithVoid<ResponseType>
function myAxios (method: 'POST' | 'PUT', url: string, params?: ParamsType, data?: unknown, config?: any, cancelSourceArray?: any[]): PromiseWithVoid<ResponseType>
function myAxios (method: string, url: string, params?: ParamsType, data?: unknown, config?: any, cancelSourceArray?: any[]): PromiseWithVoid<ResponseType> {
    /**如果有传递过来收集取消器的数组，那就收集取消器，一般用不到 */
    if(cancelSourceArray) {
        const source = CancelToken.source()
        cancelSourceArray.push(source)
        config.CancelToken = source.token
    }

    /**根据项目需求不同再写 */
    if(method === 'GET' ) {
        return baseAxios.get(url, Object.assign({}, { params }, config)).then((res: unknown)=>{
            return res as ResponseType
        }).catch((err)=>{
            message.error(err || '网络异常~')
        })
    }else if(method === 'POST') {
        return baseAxios.post(url, data, Object.assign({}, { params }, config)).then((res: unknown)=>{
            return res as ResponseType
        }).catch((err)=>{
            message.error(err || '网络异常~')
        })
    }else if(method === 'DELETE') {
        return baseAxios.delete(url, Object.assign({}, { params }, config)).then((res: unknown)=>{
            return res as ResponseType
        }).catch((err)=>{
            message.error(err || '网络异常~')
        })
    }else if(method === 'PUT') {
        return baseAxios.put(url, data, Object.assign({}, { params }, config)).then((res: unknown)=>{
            return res as ResponseType
        }).catch((err)=>{
            message.error(err || '网络异常~')
        })
    }else {
        message.error('请求方法错误')
    }
}

export default myAxios
